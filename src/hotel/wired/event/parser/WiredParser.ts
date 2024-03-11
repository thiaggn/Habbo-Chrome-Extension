import {BufferReader} from "../../../../utils/BufferReader";
import {WiredInputSources} from "../data/WiredInputSources";
import {WiredSharedData} from "../data/WiredData";

export class WiredParser {
    public parseConfiguration(buffer: BufferReader, data: WiredSharedData) {
        data.stuffTypeSelectionEnabled = buffer.readBoolean();
        data.furniLimit = buffer.readInt();
        let counter = buffer.readInt();

        // Loop para obter stuffIds
        while(counter > 0) {
            data.stuffIds.push(buffer.readInt());
        }

        data.stuffTypeId = buffer.readInt();
        data.id = buffer.readInt();
        data.stringParam = buffer.readString();

        counter = buffer.readInt() // 1
        while(counter > 0) {
            data.intParams.push(buffer.readInt());
            counter--;
        }

        counter = buffer.readInt() // 2
        while(counter > 0) {
            data.furniSourceTypes.push(buffer.readInt());
            counter--;
        }

        counter = buffer.readInt()
        while(counter > 0) {
            data.userSourceTypes.push(buffer.readInt());
            counter--;
        }

        data.stuffTypeSelectionCode = buffer.readInt();
        data.inputSourcesConf = new WiredInputSources(buffer);
    }
}