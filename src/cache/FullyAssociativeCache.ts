import { IBlock, ICache } from "./Interfaces";

const RAM: number[] = Array.from( { length: 256 }, (_, i) => i);
const ADDRESS_SIZE: number = 8

export class FullyAssociativeCache implements ICache {
    blocks: IBlock[];
    bytes_per_block: number;
    block_count: number;

    reRender?: () => void;


    constructor(block_count: number, bytes_per_block: number) {
        this.blocks = Array.from( { length: block_count }, () => {
            return {
                valid: false,
                tag: 0,
                data: Array.from( {length: bytes_per_block }, () => 0)
            }  
        });

        this.bytes_per_block = bytes_per_block;
        this.block_count = block_count;
    }
    
    getBlocks() {
        return this.blocks;
    }
    
    lookup(address: number): number {
        const byte_location_num_bits = Math.log2(this.bytes_per_block);
        const byte_location_mask = Math.pow(2, byte_location_num_bits) - 1;
        const byte_location = address & byte_location_mask;

        const tag_num_bits = ADDRESS_SIZE - byte_location_num_bits;
        const tag_mask = (Math.pow(2, tag_num_bits) - 1) << byte_location_num_bits;
        const tag = (address & tag_mask) >> byte_location_num_bits;

        for (let i = 0; i < this.block_count; i++) {
            if (this.blocks[i].valid && this.blocks[i].tag == tag) {
                return this.blocks[i].data[byte_location];
            }
        }

        const ram_start_addr = address - (address % this.bytes_per_block);
        const offset = address % this.bytes_per_block;

        for (let i = 0; i < this.block_count; i++) {
            if (!this.blocks[i].valid) {
                this.blocks[i].valid = true;
                this.blocks[i].tag = tag;
                for (let j = 0; j < this.bytes_per_block; j++) {
                    this.blocks[i].data[j] = RAM[ram_start_addr + j];
                }
                return this.blocks[i].data[offset];
            }
        }

        return 0;
    }
}