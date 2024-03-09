import {EventComposer} from "../EventComposer";
import {BufferWriter} from "../../../utils/BufferWriter";
import {InventoryFurniture} from "../../../hotel/inventory/InventoryFurniture";
import {OutgoingEvent} from "../EventHeaders";
import {Console} from "../../../utils/Console";


enum Category {
    Floor = 1,
    Wall = 20,
    Unit = 100
}
export class RoomFurniturePlaceComposer implements EventComposer {

    public readonly buffer: ArrayBuffer;
    constructor(furni: InventoryFurniture, x: number, y: number, direction: number = 0, wallLocation: string = '') {
        let writer = new BufferWriter(OutgoingEvent.FurniturePlace);

        if(furni.category == Category.Floor) {
            writer.writeString(`${furni.itemId} ${x} ${y} ${direction}`);
        }

        else {
            throw new Error('Ainda não há suportes para itens de parede');
            // buffer.writeString(`${furni.itemId} ${wallLocation}`)
        }

        this.buffer = writer.getBuffer();
    }
}