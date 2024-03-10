import {EventAPI} from "../../connection/EventAPI";
import {IncomingEvent} from "../../connection/event/EventHeaders";
import {InventoryFurniture} from "../inventory/InventoryFurniture";
import {Console} from "../../utils/Console";
import {RoomFurniturePlaceComposer} from "../../connection/event/composer/RoomFurniturePlaceComposer";
import {RoomFloorData} from "../../connection/event/data/RoomFloorData";
import {RoomHeightData} from "../../connection/event/data/RoomHeightData";
import {RoomFurnitureListData} from "../../connection/event/data/RoomFurnitureListData";
import {RoomFurnitureData} from "../../connection/event/data/RoomFurnitureData";
import {RoomFurnitureRemoveData} from "../../connection/event/data/RoomFurnitureRemoveData";
import {RoomFurniture} from "./RoomFurniture";
import {RoomTile} from "./RoomTile";
import {mget} from "../../utils/ArrayUtils";

export class Room {
    private eventAPI: EventAPI;
    private height: number;
    private width: number;
    private furniture: Map<number, RoomFurniture>;
    private tiles: RoomTile[][];

    constructor(eventAPI: EventAPI) {
        this.height = -1;
        this.width = -1;
        this.eventAPI = eventAPI;
        this.furniture = new Map();
        this.tiles = new Array<RoomTile[]>(0);

        eventAPI.listen(IncomingEvent.RoomStackHeights, (data: RoomHeightData) => {
            this.height = data.height;
            this.width = data.width;

            const height: number = data.height;
            const width: number = data.width;

            this.tiles = new Array<RoomTile[]>(height);

            for (let h = 0; h < height; h++) {
                this.tiles[h] = new Array<RoomTile>(width);
                for (let w = 0; w < width; w++) {
                    const tile = new RoomTile(h, w);
                    tile.stackHeight = mget(data.heights, height, width, h, w);
                    this.tiles[h][w] = tile;
                }
            }

            Console.log(`%c[Room] %cSet room stack heights`, 'color: cyan', 'color: white');
            Console.log(this);
        });

        eventAPI.listen(IncomingEvent.RoomFloorHeights, (data: RoomFloorData) => {
            for (let h = 0; h < this.height; h++) {
                for (let w = 0; w < this.width; w++) {
                    const tile = this.tiles[h][w];
                    tile.floorHeight = data.heightMap[h][w];
                }
            }

            Console.log(`%c[Room] %cSet room floor heights`, 'color: cyan', 'color: white');
            Console.log(this);
        });

        eventAPI.listen(IncomingEvent.RoomFurnitureList, (data: RoomFurnitureListData) => {

            this.furniture.clear();

            for (let furnitureData of data.items) {
                this.addFurni(furnitureData);
            }

            Console.log(`%c[Room] %cSet furniture list`, 'color: cyan', 'color: white');
            Console.log(this);
        })

        eventAPI.listen(IncomingEvent.RoomFurniturePlace, (data: RoomFurnitureData) => {
            this.addFurni(data);
            Console.log(`%c[Room] %cUpdated furniture list`, 'color: cyan', 'color: white');
            Console.log(this);
        })

        eventAPI.listen(IncomingEvent.RoomFurnitureRemove, (data: RoomFurnitureRemoveData) => {
            this.removeFurni(data.itemId);
            Console.log(`%c[Room] %cUpdated furniture list`, 'color: cyan', 'color: white');
            Console.log(this);
        })

        eventAPI.listen(IncomingEvent.RoomFurnitureUpdate, (data: RoomFurnitureData) => {
            const newStatus = data;
            const prevStatus = this.furniture.get(newStatus.itemId);

            if (prevStatus) {
                prevStatus.w = newStatus.w;
                prevStatus.h = newStatus.h;
                prevStatus.direction = newStatus.direction;
                prevStatus.stackHeight = newStatus.stackHeight;
                prevStatus.state = newStatus.state;
            }
        })
    }

    private createRoomFurni(furniData: RoomFurnitureData): RoomFurniture {
        let roomFurniture = new RoomFurniture();
        roomFurniture.id = furniData.itemId;
        roomFurniture.w = furniData.w;
        roomFurniture.h = furniData.h;
        roomFurniture.stackHeight = furniData.stackHeight
        roomFurniture.direction = furniData.direction;
        roomFurniture.hasBeenRemoved = false;
        roomFurniture.owner = {
            id: furniData.userId,
            username: furniData.username
        }
        roomFurniture.spriteId = furniData.spriteId;
        return roomFurniture;
    }

    private addFurni(furniData: RoomFurnitureData) {
        const roomFurniture = this.createRoomFurni(furniData);
        this.furniture.set(roomFurniture.id, roomFurniture);

        const tile = this.tiles[roomFurniture.w][roomFurniture.h];

        if (tile) {
            tile.furnitures.push(roomFurniture);
        }

        else {
            Console.log(`%c[Room]%c O tile (h: ${roomFurniture.w}, w: ${roomFurniture.h}) não existe para que uma mobília seja colocada em cima.`, 'color: cyan', 'color:' +
                ' white')
        }
    }

    private removeFurni(id: number) {
        const roomFurniture = this.furniture.get(id);
        roomFurniture.hasBeenRemoved = true;

        const tile = this.tiles[roomFurniture.w][roomFurniture.h];

        if (tile) {
            tile.furnitures = tile.furnitures.filter((furni) => furni.id !== id);
        }

        else {
            Console.log(`%c[Room]%c O tile (h: ${roomFurniture.w}, w: ${roomFurniture.h}) não existe para que uma mobília seja colocada em cima.`, 'color: cyan', 'color:' +
                ' white')
        }

        this.furniture.delete(id);
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