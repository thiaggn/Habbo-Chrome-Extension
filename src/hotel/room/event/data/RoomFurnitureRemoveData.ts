import {EventData} from "../../../../event/EventData";


export class RoomFurnitureRemoveData implements EventData {
    public itemId: number;
    public isExpired: boolean;
    public userId: number;
    public delay: number;
}