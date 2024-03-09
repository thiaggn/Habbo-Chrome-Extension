import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {RoomFurnitureListData} from "../data/RoomFurnitureListData";
import {RoomFurniture} from "../../../hotel/furni/RoomFurniture";
import {FurnitureDataParser} from "../../../temp/FurnitureDataParser";

export class RoomFurnitureListParser implements EventParser {
    parse(buffer: BufferReader): EventData {
        let eventData = new RoomFurnitureListData();

        let totalOwners = buffer.readInt();
        while(totalOwners > 0) {
            let userId = buffer.readInt();
            let username = buffer.readString();
            eventData.owners.set(userId, username);
            totalOwners--;
        }

        let totalItems = buffer.readInt();
        while(totalItems > 0) {
            const item = new RoomFurniture();
            item.itemId = buffer.readInt();
            item.spriteId = buffer.readInt();
            item.x = buffer.readInt();
            item.y = buffer.readInt();
            item.direction =  ((buffer.readInt() % 8) * 45);
            item.z = parseFloat(buffer.readString())
            item.stackHeight = parseFloat(buffer.readString());
            item.extra = buffer.readInt();
            item.data = FurnitureDataParser.parseObjectData(buffer);
            item.state = parseFloat(item.data && item.data.getLegacyString())
            item.expires = buffer.readInt();
            item.usagePolicy = buffer.readInt();
            item.userId = buffer.readInt();
            item.username = eventData.owners.get(item.userId);

            if(item.spriteId < 0) item.spriteName = buffer.readString();
            eventData.items.push(item);
            totalItems--;
        }

        return eventData;
    }

}