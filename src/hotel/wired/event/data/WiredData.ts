import {EventData} from "../../../../event/EventData";
import {WiredInputSources} from "./WiredInputSources";

export class WiredSharedData {
    public stuffTypeSelectionEnabled: boolean;
    public furniLimit: number;
    public id: number;
    public stringParam: string;
    public stuffTypeId: number;
    public stuffTypeSelectionCode: number;
    public advancedMode: number;
    public inputSourcesConf: WiredInputSources;
    public allowWallFurni: number;
    public stuffIds: number[] = [];
    public intParams: number[] = [];
    public furniSourceTypes: number[] = [];
    public userSourceTypes: number[] = [];
}

export class WiredEffectData extends WiredSharedData implements EventData {
    public triggerConfiguration: number;
    public conflictingEffects: number[];
}

export class WiredTriggerConfiguration extends WiredEffectData {

}

export class WiredConditionConfiguration extends WiredSharedData {
    public type: number;
    public quantifierType: number;
    public quantifierCode: number;
    public isInverted: boolean;
}

export class WiredSelectorConfiguration extends WiredSharedData {
    public type: number;
    public isInvert: boolean;
    public isFilter: boolean;
}

export class WiredAddonConfiguration extends WiredSharedData{
    public type: number;
}