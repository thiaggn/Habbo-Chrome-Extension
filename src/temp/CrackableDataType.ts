import {ObjectDataBase} from "./ObjectDataBase";
import {IObjectData} from "./IObjectData";
import {RoomObjectVariable} from "./RoomObjectVariable";
import {BufferReader} from "../utils/BufferReader";
import {IRoomObjectModel} from "./IRoomObjectModel";
import {objectDataKey} from "./ObjectDataKey";

export class CrackableDataType extends ObjectDataBase implements IObjectData
{
    public static FORMAT_KEY = objectDataKey.CRACKABLE_KEY;

    private _state: string;
    private _hits: number;
    private _target: number;

    constructor()
    {
        super();

        this._state = '';
        this._hits = 0;
        this._target = 0;
    }

    public parseWrapper(buffer: BufferReader): void
    {
        if(!buffer) return;

        this._state = buffer.readString();
        this._hits = buffer.readInt();
        this._target = buffer.readInt();

        super.parseWrapper(buffer);
    }

    public initializeFromRoomObjectModel(model: IRoomObjectModel): void
    {
        super.initializeFromRoomObjectModel(model);

        this._state = model.getValue<string>(RoomObjectVariable.FURNITURE_CRACKABLE_STATE);
        this._hits = model.getValue<number>(RoomObjectVariable.FURNITURE_CRACKABLE_HITS);
        this._target = model.getValue<number>(RoomObjectVariable.FURNITURE_CRACKABLE_TARGET);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariable.FURNITURE_DATA_FORMAT, CrackableDataType.FORMAT_KEY);
        model.setValue(RoomObjectVariable.FURNITURE_CRACKABLE_STATE, this._state);
        model.setValue(RoomObjectVariable.FURNITURE_CRACKABLE_HITS, this._hits);
        model.setValue(RoomObjectVariable.FURNITURE_CRACKABLE_TARGET, this._target);
    }

    public getLegacyString(): string
    {
        return this._state;
    }

    public compare(data: IObjectData): boolean
    {
        return true;
    }

    public get hits(): number
    {
        return this._hits;
    }

    public get target(): number
    {
        return this._target;
    }
}
