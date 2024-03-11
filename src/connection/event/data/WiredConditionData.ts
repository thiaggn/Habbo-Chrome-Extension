import {InputSourcesConfiguration} from "../parser/WiredConditionParser";

export class WiredConditionData {
    public stuffTypeSelectionEnabled: boolean;
    public furniLimit: number;
    public id: number;
    public stringParam: string;
    public stuffTypeId: number;
    public stuffTypeSelectionCode: number;
    public advancedMode: number;
    public inputSourcesConf: InputSourcesConfiguration;
    public allowWallFurni: number;
    public stuffIds: number[] = [];
    public intParams: number[] = [];
    public furniSourceTypes: number[] = [];
    public userSourceTypes: number[] = [];
    public type: number;
    public quantifierType: number;
    public quantifierCode: number;
    public isInverted: boolean;
}