import {EventParser} from "../../../../event/EventParser";
import {BufferReader} from "../../../../utils/BufferReader";
import {EventData} from "../../../../event/EventData";
import {WiredParser} from "./WiredParser";
import {WiredConditionConfiguration} from "../data/WiredData";


export class WiredConditionParser extends WiredParser implements EventParser {
    public parse(buffer: BufferReader): EventData {
        const data = new WiredConditionConfiguration();

        this.parseConfiguration(buffer, data);

        data.type = buffer.readInt();
        data.quantifierType = buffer.readInt();
        data.quantifierCode = buffer.readInt();
        data.isInverted = buffer.readBoolean();

        return data;
    }
}