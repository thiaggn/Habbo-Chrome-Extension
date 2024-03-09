export class FrontPageItem {
    public static ITEM_CATALOGUE_PAGE: number = 0;
    public static ITEM_PRODUCT_OFFER: number = 1;
    public static ITEM_IAP: number = 2;

    public type: number;
    public position: number;
    public itemName: string;
    public itemPromoImage: string;
    public catalogPageLocation: string;
    public productCode: string;
    public productOfferId: number;
    public expirationTime: number;
}