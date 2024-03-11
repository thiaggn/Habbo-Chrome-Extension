import {BufferReader} from "./BufferReader";
import {FurnitureDataParser} from "../data/FurnitureDataParser";
import {RoomFurnitureData} from "../hotel/room/event/data/RoomFurnitureData";

export function readFurniData(buffer: BufferReader): RoomFurnitureData {
    const item = new RoomFurnitureData();
    item.itemId = buffer.readInt();
    item.spriteId = buffer.readInt();
    item.w = buffer.readInt();
    item.h = buffer.readInt();
    item.direction =  ((buffer.readInt() % 8) * 45);
    item.z = parseFloat(buffer.readString())
    item.stackHeight = parseFloat(buffer.readString());
    item.extra = buffer.readInt();
    item.data = FurnitureDataParser.parseObjectData(buffer);
    item.state = parseFloat(item.data && item.data.getLegacyString())
    item.expires = buffer.readInt();
    item.usagePolicy = buffer.readInt();
    item.userId = buffer.readInt();

    return item;
}