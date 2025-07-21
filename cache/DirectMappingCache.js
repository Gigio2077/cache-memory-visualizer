"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectMappingCache = void 0;
var ram_1 = require("./ram");
var DirectMappingCache = /** @class */ (function () {
    function DirectMappingCache(size) {
        for (var i = 0; i < size; i++) {
            this.blocks.push({
                valid: false,
                tag: 0,
                data: [0]
            });
        }
        console.log(this.blocks);
    }
    DirectMappingCache.prototype.lookup = function (address) {
        var index = (address & 0xE) >> 1;
        var tag = address & 0x1;
        var block = this.blocks[index];
        if (block.valid && block.tag == tag) {
            return block.data[0];
        }
        block.valid = true;
        block.tag = tag;
        block.data = [ram_1.RAM[address]];
        return block.data[0];
    };
    return DirectMappingCache;
}());
exports.DirectMappingCache = DirectMappingCache;
