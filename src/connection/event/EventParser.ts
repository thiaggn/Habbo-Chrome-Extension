import {BufferReader} from "../../utils/BufferReader";
import {EventData} from "./EventData";
import {IncomingEvent} from "./EventHeaders";

export interface EventParser {
    parse(buffer: BufferReader): EventData;
}