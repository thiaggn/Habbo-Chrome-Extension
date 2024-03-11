import {EventComposer} from "../../../../event/EventComposer";
import {BufferWriter} from "../../../../utils/BufferWriter";
import {OutgoingEvent} from "../../../../event/EventHeaders";


export class RoomFurnitureUpdateComposer implements EventComposer {
    public readonly buffer: ArrayBuffer;

    constructor(id: number, x: number, y: number, direction: number) {
        const buffer = new BufferWriter(OutgoingEvent.RoomFurnitureUpdate);
        buffer.writeInt(id);
        buffer.writeInt(x);
        buffer.writeInt(y);
        buffer.writeInt(direction);
        this.buffer = buffer.wrap();
    }
}