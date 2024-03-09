import {ObjectDataBase} from "./ObjectDataBase";
import {IObjectData} from "./IObjectData";
import {objectDataKey} from "./ObjectDataKey";
import {BufferReader} from "../utils/BufferReader";
import {RoomObjectVariable} from "./RoomObjectVariable";
import {IRoomObjectModel} from "./IRoomObjectModel";


export class EmptyDataType extends ObjectDataBase implements IObjectData
{
    public static FORMAT_KEY = objectDataKey.EMPTY_KEY;

    private _state: string;

    public parseWrapper(buffer: BufferReader): void
    {
        if(!buffer) return;

        this._state = '';

        super.parseWrapper(buffer);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariable.FURNITURE_DATA_FORMAT, EmptyDataType.FORMAT_KEY);
    }

    public getLegacyString(): string
    {
        return this._state;
    }

    public compare(data: IObjectData): boolean
    {
        return super.compare(data);
    }
}
