export class CatalogProductData {
    public static I: string = 'i';
    public static S: string = 's';
    public static E: string = 'e';
    public static B: string = 'b';

    public productType: string;
    public spriteId: number;
    public extraParam: string;
    public productCount: number;
    public uniqueLimitedItem: boolean;
    public uniqueLimitedItemSeriesSize: number;
    public uniqueLimitedItemsLeft: number;
}