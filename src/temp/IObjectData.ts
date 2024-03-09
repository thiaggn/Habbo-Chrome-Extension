import {BufferReader} from "../utils/BufferReader";
import {IRoomObjectModel} from "./IRoomObjectModel";


export interface IObjectData
{
    state: number;
    isUnique: boolean;
    uniqueNumber: number;
    uniqueSeries: number;
    rarityLevel: number;
    flags: number;
    parseWrapper(buffer: BufferReader): void;
    initializeFromRoomObjectModel(model: IRoomObjectModel): void;
    writeRoomObjectModel(model: IRoomObjectModel): void;
    getLegacyString(): string;
    compare(data: IObjectData): boolean;
}
