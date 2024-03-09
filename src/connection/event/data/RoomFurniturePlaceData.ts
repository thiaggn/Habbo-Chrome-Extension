import {EventData} from "../EventData";
import {RoomFurniture} from "../../../hotel/furni/RoomFurniture";

export class RoomFurniturePlaceData implements EventData {
    public item: RoomFurniture;
}