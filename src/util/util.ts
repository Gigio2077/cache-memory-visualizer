export function hexString(n: number): string {
    const hex = n.toString(16);
    return "0x" + "0".repeat(2 - hex.length) + hex;
}