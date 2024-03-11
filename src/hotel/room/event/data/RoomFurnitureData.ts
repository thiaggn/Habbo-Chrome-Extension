import {EventData} from "../../../../event/EventData";
import {IObjectData} from "../../../../data/IObjectData";

export class RoomFurnitureData implements EventData {
    public itemId: number;
    public spriteId: number;
    public spriteName: string;
    public w: number;
    public h: number;
    public direction: number;
    public z: number;
    public stackHeight: number;
    public extra: number;
    public data: IObjectData;
    public state: number;
    public isUnique: boolean;
    public uniqueNumber: number;
    public uniqueSeries: number;
    public rarityLevel: number;
    public flags: number;
    public state2: number;
    public expires: number;
    public usagePolicy: number;
    public userId: number;
    public username: string;
}