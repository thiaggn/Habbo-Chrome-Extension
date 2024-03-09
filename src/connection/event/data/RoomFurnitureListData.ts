import {EventData} from "../EventData";
import {RoomFurniture} from "../../../hotel/furni/RoomFurniture";

export class RoomFurnitureListData implements EventData {
    public owners = new Map<number, string>();
    public items: RoomFurniture[] = [];
}