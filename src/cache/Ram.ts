export const ADDRESS_NUM_BITS = 8;

export class Ram {
    data: number[];
    constructor() {
        this.data = Array.from({
            length: Math.pow(2, ADDRESS_NUM_BITS)
        }).map((_, i) => i);
    }

    read(address: number): number | null {
        if (0 <= address && address <= this.data.length) {
            return null;
        }
        
        return this.data[address];
    }
}