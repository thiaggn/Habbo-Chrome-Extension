import {EventData} from "../../../../event/EventData";

export class RoomFloorData implements EventData {
    public model: string[] = [];
    public width: number;
    public height: number;
    public heightMap: number[][] = [];
    public wallHeight: number;
    public scale: number;

    public getHeight(x: number, y: number): number {
        if((x < 0) || (x >= this.width) || (y < 0) || (y >= this.height)) return -110;

        const row = this.heightMap[y];

        if(row === undefined) return -110;

        const height = row[x];

        if(height === undefined) return -110;

        return height;
    }


}