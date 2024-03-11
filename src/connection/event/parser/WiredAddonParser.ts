import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {WiredAddonData} from "../data/WiredData";
import {WiredParser} from "../shared/WiredParser";

export class WiredAddonParser extends WiredParser implements EventParser {
    public parse(buffer: BufferReader): EventData {
        const data = new WiredAddonData();
        this.parseConfiguration(buffer, data);
        return data;
    }
}