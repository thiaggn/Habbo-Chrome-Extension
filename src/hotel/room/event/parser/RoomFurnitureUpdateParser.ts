import {EventParser} from "../../../../event/EventParser";
import {BufferReader} from "../../../../utils/BufferReader";
import {EventData} from "../../../../event/EventData";
import {Console} from "../../../../utils/Console";
import {readFurniData} from "../../../../utils/FurniUtils";
export class RoomFurnitureUpdateParser implements EventParser {
    parse(buffer: BufferReader): EventData {
        const item =  readFurniData(buffer);
        if(item.spriteId < 0) item.spriteName = buffer.readString();
        return item;
    }
}