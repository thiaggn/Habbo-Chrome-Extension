import {EventComposer} from "../../../../event/EventComposer";
import {BufferWriter} from "../../../../utils/BufferWriter";
import {OutgoingEvent} from "../../../../event/EventHeaders";

export enum FurniType {
    Floor = 10,
    Wall = 20
}
export class RoomFurnitureRemoveComposer implements EventComposer {
    public readonly buffer: ArrayBuffer;

    constructor(type: FurniType, id: number) {
        const buffer = new BufferWriter(OutgoingEvent.RoomFurnitureRemove);
        buffer.writeInt(type);
        buffer.writeInt(id);
        this.buffer = buffer.wrap();
    }
}