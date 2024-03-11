import {EventComposer} from "../../../../event/EventComposer";
import {InventoryFurniture} from "../../../inventory/InventoryFurniture";
import {BufferWriter} from "../../../../utils/BufferWriter";
import {OutgoingEvent} from "../../../../event/EventHeaders";


export class RoomFurnitureMoveComposer implements EventComposer {

    public readonly buffer: ArrayBuffer;
    constructor(furni: InventoryFurniture, x: number, y: number, direction: number = 0) {
        const writer = new BufferWriter(OutgoingEvent.RoomFurnitureMove);
        writer.writeInt(furni.itemId);
        writer.writeInt(x);
        writer.writeInt(y);
        writer.writeInt(direction);
        this.buffer = writer.wrap();
    }
}