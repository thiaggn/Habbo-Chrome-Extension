

export class BufferReader {
    private readonly buffer: ArrayBuffer;
    public readonly  dataView: DataView;
    private position: number;

    constructor(buffer: ArrayBuffer | MessageEvent) {
        let inputBuffer = buffer instanceof ArrayBuffer ? buffer : buffer.data;

        // Fazer uma cópia do buffer para garantir que não seja usado como referência
        this.buffer = inputBuffer.slice(0);
        this.dataView = new DataView(this.buffer);
        this.position = 0;
    }

    readInt(): number {
        if (this.position + 4 > this.buffer.byteLength) {
            throw new Error("Fim do buffer alcançado");
        }

        const value = this.dataView.getInt32(this.position, false); // false indica big-endian
        this.position += 4;
        return value;
    }

    skipInt(count: number = 1): void {
        this.position += 4 * count;
    }

    readShort(): number {
        if (this.position + 2 > this.buffer.byteLength) {
            throw new Error("Fim do buffer alcançado");
        }

        const value = this.dataView.getInt16(this.position, false); // false indica big-endian
        this.position += 2;
        return value;
    }

    readBoolean(): boolean {
        if (this.position + 1 > this.buffer.byteLength) {
            throw new Error("Fim do buffer alcançado ao ler o booleano");
        }

        const value = this.dataView.getUint8(this.position);
        this.position += 1;

        return value === 1;
    }

    skipBoolean(count: number = 1): void {
        this.position += count;
    }

    readString(): string {
        const length = this.readShort();
        if (this.position + length > this.buffer.byteLength) {
            throw new Error("Fim do buffer alcançado ao ler a string");
        }

        const stringData = new Uint8Array(this.buffer, this.position, length);
        this.position += length;

        const decoder = new TextDecoder("utf-8");
        return decoder.decode(stringData);
    }

    skipString(): void {
        const length = this.readShort();
        this.position += length;
    }

    public readBytes(length: number): BufferReader {
        const buffer = new BufferReader(this.dataView.buffer.slice(this.position, this.position + length));
        this.position += length;
        return buffer;
    }


    skipBytes(count: number = 1) {
        this.position +=count;
    }
    public readByte(): number {
        const byte = this.dataView.getInt8(this.position);
        this.position++;
        return byte;
    }

    public readFloat(): number {
        const float = this.dataView.getFloat32(this.position);
        this.position += 4;
        return float;
    }

    public readDouble(): number {
        const double = this.dataView.getFloat64(this.position);
        this.position += 8;
        return double;
    }

    public remaining(): number {
        return this.dataView.byteLength - this.position;
    }
    get bytesAvailable(): boolean {
        return this.buffer && (this.remaining() > 0)
    }

    public toString(encoding?: string): string {
        return new TextDecoder().decode(this.dataView.buffer);
    }

    public toArrayBuffer(): ArrayBuffer {
        return this.dataView.buffer;
    }

}
