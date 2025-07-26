import { IBlock, ICache } from "./Interfaces";

const RAM: number[] = Array.from( { length: 256 }, (_, i) => i);
const ADDRESS_SIZE: number = 8

// http://www.vlsiip.com/cache/Direct-Mapped-Cache.html
class NWayAssociativeCache implements ICache {
    blocks: IBlock[][];
    line_count: number;
    nway: number;
    bytes_per_block: number;

    constructor(line_count: number, nway: number, bytes_per_block: number) {
        this.blocks = Array.from( { length: line_count }, () => {
            return Array.from( { length: nway}, () => {
                return {
                    valid: false,
                    tag: 0,
                    data: Array.from( {length: bytes_per_block }, () => 0)
                }
            });
        });

        this.line_count = line_count;
        this.nway = nway;
        this.bytes_per_block = bytes_per_block;
    }

    getBlocks(): IBlock[][] {
        return this.blocks;
    }

    lookup(address: number): number {
        const byte_location_num_bits = Math.log2(this.bytes_per_block);
        const byte_location_mask = Math.pow(2, byte_location_num_bits) - 1;
        const byte_location = address & byte_location_mask;

        const line_location_num_bits = Math.log2(this.line_count);
        const line_location_mask = (Math.pow(2, line_location_num_bits) - 1) << byte_location_num_bits;
        const line_location = (address & line_location_mask) >> byte_location_num_bits;

        const tag_num_bits = ADDRESS_SIZE - byte_location_num_bits - line_location_num_bits;
        const tag_mask = (Math.pow(2, tag_num_bits) - 1) << (byte_location_num_bits + line_location_num_bits);
        const tag = (address & tag_mask) >> (byte_location_num_bits + line_location_num_bits);

        let set = this.blocks[line_location];

        for (let i = 0; i < this.nway; i++) {
            if (set[i].valid && set[i].tag == tag) {
                return set[i].data[byte_location];
            }
        }

        const ram_start_addr = address - (address % this.bytes_per_block);
        const offset = address % this.bytes_per_block;

        for (let i = 0; i < this.nway; i++) {
            if (!this.blocks[line_location][i].valid) {
                this.blocks[line_location][i].valid = true;
                this.blocks[line_location][i].tag = tag;

                for (let j = 0; j <this.bytes_per_block; j++) {
                    this.blocks[line_location][i].data[j] = RAM[ram_start_addr + j];
                }

                return this.blocks[line_location][i].data[offset];
            }
        }
    }
}