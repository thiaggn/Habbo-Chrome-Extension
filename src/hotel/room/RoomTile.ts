import {RoomFurniture} from "./RoomFurniture";

export class RoomTile {
    public standing: any[] = [];
    public furnitures: RoomFurniture[] = [];
    public readonly h: number;
    public readonly w: number;
    private _stackHeight: number = undefined;
    private _floorHeight: number = undefined;

    get hasFloor(): boolean {
        return this._floorHeight !== -110;
    }

    get stackHeight() {
        return this._stackHeight;
    }

    set stackHeight(value) {
        if(this._stackHeight !== undefined) throw new Error("[RoomTile] Property '_stackHeight' cannot be redefined.");
        this._stackHeight = value;
    }

    get floorHeight() {
        return this._floorHeight;
    }

    set floorHeight(value) {
        if(this._floorHeight !== undefined) throw new Error("[RoomTile] Property '_floorHeight' cannot be redefined.");
        this._floorHeight = value;
    }

    constructor(h: number, w: number) {
        this.h = h;
        this.w = h;
    }

}