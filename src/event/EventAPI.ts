import {BufferReader} from "../utils/BufferReader";
import {IncomingEvent} from "./EventHeaders";
import {InventoryFurniRemoveParser} from "../hotel/inventory/event/parser/InventoryFurniRemoveParser";
import {EventParser} from "./EventParser";
import {EventData} from "./EventData";
import {Console} from "../utils/Console";
import {InventoryData} from "../hotel/inventory/event/data/InventoryData";
import {CatalogPageData} from "../hotel/catalog/event/data/CatalogPageData";
import {CatalogPageParser} from "../hotel/catalog/event/parser/CatalogPageParser";
import {EventComposer} from "./EventComposer";
import {OutgoingHeader} from "../data/OutgoingHeaders";
import {IncomingHeader} from "../data/IncomingHeaders";
import {CatalogPurchaseData} from "../hotel/catalog/event/data/CatalogPurchase";
import {CatalogPurchaseParser} from "../hotel/catalog/event/parser/CatalogPurchaseParser";
import {InventoryRemovedFurniData} from "../hotel/inventory/event/data/InventoryRemovedFurniData";
import {InventoryFurniList} from "../hotel/inventory/event/parser/InventoryFurniList";
import {EventObserver} from "./EventObserver";
import {WiredConditionParser} from "../hotel/wired/event/parser/WiredConditionParser";
import {WiredEffectParser} from "../hotel/wired/event/parser/WiredEffectParser";
import {
    WiredAddonConfiguration,
    WiredConditionConfiguration,
    WiredEffectData,
    WiredSelectorConfiguration,
    WiredTriggerConfiguration
} from "../hotel/wired/event/data/WiredData";
import {WiredSelectorParser} from "../hotel/wired/event/parser/WiredSelectorParser";
import {WiredAddonParser} from "../hotel/wired/event/parser/WiredAddonParser";
import {RoomFloorData} from "../hotel/room/event/data/RoomFloorData";
import {RoomHeightData} from "../hotel/room/event/data/RoomHeightData";
import {RoomFurnitureData} from "../hotel/room/event/data/RoomFurnitureData";
import {RoomFurnitureListData} from "../hotel/room/event/data/RoomFurnitureListData";
import {RoomFurnitureRemoveData} from "../hotel/room/event/data/RoomFurnitureRemoveData";
import {RoomFloorHeightsParser} from "../hotel/room/event/parser/RoomFloorHeightsParser";
import {RoomStackHeightsParser} from "../hotel/room/event/parser/RoomStackHeightsParser";
import {RoomFurnitureListParser} from "../hotel/room/event/parser/RoomFurnitureListParser";
import {RoomFurniturePlaceParser} from "../hotel/room/event/parser/RoomFurniturePlaceParser";
import {RoomFurnitureRemoveParser} from "../hotel/room/event/parser/RoomFurnitureRemoveParser";
import {RoomFurnitureUpdateParser} from "../hotel/room/event/parser/RoomFurnitureUpdateParser";


type IncomingDataMap = {
    [IncomingEvent.InventoryFurniList]: InventoryData;
    [IncomingEvent.CatalogPage]: CatalogPageData;
    [IncomingEvent.PurchaseSuccess]: CatalogPurchaseData;
    [IncomingEvent.InventoryFurniRemove]: InventoryRemovedFurniData;
    [IncomingEvent.RoomFloorHeights]: RoomFloorData;
    [IncomingEvent.RoomStackHeights]: RoomHeightData,
    [IncomingEvent.RoomFurnitureList]: RoomFurnitureListData,
    [IncomingEvent.RoomFurniturePlace]: RoomFurnitureData,
    [IncomingEvent.RoomFurnitureUpdate]: RoomFurnitureData
    [IncomingEvent.RoomFurnitureRemove]: RoomFurnitureRemoveData,
    [IncomingEvent.WiredCondition]: WiredConditionConfiguration,
    [IncomingEvent.WiredEffect]: WiredEffectData,
    [IncomingEvent.WiredTrigger]: WiredTriggerConfiguration
    [IncomingEvent.WiredSelector]: WiredSelectorConfiguration,
    [IncomingEvent.WiredAddon]: WiredAddonConfiguration
};

