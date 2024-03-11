import {EventComposer} from "../../../../event/EventComposer";
import write = chrome.socket.write;
import {BufferWriter} from "../../../../utils/BufferWriter";
import {OutgoingEvent} from "../../../../event/EventHeaders";

export class InventoryUpdateComposer implements EventComposer {
    public readonly buffer: ArrayBuffer;
    constructor() {
        const writer = new BufferWriter(OutgoingEvent.InventoryUpdate);
        this.buffer = writer.wrap();
    }
}