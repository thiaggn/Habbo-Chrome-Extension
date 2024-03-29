import {EventParser} from "../../../../event/EventParser";
import {BufferReader} from "../../../../utils/BufferReader";
import {EventData} from "../../../../event/EventData";
import {Console} from "../../../../utils/Console";
import {RoomHeightData} from "../data/RoomHeightData";
export class RoomStackHeightsParser implements EventParser {
    parse(buffer: BufferReader): RoomHeightData {
        const eventData = new RoomHeightData();

        eventData.width = buffer.readInt();
        const totalTiles = buffer.readInt();
        eventData.height = totalTiles / eventData.width;

        let i = 0;

        while(i < totalTiles)
        {
            eventData.heights[i] = buffer.readShort();
            i++;
        }

        return eventData;
    }
}