import {Room} from "./hotel/room/Room";
import {Inventory} from "./hotel/inventory/Inventory";
import {Catalog} from "./hotel/catalog/Catalog";
import {EventAPI} from "./connection/EventAPI";
import {DataAPI} from "./connection/DataAPI";
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