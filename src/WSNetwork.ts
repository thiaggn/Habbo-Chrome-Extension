
import {Inventory} from "./hotel/inventory/Inventory";
import {Catalog} from "./hotel/catalog/Catalog";
import {EventAPI} from "./event/EventAPI";
import {DataAPI} from "./event/DataAPI";
import {Room} from "./hotel/room/Room";
export class WSNetwork {
    public static async init(): Promise<[EventAPI, Room, Inventory, Catalog]> {
        const eventAPI = new EventAPI();
        await eventAPI.start();
        const room = new Room(eventAPI);
        const inventory = new Inventory(eventAPI);
        const catalog = new Catalog(eventAPI);

        catalog.onPurchase(inventory.setUpdateFlag.bind(inventory));

        return [eventAPI, room, inventory, catalog];
    }
}