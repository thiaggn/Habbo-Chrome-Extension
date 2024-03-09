import {ObjectDataBase} from "./ObjectDataBase";
import {objectDataKey} from "./ObjectDataKey";
import {BufferReader} from "../utils/BufferReader";
import {IRoomObjectModel} from "./IRoomObjectModel";
import {RoomObjectVariable} from "./RoomObjectVariable";
import {IObjectData} from "./IObjectData";

export class VoteDataType extends ObjectDataBase
{
    public static FORMAT_KEY = objectDataKey.VOTE_KEY;

    private _state: string;
    private _result: number;

    constructor()
    {
        super();

        this._state = '';
        this._result = 0;
    }

    public parseWrapper(wrapper: BufferReader): void
    {
        if(!wrapper) return;

        this._state = wrapper.readString();
        this._result = wrapper.readInt();

        super.parseWrapper(wrapper);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariable.FURNITURE_DATA_FORMAT, VoteDataType.FORMAT_KEY);

        const data: { [index: string]: string } = {};

        data['S'] = this._state;
        data['R'] = this._result.toString();

        model.setValue(RoomObjectVariable.FURNITURE_DATA, data);
    }

    public getLegacyString(): string
    {
        return this._state;
    }

    public compare(data: IObjectData): boolean
    {
        return true;
    }

    public setString(state: string): void
    {
        this._state = state;
    }

    public get result(): number
    {
        return this._result;
    }
}
