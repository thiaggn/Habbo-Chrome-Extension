import {BufferReader} from "../../../../utils/BufferReader";
import {InventoryFurniture} from "../../InventoryFurniture";
import {EventParser} from "../../../../event/EventParser";
import {InventoryData} from "../data/InventoryData";
import {EventData} from "../../../../event/EventData";
import {Console} from "../../../../utils/Console";
export class InventoryFurniRemoveParser implements EventParser {
    public parse(buffer: BufferReader): InventoryData {
        buffer.skipInt(2);

        let totalItems: number = buffer.readInt();
        const eventData = new InventoryData();

        while (totalItems > 0) {

            const mobi = new InventoryFurniture();

            mobi.itemId = buffer.readInt();
            mobi.furniType = buffer.readString();
            mobi.ref = buffer.readInt();
            mobi.spriteId = buffer.readInt();
            mobi.category = buffer.readInt();

            buffer.readInt();
            buffer.readString();
            buffer.readBoolean();
            buffer.readBoolean();
            buffer.readBoolean();
            buffer.readBoolean();
            buffer.readInt();
            buffer.readBoolean();
            buffer.readInt();

            if(mobi.furniType === 'S') {
                buffer.readString();
                buffer.readInt();
            }

            eventData.mobiList.set(mobi.itemId, mobi);
            totalItems--;
        }

        return eventData;
    }
}