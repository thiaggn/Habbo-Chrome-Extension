import {EventParser} from "../EventParser";
import {BufferReader} from "../../../utils/BufferReader";
import {EventData} from "../EventData";
import {RoomFloorData} from "../data/RoomFloorData";
import {Console} from "../../../utils/Console";

export class RoomFloorHeightsParser implements EventParser {
    parse(buffer: BufferReader): EventData {

        const roomFloor = new RoomFloorData();
        roomFloor.scale = buffer.readBoolean() ? 32 : 64;
        roomFloor.wallHeight = buffer.readInt();
        roomFloor.model = buffer.readString().split('\r');

        try {
            const modelRows: number = roomFloor.model.length;
            let width: number = 0;
            let height: number = 0;
            let h: number = 0;

            while (h < modelRows) {
                const row: string = roomFloor.model[h];
                if (row.length > width) {
                    width = row.length;
                }
                h++;
            }

            roomFloor.heightMap = [];
            h = 0;

            while (h < modelRows) {
                const heightMap: number[] = [];
                let subIterator: number = 0;
                while (subIterator < width) {
                    heightMap.push(-110);
                    subIterator++;
                }
                roomFloor.heightMap.push(heightMap);
                h++;
            }

            roomFloor.width = width;
            roomFloor.height = modelRows;
            h = 0;

            while (h < modelRows) {
                const text: string = roomFloor.model[h];

                if (text.length > 0) {
                    let w: number = 0;
                    while (w < text.length) {
                        const character: string = text.charAt(w);
                        let height: number = -110;

                        if (character !== 'x' && character !== 'X') {
                            height = parseInt(character, 36);
                            roomFloor.heightMap[h][w] = height;
                        }

                        w++;
                    }
                }

                h++;
            }

            return roomFloor;

        }

        catch (e) {
            Console.log('%c[Parser] %cError parsing room floor data', 'color: cyan', 'color: red');
            Console.log(e);
            return roomFloor;
        }
    }
}