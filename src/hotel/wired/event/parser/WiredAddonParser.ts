import {EventParser} from "../../../../event/EventParser";
import {BufferReader} from "../../../../utils/BufferReader";
import {EventData} from "../../../../event/EventData";
import {WiredAddonConfiguration} from "../data/WiredData";
import {WiredParser} from "./WiredParser";

export class WiredAddonParser extends WiredParser implements EventParser {
    public parse(buffer: BufferReader): EventData {
        const data = new WiredAddonConfiguration();
        this.parseConfiguration(buffer, data);
        return data;
    }
}