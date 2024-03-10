import {InventoryFurniList} from "./parser/InventoryFurniList";

export enum OutgoingEvent {
    CatalogPurchase = 3492,
    InventoryUpdate = 3150,
    RoomFurniturePlace = 1258,
    RoomFurnitureMove = 248,
    RoomFurnitureRemove = 3456,
    RoomFurnitureUpdate = 248,
    RoomFurnitureUse = 99,
    WiredConditionSave = 3203,
    WiredSelectorSave = 363, // sem
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