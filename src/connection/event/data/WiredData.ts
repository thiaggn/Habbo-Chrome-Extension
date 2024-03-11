import {EventData} from "../EventData";
import {WiredSharedData} from "../shared/WiredSharedData";
export class WiredEffectData extends WiredSharedData implements EventData {
    public triggerConfiguration: number;
    public conflictingEffects: number[];
}

export class WiredTriggerData extends WiredEffectData {

}

export class WiredConditionData extends WiredSharedData {
    public type: number;
    public quantifierType: number;
    public quantifierCode: number;
    public isInverted: boolean;
}

export class WiredSelectorData extends WiredSharedData {
    public type: number;
    public isInvert: boolean;
    public isFilter: boolean;
}

export class WiredAddonData extends WiredSharedData{
    public type: number;
}