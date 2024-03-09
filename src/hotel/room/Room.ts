import {EventAPI} from "../../connection/EventAPI";
import {IncomingEvent} from "../../connection/event/EventHeaders";
import {InventoryFurniture} from "../furni/InventoryFurniture";
import {Console} from "../../utils/Console";
import {RoomFurniturePlaceComposer} from "../../connection/event/composer/RoomFurniturePlaceComposer";
import {RoomFloorData} from "../../connection/event/data/RoomFloorData";
import {RoomHeightData} from "../../connection/event/data/RoomHeightData";
import {RoomFurnitureListData} from "../../connection/event/data/RoomFurnitureListData";
import {RoomFurniturePlaceData} from "../../connection/event/data/RoomFurniturePlaceData";

export class Room {
    private eventAPI: EventAPI;
    private floorData: RoomFloorData;
    private heightData: RoomHeightData;
    private furniData: RoomFurnitureListData;

    constructor(eventAPI: EventAPI) {
        this.eventAPI = eventAPI;

        eventAPI.listen(IncomingEvent.RoomFloor, (data: RoomFloorData) => {
            this.floorData = data;
            Console.log(
                `%c[Room] %cReceived room floor data %c${data.height} ${data.width}`,
                'color: cyan', 'color: white', 'color: gray'
            );
        });

        eventAPI.listen(IncomingEvent.RoomHeight, (data: RoomHeightData) => {
            this.heightData = data;
            Console.log(`%c[Room] %cReceived room height data`,
                'color: cyan', 'color: white'
            );
        });

        eventAPI.listen(IncomingEvent.RoomFurnitureList, (data: RoomFurnitureListData) => {
            this.furniData = data;
            Console.log(`%c[Room] %cReceived room furniture data %c${data.items.length} mobis`,
                'color: cyan', 'color: white', 'color: gray'
            );
        })

        eventAPI.listen(IncomingEvent.RoomFurniturePlace, (data: RoomFurniturePlaceData) => {
            this.furniData.items.push(data.item);
            Console.log(`%c[Room] %Placed room furniture`,
                'color: cyan', 'color: white'
            );
            Console.log(data);
        })
    }

    public async placeFurni(furni: InventoryFurniture, x: number, y: number): Promise<void> {
        const composer = new RoomFurniturePlaceComposer(furni, x, y);
        this.eventAPI.sendEvent(composer);
    }

    public async placeFurnis(furnis: InventoryFurniture[], x: number, y: number): Promise<void> {
        for (let furni of furnis) {
            const composer = new RoomFurniturePlaceComposer(furni, x, y);
            this.eventAPI.sendEvent(composer);
        }
    }
}