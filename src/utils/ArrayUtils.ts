export function mget<T>(array: T[], linhas: number, colunas: number, i: number, j: number): T | undefined {
    // Verifica se os índices i e j estão dentro dos limites da matriz
    if (i < 0 || i >= linhas || j < 0 || j >= colunas) {
        return undefined;
    }

    // Calcula a posição no array 1D correspondente aos índices i e j
    const posicao = i * colunas + j;

    // Verifica se a posição está dentro dos limites do array
    if (posicao < 0 || posicao >= array.length) {
        console.error("Posição fora dos limites do array.");
        return undefined;
    }

    return array[posicao];
}
