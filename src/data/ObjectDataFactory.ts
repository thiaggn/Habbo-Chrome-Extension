import {IObjectData} from "./IObjectData";
import {CrackableDataType} from "./CrackableDataType";
import {EmptyDataType} from "./EmptyDataType";
import {HighScoreDataType} from "./HighScoreDataType";
import {LegacyDataType} from "./LegacyDataType";
import {MapDataType} from "./MapDataType";
import {NumberDataType} from "./NumberDataType";
import {StringDataType} from "./StringDataType";
import {VoteDataType} from "./VoteDataType";


export class objectDataFactory
{
    private static EmptyDataType: number;
    public static getData(flags: number): IObjectData
    {
        let objectData: IObjectData = null;

        switch(flags & 0xFF)
        {
            case CrackableDataType.FORMAT_KEY:
                objectData = new CrackableDataType();
                break;
            case EmptyDataType.FORMAT_KEY:
                objectData = new EmptyDataType();
                break;
            case HighScoreDataType.FORMAT_KEY:
                objectData = new HighScoreDataType();
                break;
            case LegacyDataType.FORMAT_KEY:
                objectData = new LegacyDataType();
                break;
            case MapDataType.FORMAT_KEY:
                objectData = new MapDataType();
                break;
            case NumberDataType.FORMAT_KEY:
                objectData = new NumberDataType();
                break;
            case StringDataType.FORMAT_KEY:
                objectData = new StringDataType();
                break;
            case VoteDataType.FORMAT_KEY:
                objectData = new VoteDataType();
                break;
        }

        if(!objectData) return null;

        objectData.flags = (flags & 0xFF00);

        return objectData;
    }
}
