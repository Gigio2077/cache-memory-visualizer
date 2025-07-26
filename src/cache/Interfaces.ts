export interface IBlock {
    valid: boolean,
    tag: number,
    data: number[]
}

export interface ICache {
    lookup: (address: number) => number;
    getBlocks: () => IBlock[] | IBlock[][];
}