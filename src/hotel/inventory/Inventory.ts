import {EventAPI} from "../../connection/EventAPI";
import {InventoryFurniture} from "./InventoryFurniture";
import {IncomingEvent, OutgoingEvent} from "../../connection/event/EventHeaders";
import {InventoryData} from "../../connection/event/data/InventoryData";
import {CatalogPurchaseData} from "../../connection/event/data/CatalogPurchase";
import {InventoryRemovedFurniData} from "../../connection/event/data/InventoryRemovedFurniData";
import {Console} from "../../utils/Console";
import {InventoryUpdateComposer} from "../../connection/event/composer/InventoryUpdateComposer";
import {OutgoingHeader} from "../../temp/OutgoingHeaders";

export class Inventory {

    private eventAPI: EventAPI;
    private furnis: Map<number, InventoryFurniture>;
    private mustUpdate: boolean = true;
    private furnisToRemove: number[] = [];

    public setUpdateFlag(): void {
        this.mustUpdate = true;
    }
    constructor(eventAPI: EventAPI) {
        this.eventAPI = eventAPI;
        this.furnis = new Map();

        eventAPI.listen(IncomingEvent.PurchaseSuccess, (event: CatalogPurchaseData) => {
            this.mustUpdate = true;
        })

        eventAPI.listen(IncomingEvent.InventoryFurniList, (event: InventoryData) => {
            this.mustUpdate = false;
        })

        eventAPI.listen(IncomingEvent.InventoryFurniRemove, async (event: InventoryRemovedFurniData) => {
            this.mustUpdate = true;
        })
    }

    private async updateInventory(): Promise<void> {

        const update = await new Promise<InventoryData>((resolve) => {
            const composer = new InventoryUpdateComposer();
            this.eventAPI.sendEvent(composer);

            this.eventAPI.consume(IncomingEvent.InventoryFurniList, (event: InventoryData) => {
                resolve(event);
            })
        })

        Console.log(
            `%c[Inventory] %cAtualizou inventário com ${update.mobiList.size} itens.`,
            'color: #e0f59a', 'color: white'
        );

        this.furnis = update.mobiList;
    }
    public async getFurniBySprite(spriteId: number): Promise<InventoryFurniture> {
        if (this.mustUpdate) await this.updateInventory();

        for (let [key, value] of this.furnis) {
            if (value.spriteId == spriteId) {
                return value;
            }
        }
    }
    public async getAllFurnisBySprite(spriteId: number): Promise<InventoryFurniture[]> {
        if (this.mustUpdate) await this.updateInventory();
        let mobis: InventoryFurniture[] = [];

        for (let [key, value] of this.furnis) {
            if (value.spriteId == spriteId) {
                mobis.push(value);
            }
        }

        return mobis;
    }

    public async getFurnisBySprite(spriteId: number, count: number): Promise<InventoryFurniture[]> {
        if (this.mustUpdate) await this.updateInventory();
        let mobis: InventoryFurniture[] = [];

        for (let [key, value] of this.furnis) {
            if(count == 0) break;

            if (value.spriteId == spriteId) {
                mobis.push(value);
                count--;
            }
        }

        return mobis;
    }

    public async getFurni(itemId: number): Promise<InventoryFurniture> {
        if (this.mustUpdate) await this.updateInventory();
        return this.furnis.get(itemId);
    }
}