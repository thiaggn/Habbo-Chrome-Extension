export class RoomFurniture {
    public id: number;
    public spriteId: number;
    public w: number;
    public h: number;
    public stackHeight: number;
    public direction: number;
    public state: number;
    public isUnique: boolean;
    public hasBeenRemoved: boolean = false;
    public owner: {
        id: number;
        username: string
    }
}