import {BufferWriter} from "../../../../utils/BufferWriter";
import {OutgoingEvent} from "../../../../event/EventHeaders";
import {EventComposer} from "../../../../event/EventComposer";

export class CatalogPurchaseComposer implements EventComposer {

    public readonly buffer: ArrayBuffer;
    constructor(pageId: number, offerId: number, extraData: string, amount: number) {
        const writer = new BufferWriter(OutgoingEvent.CatalogPurchase);
        writer.writeInt(pageId);
        writer.writeInt(offerId);
        writer.writeString(extraData);
        writer.writeInt(amount);
        this.buffer = writer.wrap();
    }
}

