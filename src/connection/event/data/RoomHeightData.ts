import {EventData} from "../EventData";

export class RoomHeightData implements EventData {
    public height: number;
    public width: number;
    public heights: number[] = [];

    private static decodeTileHeight(height: number): number
    {
        return ((height < 0) ? -1 : ((height & 16383) / 0x0100));
    }

    private static decodeIsStackingBlocked(height: number): boolean
    {
        return !!(height & 0x4000);
    }

    private static decodeIsRoomTile(height: number): boolean
    {
        return height >= 0;
    }
    public getTileHeight(x: number, y: number): number
    {
        if((x < 0) || (x >= this.width) || (y < 0) || (y >= this.height)) return -1;
        return RoomHeightData.decodeTileHeight(this.heights[((y * this.width) + x)]);
    }

    public getStackingBlocked(x: number, y: number): boolean
    {
        if((x < 0) || (x >= this.width) || (y < 0) || (y >= this.height)) return true;
        return RoomHeightData.decodeIsStackingBlocked(this.heights[((y * this.width) + x)]);
    }

    public isRoomTile(x: number, y: number): boolean
    {
        if((x < 0) || (x >= this.width) || (y < 0) || (y >= this.height)) return false;
        return RoomHeightData.decodeIsRoomTile(this.heights[((y * this.width) + x)]);
    }
}