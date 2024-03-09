import {EventData} from "../EventData";
import {RoomFurnitureData} from "./RoomFurnitureData";


export class RoomFurnitureListData implements EventData {
    public owners = new Map<number, string>();
    public items: RoomFurnitureData[] = [];
}