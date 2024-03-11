import {EventParser} from "../../../../event/EventParser";
import {BufferReader} from "../../../../utils/BufferReader";
import {EventData} from "../../../../event/EventData";
import {Console} from "../../../../utils/Console";
import {RoomFurnitureListData} from "../data/RoomFurnitureListData";
import {readFurniData} from "../../../../utils/FurniUtils";
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
            const item = readFurniData(buffer);
            item.username = eventData.owners.get(item.userId);
            if(item.spriteId < 0) item.spriteName = buffer.readString();
            eventData.items.push(item);
            totalItems--;
        }

        return eventData;
    }

}