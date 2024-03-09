import {EventComposer} from "../EventComposer";
import {InventoryFurniture} from "../../../hotel/furni/InventoryFurniture";
import {BufferWriter} from "../../../utils/BufferWriter";
import {OutgoingEvent} from "../EventHeaders";

export class RoomFurnitureMoveComposer implements EventComposer {

    public readonly buffer: ArrayBuffer;
    constructor(furni: InventoryFurniture, x: number, y: number, direction: number = 0) {
        const writer = new BufferWriter(OutgoingEvent.FurnitureMove);
        writer.writeInt(furni.itemId);
        writer.writeInt(x);
        writer.writeInt(y);
        writer.writeInt(direction);
        this.buffer = writer.getBuffer();
    }
}