import {EventData} from "../../EventData";
import {OfferData} from "../OfferData";
import {FrontPageItem} from "../FrontPageItem";

export class CatalogPageData implements EventData {
    public pageId: number = -1;
    public catalogType: string = null;
    public layoutCode: string = null;
    public localization: { images: string[], texts: string[] } = {
        images: [],
        texts: []
    };
    public offers: OfferData[] = [];
    public offerId: number = -1;
    public acceptSeasonCurrencyAsCredits: boolean = false;
    public frontPageItems: FrontPageItem[] = [];
}
