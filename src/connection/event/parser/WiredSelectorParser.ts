import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {WiredSelectorData} from "../data/WiredData";
import {WiredParser} from "../shared/WiredParser";

export class WiredSelectorParser extends WiredParser implements EventParser {
    public parse(buffer: BufferReader): EventData {
        const data = new WiredSelectorData();
        this.parseConfiguration(buffer, data);
        data.type = buffer.readInt();
        data.isFilter = buffer.readBoolean();
        data.isInvert = buffer.readBoolean();
        return data;
    }
}