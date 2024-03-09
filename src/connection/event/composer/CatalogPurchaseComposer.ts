import {BufferWriter} from "../../../utils/BufferWriter";
import {OutgoingEvent} from "../EventHeaders";
import {EventComposer} from "../EventComposer";

export class CatalogPurchaseComposer implements EventComposer {

    public readonly buffer: ArrayBuffer;
    constructor(pageId: number, offerId: number, extraData: string, amount: number) {
        const writer = new BufferWriter(OutgoingEvent.CatalogPurchase);
        writer.writeInt(pageId);
        writer.writeInt(offerId);
        writer.writeString(extraData);
        writer.writeInt(amount);
        this.buffer = writer.getBuffer();
    }
}

