

export class BufferWriter
{
    private buffer: Uint8Array;
    private position: number;

    constructor(header?: number) {
        this.buffer = new Uint8Array(4);
        this.position = 4; // Iniciar a posição após os 4 bytes reservados

        if(header) {
            this.writeShort(header);
        }
    }

    public getBuffer(): ArrayBuffer {
        // Escrever o comprimento atual do buffer nos primeiros 4 bytes
        const bufferLength = this.buffer.length - 4;
        this.buffer[0] = (bufferLength >> 24) & 0xFF;
        this.buffer[1] = (bufferLength >> 16) & 0xFF;
        this.buffer[2] = (bufferLength >> 8) & 0xFF;
        this.buffer[3] = bufferLength & 0xFF;

        // Retornar o ArrayBuffer completo, incluindo os 4 bytes extras reservados para o comprimento
        return this.buffer.buffer;
    }
    public writeByte(byte: number): BufferWriter
    {
        const array = new Uint8Array(1);

        array[0] = byte;

        this.appendArray(array);

        return this;
    }

    public writeBytes(bytes: ArrayBuffer | number[]): BufferWriter
    {
        const array = new Uint8Array(bytes);

        this.appendArray(array);

        return this;
    }

    public writeShort(short: number): BufferWriter
    {
        const array = new Uint8Array(2);

        array[0] = short >> 8;
        array[1] = short & 0xFF;

        this.appendArray(array);

        return this;
    }

    public writeInt(integer: number): BufferWriter
    {
        const array = new Uint8Array(4);

        array[0] = integer >> 24;
        array[1] = integer >> 16;
        array[2] = integer >> 8;
        array[3] = integer & 0xFF;

        this.appendArray(array);

        return this;
    }

    public writeString(string: string, includeLength: boolean = true): BufferWriter
    {
        const array = new TextEncoder().encode(string);

        if(includeLength)
        {
            this.writeShort(array.length);
            this.appendArray(array);
        }
        else
        {
            this.appendArray(array);
        }

        return this;
    }

    private appendArray(array: Uint8Array): void
    {
        if(!array) return;

        const mergedArray = new Uint8Array(((this.position + array.length) > this.buffer.length) ? (this.position + array.length) : this.buffer.length);

        mergedArray.set(this.buffer);
        mergedArray.set(array, this.position);

        this.buffer = mergedArray;
        this.position += array.length;
    }
}
