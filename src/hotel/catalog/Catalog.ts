import {WiredAddonID, WiredConditionID, WiredEffectID, WiredExtraID, WiredScoreID, WiredSelectorID, WiredTriggerID, WiredCategory} from "./WiredCategory";
import {CatalogFurniture} from "../furni/CatalogFurniture";
import {FurniWiredAddons} from "../furni/wired/FurniWiredAddons";
import {furniWiredConditions} from "../furni/wired/FurniWiredConditions";
import {furniWiredEffects} from "../furni/wired/FurniWiredEffects";
import {furniWiredExtras} from "../furni/wired/FurniWiredExtras";
import {furniWiredScores} from "../furni/wired/FurniWiredScores";
import {furniWiredSelectors} from "../furni/wired/FurniWiredSelectors";
import {furniWiredTriggers} from "../furni/wired/FurniWiredTriggers";
import {Console} from "../../utils/Console";
import {CatalogPurchaseData} from "../../connection/event/data/PurchaseOK";
import {EventAPI} from "../../connection/EventAPI";
import {IncomingEvent, OutgoingEvent} from "../../connection/event/EventHeaders";
import {InventoryUpdateComposer} from "../../connection/event/composer/InventoryUpdateComposer";
import {EventObserver} from "../../utils/EventObserver";
import {CatalogPurchaseComposer} from "../../connection/event/composer/CatalogPurchaseComposer";
import {OutgoingHeader} from "../../temp/OutgoingHeaders";

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