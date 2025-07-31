export function hexString(n: number): string {
    const hex = n.toString(16);
    return "0x" + "0".repeat(2 - hex.length) + hex;
}

export function BinString(n: number): string {
    const bin = n.toString(2);
    return "0b" + "0".repeat(8 - bin.length) + bin;
}