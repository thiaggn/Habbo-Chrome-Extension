import {Console} from "../utils/Console";

export abstract class EventObserver<EventMap, EventHeader extends keyof EventMap> {
    private readonly _listeners: Map<EventHeader, Function[]>;
    private readonly _consumers: Map<EventHeader, Function[]>;
    private readonly _contracts: Map<EventHeader, Function[]>;

    protected constructor() {
        this._listeners = new Map();
        this._consumers = new Map();
        this._contracts = new Map();
    }

    public listen<H extends EventHeader>(header: H, callback: (event: EventMap[H]) => void) {
        this.addToMap(this._listeners, header, callback);
    }

    public consume<H extends EventHeader>(header: H, callback: (event: EventMap[H]) => void) {
        this.addToMap(this._consumers, header, callback);
    }

    public contract<H extends EventHeader>(header: H, callback: (event: EventMap[H]) => boolean) {
        this.addToMap(this._contracts, header, callback);
    }

    private addToMap<H extends EventHeader>(map: Map<H, Function[]>, header: H, callback: Function) {
        let callbacks: Function[] | undefined = map.get(header);

        if (callbacks) {
            callbacks.push(callback);
        } else {
            callbacks = [callback];
            map.set(header, callbacks);
        }
    }

    private callListeners<H extends EventHeader>(header: H, event: EventMap[H]): void {
        let listenersForEvent: Function[] = this._listeners.get(header);

        if(!listenersForEvent) return;

        for(let listener of listenersForEvent) {
            listener.call(null, structuredClone(event));
        }
    }

    private callConsumers<H extends EventHeader>(header: H, event: EventMap[H]): void {
        let consumersForEvent: Function[] = this._consumers.get(header);

        if(!consumersForEvent) return;

        for(let consumer of consumersForEvent) {
            consumer.call(null, structuredClone(event));
        }

        this._consumers.set(header, []);
    }

    private callContracts<H extends EventHeader>(header: H, event: EventMap[H]): void {
        let contractsForEvent: Function[] = this._contracts.get(header);

        if(!contractsForEvent) return;

        for(let i = 0; i < contractsForEvent.length; i++) {
            let contract = contractsForEvent[i];

            let renew: boolean = contract.call(null, structuredClone(event));
            if(!renew) contractsForEvent[i] = null;
        }

        this._contracts.set(header, contractsForEvent.filter(contract => contract != null));
    }

    protected callObservers<H extends EventHeader>(header: H, event: EventMap[H]) {
        this.callListeners(header, event);
        this.callContracts(header, event);
        this.callConsumers(header, event);
    }
}