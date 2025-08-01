import { AddressDecoder } from "./AddressDecoder";
import { Ram } from "./Ram";

export interface IBlock {
    valid: boolean,
    tag: number,
    data: number[]
}

export interface ICache {
    readonly decoder: AddressDecoder;
    ram: Ram;

    lookup(address: number): [number, 'hit' | 'miss']

    getBlocks: () => IBlock[][];
}