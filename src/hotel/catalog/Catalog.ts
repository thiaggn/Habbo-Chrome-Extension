import {WiredAddonID, WiredConditionID, WiredEffectID, WiredExtraID, WiredScoreID, WiredSelectorID, WiredTriggerID, WiredCollection} from "./collections/WiredCollection";
import {CatalogFurniture} from "./CatalogFurniture";
import {FurniWiredAddons} from "../wired/furni/FurniWiredAddons";
import {furniWiredConditions} from "../wired/furni/FurniWiredConditions";
import {furniWiredEffects} from "../wired/furni/FurniWiredEffects";
import {furniWiredExtras} from "../wired/furni/FurniWiredExtras";
import {furniWiredScores} from "../wired/furni/FurniWiredScores";
import {furniWiredSelectors} from "../wired/furni/FurniWiredSelectors";
import {furniWiredTriggers} from "../wired/furni/FurniWiredTriggers";
import {Console} from "../../utils/Console";
import {CatalogPurchaseData} from "./event/data/CatalogPurchase";
import {EventAPI} from "../../event/EventAPI";
import {IncomingEvent, OutgoingEvent} from "../../event/EventHeaders";
import {InventoryUpdateComposer} from "../inventory/event/composer/InventoryUpdateComposer";
import {EventObserver} from "../../event/EventObserver";
import {CatalogPurchaseComposer} from "./event/composer/CatalogPurchaseComposer";
import {OutgoingHeader} from "../../data/OutgoingHeaders";

type FurniSpriteID = WiredAddonID | WiredConditionID | WiredExtraID | WiredEffectID | WiredScoreID | WiredSelectorID | WiredTriggerID;

export enum FurniIDType {
    SpriteID,
    OfferID
}

class PurchaseListener {
    public id: FurniIDType;
    public value: number
}
export class Catalog {
    private _furniInfoMap: Map<FurniSpriteID, CatalogFurniture>;
    private _eventAPI: EventAPI;
    private _listeners: Function[] ;
    constructor(eventAPI: EventAPI) {
        this._eventAPI = eventAPI;
        this._listeners = [];

        this._furniInfoMap = new Map<number, CatalogFurniture>();
        const collections = [FurniWiredAddons, furniWiredConditions, furniWiredEffects, furniWiredExtras, furniWiredScores, furniWiredSelectors, furniWiredTriggers];

        collections.forEach(col => col.forEach(furni => {
            this._furniInfoMap.set(furni.spriteId, furni);
        }));
    }

    public onPurchase(callback: Function) {
        this._listeners.push(callback);
    }

    private dispatchEvent() {
        this._listeners.forEach(listener => listener.call(null));
    }

    public async buy(spriteId: FurniSpriteID, amount: number): Promise<void> {
        let catalogFurni: CatalogFurniture = this._furniInfoMap.get(spriteId);

        if(catalogFurni == null) {
            Console.log(
                `%c[Catalog] %cTentou comprar um mobi que não existe: %c${spriteId}`,
                'color: #e0f59a', 'color: white', 'color: gray'
            );
        }

        else {
            await new Promise<void>((resolve) => {
                this._eventAPI.contract(IncomingEvent.PurchaseSuccess, (purchase: CatalogPurchaseData) => {
                    let isSameProduct = purchase.offerId == catalogFurni.offerId;

                    if(isSameProduct) {
                        Console.log(
                            `%c[Catalog] %cComprou o mobi %c${catalogFurni.classname} com sucesso!`,
                            'color: #e0f59a', 'color: white'
                        );
                        this.dispatchEvent();
                        resolve();
                    }

                    return isSameProduct;
                });

                const composer = new CatalogPurchaseComposer(catalogFurni.pageId, catalogFurni.offerId, "", amount);
                this._eventAPI.sendEvent(composer);
            })
        }
    }
}