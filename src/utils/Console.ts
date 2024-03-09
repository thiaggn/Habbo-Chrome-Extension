export class Console {
    private static _globalConsole = console;
    private static _globalConsoleLog = console.log;
    private static _isDebugMode: boolean = true;

    public static log(...args: any): void {
        if(this._isDebugMode) {
            this._globalConsoleLog.apply(console, Array.from(arguments));
            const originalSend = WebSocket.prototype.send;
        }
    }

    public static hex(dataView: DataView, until: number = -1): void {
        const bytes: string[] = [];

        for (let i = 0; i < dataView.byteLength; i++) {
            // Obter o byte em formato hexadecimal
            let hex = dataView.getUint8(i).toString(16).toUpperCase();

            // Adicionar um zero à esquerda se for necessário para manter o formato "00"
            hex = hex.length === 1 ? '0' + hex : hex;

            // Adicionar o byte ao array
            bytes.push(hex);
        }

        // Imprimir os bytes separados por espaços até a posição especificada coloridos
        if (until !== -1) {
            Console.log('\x1b[31m%s\x1b[0m', bytes.slice(0, until).join(' ')); // Cor vermelha
            Console.log(bytes.slice(until).join(' ')); // Restante dos bytes em cor padrão
        } else {
            // Imprimir os bytes sem alterar a cor
            Console.log(bytes.join(' '));
        }
    }
}