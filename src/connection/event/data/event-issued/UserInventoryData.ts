import {InventoryFurniture} from "../../../../hotel/inventory/InventoryFurniture";
import {EventData} from "../../EventData";

export class UserInventoryData implements EventData {
    public mobiList: Map<number, InventoryFurniture>;

    constructor() {
        this.mobiList = new Map();
    }
}