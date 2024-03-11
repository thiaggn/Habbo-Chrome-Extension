import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {WiredConditionID} from "../../../hotel/catalog/collections/WiredCollection";
import {WiredConditionMatchSnapshotParser} from "./WiredConditionMatchSnapshotParser";
import {Console} from "../../../utils/Console";
import {WiredConditionData} from "../data/WiredConditionData";

export class InputSourcesConfiguration {
    public furniSelections: number[][];
    public userSelections: number[][];
    public defaultFurniSources: number[];
    public defaultUserSources: number[];
    constructor(buffer: BufferReader) {
        this.furniSelections = this.readAllowedSources(buffer);
        this.userSelections = this.readAllowedSources(buffer);
        this.defaultFurniSources = this.readDefaultSources(buffer);
        this.defaultUserSources = this.readDefaultSources(buffer)
    }

    public readAllowedSources(buffer: BufferReader): number[][] {
        let allowedSources: number[][] = [];
        let allowedSourceSetsCount = buffer.readInt();

        for (let i = 0; i < allowedSourceSetsCount; i++) {
            allowedSources[i] = [];
            let allowedSourceOptions = buffer.readInt();

            for (let j = 0; j < allowedSourceOptions; j++) {
                allowedSources[i][j] = buffer.readInt();
            }
        }
        return allowedSources;
    }

    private readDefaultSources(buffer: BufferReader): number[] {
        let defaultSources: number[] = [];
        let defaultSourceSetsCount: number = buffer.readInt();

        for (let i = 0; i < defaultSourceSetsCount; i++) {
            defaultSources.push(buffer.readInt());
        }

        return defaultSources;
    }
}

export class WiredConditionParser implements EventParser {
    public parse(buffer: BufferReader): EventData {
        const data = new WiredConditionData();
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
        data.inputSourcesConf = new InputSourcesConfiguration(buffer);
        data.type = buffer.readInt();
        data.quantifierType = buffer.readInt();
        data.quantifierCode = buffer.readInt();
        data.isInverted = buffer.readBoolean();
        return data;
    }
}