export class EventAPI extends EventObserver<IncomingDataMap, IncomingEvent> {

    private _socket: WebSocket;
    constructor() {
        super();
    }

    private eventParsers = new Map<IncomingEvent, EventParser>([
        [IncomingEvent.InventoryFurniList, new InventoryFurniRemoveParser()],
        [IncomingEvent.CatalogPage, new CatalogPageParser()],
        [IncomingEvent.PurchaseSuccess, new CatalogPurchaseParser()],
        [IncomingEvent.InventoryFurniRemove, new InventoryFurniList()],
        [IncomingEvent.RoomFloorHeights, new RoomFloorHeightsParser()],
        [IncomingEvent.RoomStackHeights, new RoomStackHeightsParser()],
        [IncomingEvent.RoomFurnitureList, new RoomFurnitureListParser()],
        [IncomingEvent.RoomFurniturePlace, new RoomFurniturePlaceParser()],
        [IncomingEvent.RoomFurnitureRemove, new RoomFurnitureRemoveParser()],
        [IncomingEvent.RoomFurnitureUpdate, new RoomFurnitureUpdateParser()],
        [IncomingEvent.WiredCondition, new WiredConditionParser()],
        [IncomingEvent.WiredEffect, new WiredEffectParser()],
        [IncomingEvent.WiredTrigger, new WiredEffectParser()],
        [IncomingEvent.WiredSelector, new WiredSelectorParser()],
        [IncomingEvent.WiredAddon, new WiredAddonParser()],
    ])
    public sendEvent(composer: EventComposer) {
        this._socket.send(composer.buffer);
    }
    private parseEvent(data: ArrayBuffer) {
        const buffer = new BufferReader(data);
        const length: number = buffer.readInt();
        const header: number = buffer.readShort();
        const parser: EventParser = this.eventParsers.get(header);
        const name: string = IncomingHeader[header];

        Console.log(
            `%c[EventAPI] %c🟢 ${name} %c${length} ${header} ${parser ? 'Y' : 'N'}`,
            'color: #e0f59a', 'color: white', 'color: gray'
        );

        if (parser) {
            try {
                const data: EventData = parser.parse(buffer);
                this.callObservers(header, data);
                Console.log(data);
            }

            catch (err: any) {
                Console.log(`%c[EventAPI] %cError parsing event ${IncomingHeader[header]}`,
                    'color: red', 'color: white');
                Console.log(err);
            }
        }
    }

    private exposeHeader(data: ArrayBuffer): void {
        const buffer = new BufferReader(data);
        const length = buffer.readInt();
        const header = buffer.readShort();
        const name: string = OutgoingHeader[header] ;

        Console.log(
            `%c[EventAPI] %c🔵 ${name} %c ${length} ${header}`,
            'color: #e0f59a', 'color: white', 'color: gray'
        );

        if(!name) {
            Console.hex(new DataView(data));
        }

        if(header == OutgoingHeader.FURNITURE_FLOOR_UPDATE) {
            Console.log('ID', buffer.readInt(), 'x', buffer.readInt(), 'y', buffer.readInt(), 'direction', buffer.readInt());
        }
    }

    public async start(): Promise<void> {
        const originalSend = WebSocket.prototype.send;
        const that = this;

        this._socket = await new Promise(function (resolve, reject) {
            WebSocket.prototype.send = function (data) {
                resolve(this);
                originalSend.call(this, data);

                that.exposeHeader(data as ArrayBuffer);

                WebSocket.prototype.send = function (data: ArrayBuffer) {
                    that.exposeHeader(data as ArrayBuffer);
                    originalSend.call(this, data);
                }
            }
        })

        if (this._socket) {
            this._socket.addEventListener('message', (message: MessageEvent) => {
                that.parseEvent(message.data);
            });
        }
    }
}