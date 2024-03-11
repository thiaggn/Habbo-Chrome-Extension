import {WiredInputSourcesConfiguration} from "../data/WiredInputSourcesConfiguration";

export class WiredSharedData {
    public stuffTypeSelectionEnabled: boolean;
    public furniLimit: number;
    public id: number;
    public stringParam: string;
    public stuffTypeId: number;
    public stuffTypeSelectionCode: number;
    public advancedMode: number;
    public inputSourcesConf: WiredInputSourcesConfiguration;
    public allowWallFurni: number;
    public stuffIds: number[] = [];
    public intParams: number[] = [];
    public furniSourceTypes: number[] = [];
    public userSourceTypes: number[] = [];
}