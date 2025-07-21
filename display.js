import {CacheMemory} from './classes.js';


// HTML elements
// table bodies
const cacheTableBody = document.getElementById("cacheTableBody");
const memoryTableBody = document.getElementById("memoryTableBody");
// table headers
const cacheTableHeader = document.getElementById("cacheTableHeader");
const memoryTableHeader = document.getElementById("memoryTableHeader");
// menu selects
const cacheWordsSelect = document.getElementById("cacheWords");
const associativitySelect = document.getElementById("associativity");
const wordsPerBlockSelect = document.getElementById("wordsPerBlock");

handleConfigChange();

function handleConfigChange() {
  const totalWords = parseInt(cacheWordsSelect.value);
  const associativity = parseInt(associativitySelect.value);
  const wordsPerBlock = parseInt(wordsPerBlockSelect.value);

  // Check if all values are selected
  if (!isNaN(totalWords) && !isNaN(associativity) && !isNaN(wordsPerBlock)) {
    // You can now use these to build your table or initialize your cache
    const myCache = new CacheMemory(totalWords, associativity, wordsPerBlock);
    myCache.print();
    
    buildCacheHeader(myCache);
    populateCacheTable(myCache);

    myCache.setCacheData(0,0,0,50);
    populateCacheTable(myCache);

    myCache.setCacheData(1,1,0,75);
    populateCacheTable(myCache);


  }
}

// Attach change listeners to each dropdown
cacheWordsSelect.addEventListener("change", handleConfigChange);
associativitySelect.addEventListener("change", handleConfigChange);
wordsPerBlockSelect.addEventListener("change", handleConfigChange);

function buildCacheHeader(cacheInstance) {
    const headerRow = document.createElement("tr");

    for (let i = 0; i < cacheInstance.associativity; i++) {
        const vTh = document.createElement("th");
        vTh.textContent = "V";

        const tagTh = document.createElement("th");
        tagTh.textContent = "Tag";

        const dataTh = document.createElement("th");
        dataTh.textContent = "Data";

        headerRow.appendChild(vTh);
        headerRow.appendChild(tagTh);
        headerRow.appendChild(dataTh);
    }

    cacheTableHeader.innerHTML = ''; // clear previous header
    cacheTableHeader.appendChild(headerRow);
}

function populateCacheTable(cacheInstance) {
    cacheTableBody.innerHTML = ''; // clear previous rows

    for (let i = 0; i < cacheInstance.numSets; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < cacheInstance.associativity; j++) {
            const block = cacheInstance.cache[i][j];
            const vCell = document.createElement("td");
            vCell.textContent = "0";

            const tagCell = document.createElement("td");
            tagCell.textContent = "-";

            const dataCell = document.createElement("td");
            dataCell.textContent = block[0];

            row.appendChild(vCell);
            row.appendChild(tagCell);
            row.appendChild(dataCell);
        }

        cacheTableBody.appendChild(row);
    }
}
