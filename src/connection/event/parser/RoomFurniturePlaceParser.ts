import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {FurnitureDataParser} from "../../../temp/FurnitureDataParser";
import {RoomFurnitureData} from "../data/RoomFurnitureData";
import {readFurniData} from "../../../utils/FurniUtils";

export class RoomFurniturePlaceParser implements EventParser {
    parse(buffer: BufferReader): EventData {
        const singleItem =  readFurniData(buffer);
        singleItem.username = buffer.readString();
        if(singleItem.spriteId < 0) singleItem.spriteName = buffer.readString();
        return singleItem;
    }

}