import {InventoryFurniture} from "../../InventoryFurniture";
import {EventData} from "../../../../event/EventData";

export class InventoryData implements EventData {
    public mobiList: Map<number, InventoryFurniture>;

    constructor() {
        this.mobiList = new Map();
    }
}