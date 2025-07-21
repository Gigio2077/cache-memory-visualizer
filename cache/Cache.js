var RAM = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
];
var DirectMappingCache = /** @class */ (function () {
    function DirectMappingCache(size) {
        this.blocks = Array.from({ length: size }, function () { return ({
            valid: false,
            tag: 0,
            data: [0]
        }); });
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
        block.data = [RAM[address]];
        return block.data[0];
    };
    return DirectMappingCache;
}());
