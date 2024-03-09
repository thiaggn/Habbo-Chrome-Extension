import {ObjectDataBase} from "./ObjectDataBase";
import {IObjectData} from "./IObjectData";
import {objectDataKey} from "./ObjectDataKey";
import {BufferReader} from "../utils/BufferReader";
import {IRoomObjectModel} from "./IRoomObjectModel";
import {RoomObjectVariable} from "./RoomObjectVariable";


export class LegacyDataType extends ObjectDataBase implements IObjectData
{
    public static FORMAT_KEY = objectDataKey.LEGACY_KEY;

    private _data: string;

    constructor()
    {
        super();

        this._data = '';
    }

    public parseWrapper(wrapper: BufferReader): void
    {
        if(!wrapper) return;

        this._data = wrapper.readString();

        super.parseWrapper(wrapper);
    }

    public initializeFromRoomObjectModel(model: IRoomObjectModel): void
    {
        super.initializeFromRoomObjectModel(model);

        this._data = model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariable.FURNITURE_DATA_FORMAT, LegacyDataType.FORMAT_KEY);
        model.setValue(RoomObjectVariable.FURNITURE_DATA, this._data);
    }

    public getLegacyString(): string
    {
        return this._data;
    }

    public compare(data: IObjectData): boolean
    {
        return (this._data === data.getLegacyString());
    }

    public setString(data: string): void
    {
        this._data = data;
    }
}
