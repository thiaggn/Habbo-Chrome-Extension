import {EventParser} from "../../../../event/EventParser";
import {BufferReader} from "../../../../utils/BufferReader";
import {EventData} from "../../../../event/EventData";
import {Console} from "../../../../utils/Console";
import {readFurniData} from "../../../../utils/FurniUtils";
export class RoomFurniturePlaceParser implements EventParser {
    parse(buffer: BufferReader): EventData {
        const singleItem =  readFurniData(buffer);
        singleItem.username = buffer.readString();
        if(singleItem.spriteId < 0) singleItem.spriteName = buffer.readString();
        return singleItem;
    }

}