import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {RoomFurnitureRemoveData} from "../data/RoomFurnitureRemoveData";

export class RoomFurnitureRemoveParser implements EventParser {
    parse(buffer: BufferReader): EventData {
        const data = new RoomFurnitureRemoveData();
        data.itemId = parseInt(buffer.readString());
        data.isExpired = buffer.readBoolean();
        data.userId = buffer.readInt();
        data.delay = buffer.readInt();
        return data;
    }
}