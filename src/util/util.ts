import { ADDRESS_NUM_BITS } from "../cache/Ram";

export function hexString(n: number): string {
    const hex = n.toString(16);
    return "0x" + "0".repeat(2 - hex.length) + hex;
}

export function BinString(n: number, prefix: string = "0b", length: number = ADDRESS_NUM_BITS): string {
    const bin = n.toString(2);
    return prefix + "0".repeat(length - bin.length) + bin;
}