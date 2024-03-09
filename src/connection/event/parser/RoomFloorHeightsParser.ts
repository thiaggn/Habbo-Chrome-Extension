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
            let iterator: number = 0;

            while (iterator < modelRows) {
                const row: string = roomFloor.model[iterator];
                if (row.length > width) {
                    width = row.length;
                }
                iterator++;
            }

            roomFloor.heightMap = [];
            iterator = 0;

            while (iterator < modelRows) {
                const heightMap: number[] = [];
                let subIterator: number = 0;
                while (subIterator < width) {
                    heightMap.push(-110);
                    subIterator++;
                }
                roomFloor.heightMap.push(heightMap);
                iterator++;
            }

            roomFloor.width = width;
            roomFloor.height = modelRows;
            iterator = 0;

            while (iterator < modelRows) {
                const text: string = roomFloor.model[iterator];

                if (text.length > 0) {
                    let subIterator: number = 0;
                    while (subIterator < text.length) {
                        const character: string = text.charAt(subIterator);
                        let height: number = -110;

                        if (character !== 'x' && character !== 'X') {
                            height = parseInt(character, 36);
                            roomFloor.heightMap[iterator][subIterator] = height;
                        }

                        subIterator++;
                    }
                }

                iterator++;
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