import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {RoomFurniture} from "../../../hotel/furni/RoomFurniture";
import {FurnitureDataParser} from "../../../temp/FurnitureDataParser";

export class RoomFurniturePlaceParser implements EventParser {
    parse(buffer: BufferReader): EventData {
        const singleItem = new RoomFurniture();
        singleItem.itemId = buffer.readInt();
        singleItem.spriteId = buffer.readInt();
        singleItem.x = buffer.readInt();
        singleItem.y = buffer.readInt();
        singleItem.direction =  ((buffer.readInt() % 8) * 45);
        singleItem.z = parseFloat(buffer.readString())
        singleItem.stackHeight = parseFloat(buffer.readString());
        singleItem.extra = buffer.readInt();
        singleItem.data = FurnitureDataParser.parseObjectData(buffer);
        singleItem.state = parseFloat(singleItem.data && singleItem.data.getLegacyString())
        singleItem.expires = buffer.readInt();
        singleItem.usagePolicy = buffer.readInt();
        singleItem.userId = buffer.readInt();
        singleItem.username = buffer.readString();
        if(singleItem.spriteId < 0) singleItem.spriteName = buffer.readString();
        return singleItem;
    }

}