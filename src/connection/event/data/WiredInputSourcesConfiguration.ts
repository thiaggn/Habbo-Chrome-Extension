import {BufferReader} from "../../../utils/BufferReader";

export class WiredInputSourcesConfiguration {
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