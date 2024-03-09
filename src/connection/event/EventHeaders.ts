import {InventoryFurniList} from "./parser/InventoryFurniList";

export enum OutgoingEvent {
    CatalogPurchase = 3492,
    InventoryUpdate = 3150,
    FurniturePlace = 1258,
    FurnitureMove = 248
}

export enum IncomingEvent {
    PurchaseSuccess = 869,
    InventoryFurniList = 994,
    InventoryFurniRemove = 159,
    CatalogPage = 804,
    RoomFloorHeights= 1301,
    RoomStackHeights = 2753,
    RoomFurnitureList = 1778,
    RoomFurniturePlace = 1534,
    RoomFurnitureRemove = 2703,
    RoomFurnitureUpdate = 3776
}