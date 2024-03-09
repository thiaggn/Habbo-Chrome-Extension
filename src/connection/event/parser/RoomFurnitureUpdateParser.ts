import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {RoomFurnitureRemoveData} from "../data/RoomFurnitureRemoveData";
import {FurnitureDataParser} from "../../../temp/FurnitureDataParser";
import {RoomFurnitureData} from "../data/RoomFurnitureData";
import {readFurniData} from "../../../utils/FurniUtils";

export class RoomFurnitureUpdateParser implements EventParser {
    parse(buffer: BufferReader): EventData {
        const item =  readFurniData(buffer);
        if(item.spriteId < 0) item.spriteName = buffer.readString();
        return item;
    }
}