import {WSNetwork} from "./WSNetwork";
import {IncomingEvent} from "./connection/event/EventHeaders";
import {RoomFloorData} from "./connection/event/data/RoomFloorData";
import {Console} from "./utils/Console";

async function main() {
    const [eventApi, room, inventory, catalog] = await WSNetwork.init();
}

main();

