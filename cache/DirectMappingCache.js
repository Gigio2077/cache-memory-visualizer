"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectMappingCache = void 0;
var ram_1 = require("./ram");
var word_size = 4; // 4 byte words
var DirectMappingCache = /** @class */ (function () {
    // Índice: endereço // tamanho_do_bloco % número_de_linhas - // denota divisão inteira
    // offset = endereço % tamanho_do_bloco
    function DirectMappingCache(block_count, block_size) {
        if (block_size % word_size !== 0) {
            throw new Error("block_size deve ser um múltiplo de word_size");
            // por exemplo, um block_size = 8 bytes indica 2 palavras por bloco 
        }
        this.blocks = [];
        this.block_count = block_count;
        this.block_size = block_size;
        for (var i = 0; i < block_count; i++) {
            var data = [];
            for (var j = 0; j < this.block_size / word_size; j++) {
                data.push(0);
            }
            this.blocks.push({
                valid: false,
                tag: 0,
                data: data
            });
        }
        console.log("Cold Start:");
        console.log(this.blocks);
    }
    DirectMappingCache.prototype.lookup = function (address) {
        var offsetBits = Math.log(this.block_size / word_size) / Math.log(2); // log2 equivalent
        var indexBits = Math.log(this.block_count) / Math.log(2); // log2 equivalent
        var index = Math.floor(address / this.block_size) % this.block_count;
        var word_offset = Math.floor(address % (this.block_size / word_size));
        var tag = Math.floor(address / (this.block_size * this.block_count));
        var block = this.blocks[index];
        console.log("Acessando endere\u00E7o: ".concat(address, ", \u00EDndice: ").concat(index, ", word_offset: ").concat(word_offset));
        if (block.valid && block.tag === tag) {
            console.log("HIT");
            return block.data[word_offset];
        }
        console.log("MISS");
        // Carregando bloco
        block.valid = true;
        block.tag = tag;
        block.data = [];
        var baseWordIndex = Math.floor(address / word_size);
        for (var i = 0; i < this.block_size / word_size; i++) {
            block.data[i] = ram_1.RAM[baseWordIndex - (baseWordIndex % (this.block_size / word_size)) + i];
        }
        return block.data[word_offset];
    };
    return DirectMappingCache;
}());
exports.DirectMappingCache = DirectMappingCache;
var myCache = new DirectMappingCache(16, 8);
console.log(myCache.lookup(0));
console.log(myCache.blocks);
console.log(myCache.lookup(0));
console.log(myCache.blocks);
console.log(myCache.lookup(1));
// os comentários :review serão removidos na reunião
