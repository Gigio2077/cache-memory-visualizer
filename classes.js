export class CacheMemory {
  constructor(totalWords, associativity, wordsPerBlock) {
    this.totalWords = totalWords;
    this.associativity = associativity; // Number of ways (1 for direct mapped, n for n-way associative)
    this.wordsPerBlock = wordsPerBlock; // Words per block

    this.numBlocks = totalWords / wordsPerBlock; // Total blocks
    this.numSets = totalWords / (associativity * wordsPerBlock); // Number of sets

    this.blockDataSize = wordsPerBlock * 4; // Block size (bytes) assuming 4 bytes per word)

    this.cache = [];
    for (let set = 0; set < this.numSets; set++) {
      const setBlocks = [];
      for (let way = 0; way < this.associativity; way++) {
        const block = new Array(this.wordsPerBlock).fill(null);
        setBlocks.push(block);
      }
      this.cache.push(setBlocks);
    }

    // derived size info both wrong for now
    // this.blockSizeBytes = wordsPerBlock * 4; // + TAMANHO da tag + V - Tamanho words offset
    // this.totalSizeBytes = totalWords * 4;
  
  
  }
  print(){
    console.clear();
    console.log(`Total size: ${this.size} bytes`);
    console.log(`Associativity: ${this.associativity}-way`);
    console.log(`Words per block: ${this.wordsPerBlock}`);
    console.log(`Block size: ${this.blockSize}`)
  }
  
  setCacheData(set, way, offset, data){
    this.cache[set][way][0] = data;
  }

  // getNthSetData(index){
  //   return { v: 1, tag: 100011010, dado:50 };
  // }
  // getTableHeaderSize(){
  //   return this.associativity;
  // }

}
