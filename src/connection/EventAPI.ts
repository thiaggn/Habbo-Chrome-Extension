import {BufferReader} from "../utils/BufferReader";
import {IncomingEvent} from "./event/EventHeaders";
import {InventoryFurniRemoveParser} from "./event/parser/InventoryFurniRemoveParser";
import {EventParser} from "./event/EventParser";
import {EventData} from "./event/EventData";
import {Console} from "../utils/Console";
import {UserInventoryData} from "./event/data/event-issued/UserInventoryData";
import {CatalogPageData} from "./event/data/event-issued/CatalogPageData";
import {CatalogPageParser} from "./event/parser/CatalogPageParser";
import {EventComposer} from "./event/EventComposer";
import {OutgoingHeader} from "../temp/OutgoingHeaders";
import {IncomingHeader} from "../temp/IncomingHeaders";
import {CatalogPurchaseData} from "./event/data/PurchaseOK";
import {CatalogPurchaseParser} from "./event/parser/CatalogPurchaseParser";
import {InventoryRemovedFurniData} from "./event/data/InventoryRemovedFurniData";
import {InventoryFurniList} from "./event/parser/InventoryFurniList";
import {EventObserver} from "../utils/EventObserver";
import {RoomFloorData} from "./event/data/RoomFloorData";
import {RoomFloorHeightsParser} from "./event/parser/RoomFloorHeightsParser";
import {RoomHeightData} from "./event/data/RoomHeightData";
import {RoomStackHeightsParser} from "./event/parser/RoomStackHeightsParser";
import {RoomFurnitureListData} from "./event/data/RoomFurnitureListData";
import {RoomFurnitureListParser} from "./event/parser/RoomFurnitureListParser";
import {RoomFurnitureData} from "./event/data/RoomFurnitureData";
import {RoomFurniturePlaceParser} from "./event/parser/RoomFurniturePlaceParser";
import {RoomFurnitureRemoveData} from "./event/data/RoomFurnitureRemoveData";
import {RoomFurnitureRemoveParser} from "./event/parser/RoomFurnitureRemoveParser";
import {RoomFurnitureUpdateParser} from "./event/parser/RoomFurnitureUpdateParser";


// Associa um evento que está chegando ao seu tipo de dado;
type IncomingDataMap = {
    [IncomingEvent.InventoryFurniList]: UserInventoryData;
    [IncomingEvent.CatalogPage]: CatalogPageData;
    [IncomingEvent.PurchaseSuccess]: CatalogPurchaseData;
    [IncomingEvent.InventoryFurniRemove]: InventoryRemovedFurniData;
    [IncomingEvent.RoomFloorHeights]: RoomFloorData;
    [IncomingEvent.RoomStackHeights]: RoomHeightData,
    [IncomingEvent.RoomFurnitureList]: RoomFurnitureListData,
    [IncomingEvent.RoomFurniturePlace]: RoomFurnitureData,
    [IncomingEvent.RoomFurnitureUpdate]: RoomFurnitureData
    [IncomingEvent.RoomFurnitureRemove]: RoomFurnitureRemoveData,
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
    ])

    public sendEvent(composer: EventComposer) {
        this._socket.send(composer.buffer);
    }

    private parseEvent(data: ArrayBuffer) {
        const buffer = new BufferReader(data);
        const length: number = buffer.readInt();
        const header: number = buffer.readShort();

        const parser: EventParser = this.eventParsers.get(header);

        Console.log(
            `%c[EventAPI] %c🟢 ${IncomingHeader[header]} %c${length} ${header} ${parser ? 'Y' : 'N'}`,
            'color: #e0f59a', 'color: white', 'color: gray'
        );

        if (parser) {

            try {
                const data: EventData = parser.parse(buffer);
                this.callObservers(header, data);
            }

            catch (err) {
                Console.log(`[EventAPI] Error parsing event ${IncomingHeader[header]}`);
                Console.log(err);
            }
        }
    }

    private exposeHeader(buffer: ArrayBuffer): void {
        const reader = new BufferReader(buffer);
        const length = reader.readInt();
        const header = reader.readShort();

        Console.log(
            `%c[EventAPI] %c🔵 ${OutgoingHeader[header]} %cLen: ${length}`,
            'color: #e0f59a', 'color: white', 'color: gray'
        );
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