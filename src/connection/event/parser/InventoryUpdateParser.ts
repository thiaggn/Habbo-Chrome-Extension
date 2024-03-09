import {EventParser} from "../EventParser";
import {InventoryRemovedFurniData} from "../data/InventoryRemovedFurniData";
import {InventoryFurniture} from "../../../hotel/furni/InventoryFurniture";
import {BufferReader} from "../../../utils/BufferReader";

export class InventoryUpdateParser implements EventParser {
    public parse(buffer: BufferReader): InventoryRemovedFurniData {
        let event = new InventoryRemovedFurniData();
        event.itemId = buffer.readInt();

        return event;
    }
}