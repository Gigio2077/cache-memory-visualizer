import { ADDRESS_NUM_BITS } from "./Ram";

export type DecodedAddress = {
    tag: number;
    setIndex: number;
    byteOffset: number;
};

export class AddressDecoder {
    readonly byteOffsetNumBits: number;
    readonly setIndexNumBits: number;

    constructor(
       private numSets: number,
       public bytesPerBlock: number
    ) {
        this.byteOffsetNumBits = Math.log2(this.bytesPerBlock);
        this.setIndexNumBits = Math.log2(this.numSets);
    }

    byteOffset(address: number): number {
        const mask = Math.pow(2, this.byteOffsetNumBits) - 1;
        return address & mask;
    }

    setIndex(address: number): number {
        const mask = (Math.pow(2, this.setIndexNumBits) - 1) << this.byteOffsetNumBits;
        return (address & mask) >> this.byteOffsetNumBits;
    }

    tag(address: number): number {
        const totalOffset = this.setIndexNumBits + this.byteOffsetNumBits;
        const mask = (Math.pow(2, ADDRESS_NUM_BITS - totalOffset) - 1) << totalOffset;
        return (address & mask) >> totalOffset;
    }

    decode(address: number): DecodedAddress {
        const tag = this.tag(address);
        const setIndex = this.setIndex(address);
        const byteOffset = this.byteOffset(address);
        return { tag, setIndex, byteOffset };
    }
}