import {EventParser} from "../../../../event/EventParser";
import {BufferReader} from "../../../../utils/BufferReader";
import {EventData} from "../../../../event/EventData";
import {CatalogPageData} from "../data/CatalogPageData";
import {CatalogOfferData} from "../data/CatalogOfferData";
import {CatalogProductData} from "../data/CatalogProductData";
import {CatalogFrontPageData} from "../data/CatalogFrontPageData";
import {Console} from "../../../../utils/Console";
import write = chrome.socket.write;

export class CatalogPageParser implements EventParser {
    parse(buffer: BufferReader): CatalogPageData {
        const eventData: CatalogPageData = new CatalogPageData();

        eventData.pageId = buffer.readInt();
        eventData.catalogType = buffer.readString();
        eventData.layoutCode = buffer.readString();

        // Preenche localization
        let totalImages = buffer.readInt();
        while(totalImages > 0) {
            eventData.localization.images.push(buffer.readString());
            totalImages--;
        }

        let totalTexts = buffer.readInt();
        while(totalTexts > 0) {
            eventData.localization.texts.push(buffer.readString());
            totalTexts--;
        }

        // Preenche offers
        let totalOffers = buffer.readInt();
        while(totalOffers > 0) {
            const offerData = new CatalogOfferData();

            offerData.offerId = buffer.readInt();
            offerData.localizationId = buffer.readString();
            offerData.rent = buffer.readBoolean();
            offerData.priceCredits = buffer.readInt();
            offerData.priceActivityPoints  = buffer.readInt();
            offerData.priceActivityPointsType = buffer.readInt();
            offerData.giftable = buffer.readBoolean();

            let totalProducts = buffer.readInt();
            while(totalProducts > 0) {
                const productData = new CatalogProductData();

                productData.productType = buffer.readString();

                switch (productData.productType) {
                    case 'b':
                        productData.extraParam = buffer.readString();
                        productData.productCount = 1;
                        break;

                    default:
                        productData.spriteId = buffer.readInt();
                        productData.extraParam = buffer.readString();
                        productData.productCount = buffer.readInt();
                        productData.uniqueLimitedItem = buffer.readBoolean();

                        if(productData.uniqueLimitedItem) {
                            productData.uniqueLimitedItemSeriesSize = buffer.readInt();
                            productData.uniqueLimitedItemsLeft = buffer.readInt();
                        }
                        break;
                }

                offerData.products.push(productData);
                totalProducts--;
            }

            offerData.clubLevel = buffer.readInt();
            offerData.bundlePurchaseAllowed = buffer.readBoolean();
            offerData.isPet = buffer.readBoolean();
            offerData.previewImage = buffer.readString();

            eventData.offers.push(offerData);

            totalOffers--;
        }


        eventData.offerId = buffer.readInt();
        eventData.acceptSeasonCurrencyAsCredits = buffer.readBoolean();

        if(buffer.bytesAvailable) {
            let totalFrontPageItems = buffer.readInt();
            while(totalFrontPageItems > 0) {
                const frontPageItem = new CatalogFrontPageData();

                frontPageItem.position = buffer.readInt();
                frontPageItem.itemName = buffer.readString();
                frontPageItem.itemPromoImage = buffer.readString();
                frontPageItem.type = buffer.readInt();

                switch (frontPageItem.type) {
                    case 0:
                        frontPageItem.catalogPageLocation = buffer.readString();
                        break;

                    case 1:
                        frontPageItem.productOfferId = buffer.readInt();
                        break;

                    case 2:
                        frontPageItem.productCode = buffer.readString();
                        break;
                }

                buffer.skipInt();

                eventData.frontPageItems.push()
                totalFrontPageItems--;
            }
        }

        return eventData;
    }
}