'use-strict'

/**Game Object */
const minecraft = {};

/** @param {number} tileType - represent tile type e.g: 1
  * @returns {string} css class name - e.g: tile-sky */
minecraft.getTileCssClassName = (tileType) => {
  switch(tileType) {
    case 0:
       return 'tile-sky';
    case 1:
      return 'tile-ground'; 
    case 2:
     return 'tile-grass';
    case 3:
      return 'tile-tree-trunk';
    case 4:
      return 'tile-leaves';
    case 5:
      return 'tile-rock'; 
  } 
};
/** Game Map: Sky = 0, Ground = 1, Grass = 2, Tree Trunk = 3, Leaves = 4, Rock = 5 */
minecraft.gameMapMatrix = 
[
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 3, 0, 0, 3, 0, 0, 5, 0, 4, 4, 0, 0, 0, 0, 0, 0, 5, 5],
  [5, 5, 3, 0, 0, 3, 0, 5, 5, 0, 4, 4, 0, 0, 0, 0, 0, 5, 5, 5],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
/** Draw game Map UI + set event listener */
minecraft.initGameMap = (matrix) => {
  //ref -> game map container
  let gameMapContainer = document.querySelector('.map-container');
  //Game map matrix iteration
  for(let row = 0; row < matrix.length; row++){
    for(let col = 0; col < matrix[row].length; col++){
        // Create Base tile
        let tile = document.createElement('div');
        tile.setAttribute('data-matrix-row', row);
        tile.setAttribute('data-matrix-col', col);
        //Set tile UI 
        tile.classList.add('tile');
        tile.classList.add(minecraft.getTileCssClassName(matrix[row][col]));
        //Set tiles event listener
        tile.addEventListener('click', (event) => {
          console.log(`MATRIX ROW ${event.currentTarget.dataset.matrixRow} MATRIX COL ${event.currentTarget.dataset.matrixCol}`);
        })
        // Append current tile to game map
        gameMapContainer.appendChild(tile);
    }
  }
};


/** Tools Array */
minecraft.tools = 
[
  {
    name: 'axe',
    removeTileType: [3, 4],
    className: 'tool-axe'
  },
  {
    name: 'pickaxe',
    removeTileType: [5],
    className: 'tool-pickaxe'
  },
  {
    name: 'shovel',
    removeTileType: [1,2],
    className: 'tool-shovel'
  }
];

/** Draw Tools UI + set event listener */
minecraft.initTools = (toolsArray) => {
  const toolsContainer = document.querySelector('.tools-container');
  // create for each tool object tool UI
  for(let i = 0; i < toolsArray.length; i++){
    // Create Base tool
    const toolDiv = document.createElement('div');
    toolDiv.setAttribute('data-item-type', 'tool');
    toolDiv.setAttribute('data-tools-array-index', i);
    //Set tool UI 
    toolDiv.classList.add('tool');
    toolDiv.classList.add(toolsArray[i].className);
    //Set tool event listener
     toolDiv.addEventListener('click', (event) => {
      console.log(`tool locate in index ${event.currentTarget.dataset.arrayIndex} in tools array`);
    });
    // Append current tile to game map
    toolsContainer.appendChild(toolDiv);
  }
};


/** Tile Inventory: property name represent Tile type, value represent inventory count */
minecraft.inventory = 
{
  1: 0, //Ground
  2: 0, //Grass
  3: 0, //Tree Trunk
  4: 0, //Leaves 
  5: 0  //Rock
};
/** Draw Inventory UI + set event listener */
minecraft.initInventory = (inventory) => {
  const inventoryContainer = document.querySelector('.inventory-container');
  //Create for each inventory item in inventory object UI
  for (const [tileType, inventoryCount] of Object.entries(inventory)) {
    // Create Base inventory item
    let inventoryItemDiv = document.createElement('div');
    inventoryItemDiv.setAttribute('data-item-type', 'inventory-tile');
    inventoryItemDiv.setAttribute('data-tile-type', tileType);
    //Set inventory item UI 
    inventoryItemDiv.classList.add('tile-inventory');
    inventoryItemDiv.classList.add(minecraft.getTileCssClassName(parseInt(tileType)));
    //Set Counter UI
    let inventoryItemCounterSpan = document.createElement('span');
    inventoryItemCounterSpan.classList.add('tile-inventory-counter');
    inventoryItemDiv.appendChild(inventoryItemCounterSpan);
    //Set Counter data
    inventoryItemCounterSpan.textContent = inventoryCount;
    //Set inventory item event listener
    inventoryItemDiv.addEventListener('click', (event) => {
      console.log(`inventory tile item type ${event.currentTarget.dataset.tileType}`);
    });
     //Append current inventory item to inventory container
    inventoryContainer.appendChild(inventoryItemDiv);
  }
}





/** Init Game *****************************************************************************************************/
minecraft.initGameMap(minecraft.gameMapMatrix);
minecraft.initTools(minecraft.tools);
minecraft.initInventory(minecraft.inventory);

minecraft.playMode = 
{
  action: 'remove',
  tileType: [1]
}