import {InventoryUpdateParser} from "./parser/InventoryUpdateParser";

export enum OutgoingEvent {
    CatalogPurchase = 3492,
    InventoryUpdate = 3150,
    FurniturePlace = 1258,
    FurnitureMove = 248
}

export enum IncomingEvent {
    PurchaseSuccess = 869,
    InventoryUpdate = 994,
    InventoryRemove = 159,
    CatalogPage = 804,
    RoomFloor= 1301,
    RoomHeight = 2753,
    RoomFurnitureList = 1778,
    RoomFurniturePlace = 1534,
}