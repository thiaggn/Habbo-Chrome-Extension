import {IObjectData} from "./IObjectData";
import {BufferReader} from "../utils/BufferReader";
import {objectDataFactory} from "./ObjectDataFactory";

export class FurnitureDataParser
{
    private _itemId: number;
    private _data: IObjectData;

    public flush(): boolean
    {
        this._itemId = 0;
        this._data = null;

        return true;
    }

    public parse(buffer: BufferReader): boolean
    {
        if(!buffer) return false;

        this._itemId = parseInt(buffer.readString());
        this._data = FurnitureDataParser.parseObjectData(buffer);

        return true;
    }

    public static parseObjectData(buffer: BufferReader): IObjectData
    {
        if(!buffer) return null;

        const data = objectDataFactory.getData(buffer.readInt());

        if(!data) return null;

        data.parseWrapper(buffer);

        return data;
    }

    public get furnitureId(): number
    {
        return this._itemId;
    }

    public get objectData(): IObjectData
    {
        return this._data;
    }
}
