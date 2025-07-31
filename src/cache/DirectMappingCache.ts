import { IBlock, ICache } from "./Interfaces";

const RAM: number[] = Array.from({ length: 256 }, (_, i) => i);
const ADDRESS_SIZE: number = 8

// http://www.vlsiip.com/cache/Direct-Mapped-Cache.html
export class DirectMappingCache implements ICache {
    blocks: IBlock[][];
    bytes_per_block: number;
    block_count: number;

    byte_location_num_bits: number;
    line_location_num_bits: number;

    reRender?: () => void;

    constructor(block_count: number, bytes_per_block: number) {
        this.blocks = Array.from({ length: block_count }, () =>
            Array.from({ length: 1 }, () =>
            ({
                valid: false,
                tag: 0,
                data: Array.from({ length: bytes_per_block }, () => 0)
            })
            )
        );

        this.bytes_per_block = bytes_per_block;
        this.block_count = block_count;

        this.byte_location_num_bits = Math.log2(this.bytes_per_block);
        this.line_location_num_bits = Math.log2(this.block_count);
    }

    getBlocks(): IBlock[][] {
        return this.blocks;
    }

    getByteLocation(address: number): number {
        const byte_location_mask = Math.pow(2, this.byte_location_num_bits) - 1;
        return address & byte_location_mask;
    }

    getLineLocation(address: number): number {
        const line_location_num_bits = Math.log2(this.block_count);
        const line_location_mask = (Math.pow(2, line_location_num_bits) - 1) << this.byte_location_num_bits;
        return (address & line_location_mask) >> this.byte_location_num_bits;
    }

    getTag(address): number {
        const tag_num_bits = ADDRESS_SIZE - this.byte_location_num_bits - this.line_location_num_bits;
        const tag_mask = (Math.pow(2, tag_num_bits) - 1) << (this.byte_location_num_bits + this.line_location_num_bits);
        return (address & tag_mask) >> (this.byte_location_num_bits + this.line_location_num_bits);
    }

    lookup(address: number): [number, 'hit' | 'miss'] {
        const byte_location = this.getByteLocation(address);
        const line_location = this.getLineLocation(address);
        const tag = this.getTag(address);

        let block = this.blocks[line_location][0];

        if (block.valid && block.tag == tag) {
            this.reRender?.();
            return [block.data[byte_location], 'hit'];
        }

        const ram_start_addr = address - (address % this.bytes_per_block);
        const offset = address % this.bytes_per_block;

        for (let i = 0; i < this.bytes_per_block; i++) {
            this.blocks[line_location][0].data[i] = RAM[ram_start_addr + i];
        }
        this.blocks[line_location][0].valid = true;
        this.blocks[line_location][0].tag = tag;

        this.reRender?.();
        return [this.blocks[line_location][0].data[offset], 'miss'];
    }
}