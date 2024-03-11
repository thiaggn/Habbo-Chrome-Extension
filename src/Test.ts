import {WSNetwork} from "./WSNetwork";

async function main() {
    const [eventApi, room, inventory, catalog] = await WSNetwork.init();
}

main();

