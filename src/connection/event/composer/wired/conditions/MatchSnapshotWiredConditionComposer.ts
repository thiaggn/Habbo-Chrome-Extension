import {EventComposer} from "../../../EventComposer";
import {BufferWriter} from "../../../../../utils/BufferWriter";
import {OutgoingEvent} from "../../../EventHeaders";

export enum FurniSource {
    Selector = 0xC8,
    Signal = 0xC9,
    TriggerFurnis = 0x0,
    ConditionFurnis = 0x64
}

export class MatchSnapshotWiredConfiguration {
    targetId: number;
    state: boolean;
    direction: boolean;
    position: boolean;
    height: boolean;
    selectedFurnis: number[] = [];
    mustAllFurnisMatch: boolean;
    source: FurniSource
}

export class MatchSnapshotWiredConditionComposer implements EventComposer{
    buffer: ArrayBuffer;

    constructor(config: MatchSnapshotWiredConfiguration) {
        const buffer = new BufferWriter(OutgoingEvent.WiredConditionSave);
        buffer.writeInt(config.targetId);
        buffer.writeInt(4);
        buffer.writeInt(config.state ? 1 : 0);
        buffer.writeInt(config.direction ? 1 : 0);
        buffer.writeInt(config.position ? 1 : 0);
        buffer.writeInt(config.height ? 1 : 0);
        buffer.writeShort(0);
        buffer.writeInt(config.selectedFurnis.length);

        for(let itemId of config.selectedFurnis) {
            buffer.writeInt(itemId);
        }

        buffer.writeInt(0);
        buffer.writeInt(config.mustAllFurnisMatch ? 1 : 0)
        buffer.writeInt(1);
        buffer.writeInt(config.source);
        buffer.writeInt(0);

        this.buffer = buffer.wrap();
    }

}