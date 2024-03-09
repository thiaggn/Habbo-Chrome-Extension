
import {InventoryFurniture} from "./InventoryFurniture";
import {IObjectData} from "../../temp/IObjectData";

export class RoomFurniture {
    public itemId: number;
    public spriteId: number;
    public spriteName: string;
    public x: number;
    public y: number;
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