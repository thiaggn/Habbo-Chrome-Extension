import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {WiredParser} from "../shared/WiredParser";
import {WiredConditionData} from "../data/WiredData";


export class WiredConditionParser extends WiredParser implements EventParser {
    public parse(buffer: BufferReader): EventData {
        const data = new WiredConditionData();

        this.parseConfiguration(buffer, data);

        data.type = buffer.readInt();
        data.quantifierType = buffer.readInt();
        data.quantifierCode = buffer.readInt();
        data.isInverted = buffer.readBoolean();

        return data;
    }
}