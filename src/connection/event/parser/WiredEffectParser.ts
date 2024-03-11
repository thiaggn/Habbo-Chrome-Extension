import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {WiredEffectData} from "../data/WiredData";
import {WiredParser} from "../shared/WiredParser";
import {Console} from "../../../utils/Console";

export class WiredEffectParser extends WiredParser implements EventParser {
    parse(buffer: BufferReader): EventData {
        const data = new WiredEffectData();
        this.parseConfiguration(buffer, data);

        data.triggerConfiguration = buffer.readInt();
        let count: number = buffer.readInt();
        data.conflictingEffects = [];

        while(count > 0) {
            data.conflictingEffects.push(buffer.readInt());
            count--;
        }

        return data;
    }

}