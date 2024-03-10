import {EventData} from "../EventData";
import {CatalogProductData} from "./CatalogProductData";

export class CatalogPurchaseData implements EventData {
    public offerId: number;
    public localizationId: string;
    public products: CatalogProductData[];
}