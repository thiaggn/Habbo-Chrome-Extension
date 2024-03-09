import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {CatalogPurchaseData} from "../data/PurchaseOK";
import {ProductData} from "../data/ProductData";
import {Console} from "../../../utils/Console";

export class CatalogPurchaseParser implements EventParser {
    parse(buffer: BufferReader): EventData {
        const data = new CatalogPurchaseData();

        data.offerId = buffer.readInt();
        data.localizationId = buffer.readString();

        buffer.skipBoolean();
        buffer.skipInt(3);
        buffer.skipBoolean();

        let totalProducts = buffer.readInt();
        data.products = [];

        while(totalProducts > 0) {
            const product = new ProductData();
            product.productType = buffer.readString();


            switch (product.productType) {
                case 'b':
                    product.extraParam = buffer.readString();
                    product.productCount = 1;
                    break;

                default:
                    product.spriteId = buffer.readInt();
                    product.extraParam = buffer.readString();
                    product.productCount = buffer.readInt();
                    product.uniqueLimitedItem = buffer.readBoolean();

                    if(product.uniqueLimitedItem) {
                        product.uniqueLimitedItemSeriesSize = buffer.readInt();
                        product.uniqueLimitedItemsLeft = buffer.readInt();
                    }
                    break;
            }

            data.products.push(product);
            totalProducts--;
        }

        return data;
    }

}