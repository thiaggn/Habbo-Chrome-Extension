import {EventComposer} from "../../../../event/EventComposer";
import {InventoryFurniture} from "../../../inventory/InventoryFurniture";
import {BufferWriter} from "../../../../utils/BufferWriter";
import {OutgoingEvent} from "../../../../event/EventHeaders";


enum FurniPlacementType {
    Floor = 1,
    Wall = 20,
    Unit = 100
}
export class RoomFurniturePlaceComposer implements EventComposer {

    public readonly buffer: ArrayBuffer;
    constructor(furni: InventoryFurniture, x: number, y: number, direction: number = 0, wallLocation: string = '') {
        let writer = new BufferWriter(OutgoingEvent.RoomFurniturePlace);

        if(furni.category == FurniPlacementType.Floor) {
            writer.writeString(`${furni.itemId} ${x} ${y} ${direction}`);
        }

        else {
            throw new Error('Ainda não há suportes para itens de parede');
            // buffer.writeString(`${furni.itemId} ${wallLocation}`)
        }

        this.buffer = writer.wrap();
    }
}