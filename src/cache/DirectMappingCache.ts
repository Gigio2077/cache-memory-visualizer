import { AddressDecoder } from "./AddressDecoder";
import { IBlock, ICache } from "./Interfaces";
import { Ram } from "./Ram";

const RAM: number[] = Array.from({ length: 256 }, (_, i) => i);
const ADDRESS_SIZE: number = 8

// http://www.vlsiip.com/cache/Direct-Mapped-Cache.html
export class DirectMappingCache implements ICache {
    blocks: IBlock[][];
    decoder: AddressDecoder;
    ram: Ram;

    reRender?: () => void;

    constructor(numSets: number, bytesPerBlock: number) {
        this.decoder = new AddressDecoder(numSets, bytesPerBlock);
        this.ram = new Ram();

        this.blocks = Array.from({ length: numSets }, () =>
            Array.from({ length: 1 }, () =>
            ({
                valid: false,
                tag: 0,
                data: Array.from({ length: bytesPerBlock }, () => 0)
            })
            )
        );
    }

    getBlocks(): IBlock[][] {
        return this.blocks;
    }

    getRamStartAddress(address: number): number {        
        return address - (address % this.decoder.bytesPerBlock);
    }

    lookup(address: number): [number, 'hit' | 'miss'] {
        const { tag, setIndex, byteOffset } = this.decoder.decode(address);

        const block = this.blocks[setIndex][0];

        if (block.valid && block.tag == tag) {
            this.reRender?.();
            return [block.data[byteOffset], 'hit'];
        }

        
        for (let i = 0; i < this.decoder.bytesPerBlock; i++) {
            this.blocks[setIndex][0].data[i] = RAM[this.getRamStartAddress(address) + i];
        }
        this.blocks[setIndex][0].valid = true;
        this.blocks[setIndex][0].tag = tag;
        
        this.reRender?.();
        return [this.blocks[setIndex][0].data[byteOffset], 'miss'];
    }
}