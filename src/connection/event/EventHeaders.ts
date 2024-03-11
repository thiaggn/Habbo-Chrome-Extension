import {InventoryFurniList} from "./parser/InventoryFurniList";

export enum OutgoingEvent {
    CatalogPurchase = 3492,
    InventoryUpdate = 3150,
    RoomFurniturePlace = 1258,
    RoomFurnitureMove = 248,
    RoomFurnitureRemove = 3456,
    RoomFurnitureUpdate = 248,
    RoomFurnitureUse = 99 // falta
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
    RoomFurnitureUpdate = 3776,
    WiredCondition = 1108,
    WiredEffect = 1434,
    WiredTrigger = 383,
    WiredSelector = 362,
    WiredAddon = 356,
}