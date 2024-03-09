import {EventData} from "../EventData";
import {ProductData} from "./ProductData";

export class CatalogPurchaseData implements EventData {
    public offerId: number;
    public localizationId: string;
    public products: ProductData[];
}