import {EventParser} from "../../../../event/EventParser";
import {BufferReader} from "../../../../utils/BufferReader";
import {EventData} from "../../../../event/EventData";
import {WiredSelectorConfiguration} from "../data/WiredData";
import {WiredParser} from "./WiredParser";

export class WiredSelectorParser extends WiredParser implements EventParser {
    public parse(buffer: BufferReader): EventData {
        const data = new WiredSelectorConfiguration();
        this.parseConfiguration(buffer, data);
        data.type = buffer.readInt();
        data.isFilter = buffer.readBoolean();
        data.isInvert = buffer.readBoolean();
        return data;
    }
}