import {CatalogProductData} from "./CatalogProductData";

export class CatalogOfferData {
    public offerId: number;
    public localizationId: string;
    public rent: boolean;
    public priceCredits: number;
    public priceActivityPoints: number;
    public priceActivityPointsType: number;
    public clubLevel: number;
    public giftable: boolean;
    public bundlePurchaseAllowed: boolean;
    public isPet: boolean;
    public previewImage: string;
    public products: CatalogProductData[] = [];
}