import { IBlock , ICache} from "./interfaces";
import { RAM } from "./ram";

const word_size: number = 4; // 4 byte words

export class DirectMappingCache implements ICache {
    blocks: IBlock[]
    block_count: number; // review: total_words é péssimo
    block_size: number; // review: antigo words_per_block
    
    // Índice: endereço // tamanho_do_bloco % número_de_linhas - // denota divisão inteira
    // offset = endereço % tamanho_do_bloco
    
    constructor(block_count: number, block_size: number ) {
        if (block_size % word_size !== 0){
            throw new Error("block_size deve ser um múltiplo de word_size");
            // por exemplo, um block_size = 8 bytes indica 2 palavras por bloco 
        }
        this.blocks = [];
        this.block_count = block_count;
        this.block_size = block_size;
        
        for(let i = 0; i < block_count; i++){
            let data: number[] = []; 
            for (let j = 0; j < this.block_size / word_size; j++) {
                data.push(0);
            }
            this.blocks.push({
                valid: false,
                tag: 0,
                data
            })
        }
        console.log("Cold Start:");
        console.log(this.blocks);
    }

    lookup(address: number): number {
        const offsetBits = Math.log(this.block_size / word_size) / Math.log(2); // log2 equivalent
        const indexBits = Math.log(this.block_count) / Math.log(2); // log2 equivalent
        const index = Math.floor(address / this.block_size) % this.block_count;
        const word_offset = Math.floor(address % (this.block_size / word_size));
        const tag = Math.floor(address / (this.block_size * this.block_count));
        
        let block = this.blocks[index];
        console.log(`Acessando endereço: ${address}, índice: ${index}, word_offset: ${word_offset}`);
        if (block.valid && block.tag === tag) {
            console.log("HIT");
            return block.data[word_offset];
        }
        console.log("MISS");
        // Carregando bloco
        block.valid = true;
        block.tag = tag;
        block.data = [];
        const baseWordIndex = Math.floor(address / word_size);
        
        for (let i = 0; i < this.block_size / word_size; i++) {
            block.data[i] = RAM[baseWordIndex - (baseWordIndex % (this.block_size / word_size)) + i];
        }

        return block.data[word_offset];
    }
}

let myCache = new DirectMappingCache(16, 8);
console.log(myCache.lookup(0));
console.log(myCache.blocks);
console.log(myCache.lookup(0));
console.log(myCache.blocks);
console.log(myCache.lookup(1));


// os comentários :review serão removidos na reunião