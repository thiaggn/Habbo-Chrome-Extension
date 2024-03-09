import {BufferReader} from "../../../utils/BufferReader";
import {InventoryFurniture} from "../../../hotel/inventory/InventoryFurniture";
import {EventParser} from "../EventParser";
import {UserInventoryData} from "../data/event-issued/UserInventoryData";
import {EventData} from "../EventData";
import {Console} from "../../../utils/Console";
export class InventoryFurniRemoveParser implements EventParser {
    public parse(buffer: BufferReader): UserInventoryData {
        buffer.skipInt(2);

        let totalItems: number = buffer.readInt();
        const eventData = new UserInventoryData();

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