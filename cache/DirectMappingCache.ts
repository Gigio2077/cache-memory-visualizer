import { IBlock , ICache} from "./interfaces";
import { RAM } from "./ram";

export class DirectMappingCache implements ICache {
    blocks: IBlock[]

    constructor(size: number) {
        for(let i = 0; i < size; i++){
            this.blocks.push({
                valid: false,
                tag: 0,
                data: [0]
            })
        }

        console.log(this.blocks)
    }

    lookup(address: number): number {
        let index = (address & 0xE) >> 1;
        let tag = address & 0x1;

        let block = this.blocks[index];

        if (block.valid && block.tag == tag) {
            return block.data[0];
        }

        block.valid = true;
        block.tag = tag;
        block.data = [RAM[address]];

        return block.data[0];
    }
}