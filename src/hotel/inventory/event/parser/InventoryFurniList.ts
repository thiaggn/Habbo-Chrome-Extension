import {EventParser} from "../../../../event/EventParser";
import {InventoryRemovedFurniData} from "../data/InventoryRemovedFurniData";
import {InventoryFurniture} from "../../InventoryFurniture";
import {BufferReader} from "../../../../utils/BufferReader";

export class InventoryFurniList implements EventParser {
    public parse(buffer: BufferReader): InventoryRemovedFurniData {
        let event = new InventoryRemovedFurniData();
        event.itemId = buffer.readInt();

        return event;
    }
}