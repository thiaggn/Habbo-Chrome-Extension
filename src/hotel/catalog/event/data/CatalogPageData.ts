import {EventData} from "../../../../event/EventData";
import {CatalogOfferData} from "./CatalogOfferData";
import {CatalogFrontPageData} from "./CatalogFrontPageData";

export class CatalogPageData implements EventData {
    public pageId: number = -1;
    public catalogType: string = null;
    public layoutCode: string = null;
    public localization: { images: string[], texts: string[] } = {
        images: [],
        texts: []
    };
    public offers: CatalogOfferData[] = [];
    public offerId: number = -1;
    public acceptSeasonCurrencyAsCredits: boolean = false;
    public frontPageItems: CatalogFrontPageData[] = [];
}
