'use-strict'

/**Game Object */
const minecraft = 
{
  gameMap: {},
  gamePanel: 
  {
    tools: {},
    tilesInventory: {}
  }
};

/** DATA: Game Matrix */
minecraft.gameMap.matrix = 
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
/** SET: Game Map UI + Event Listener */
minecraft.gameMap.init = (matrix) => {
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
        tile.classList.add(minecraft.gameMap.getTileCssClassName(matrix[row][col]));
        //Set tiles event listener
        tile.addEventListener('click', (event) => {

          //Remove action /////////////////////////////////////

          //get selected tile 
          let selectedTile = event.currentTarget;
          //get location in matrix
          let matrixRow = selectedTile.dataset.matrixRow;
          let matrixCol = selectedTile.dataset.matrixCol;
         
         
          // get tile type current tool work with
          let preformOnTilesType = minecraft.action.preformOnTileType; // array [3,4] Tree Trunk = 3, Leaves = 4
          // checks if current tile is Removable
          const isRemovable = preformOnTilesType.some((tileType) => tileType === matrix[matrixRow][matrixCol]);

          // CAN REMOVE
          if (isRemovable){
             //1. update tile ui -> remove current class
             selectedTile.classList.remove(minecraft.gameMap.getTileCssClassName(matrix[matrixRow][matrixCol]));
              
             //2. update inventory object -> add tile TYPE TO INVENTORY (object should update ui?)
             minecraft.gamePanel.tilesInventory.collection
             [matrix[matrixRow][matrixCol]] += 1; 

              //3. Update inventory ui
              // Get div contain the current tile type 
              let inventoryOfCurrentTile = document.querySelector(`[data-inventory-tile-type="${matrix[matrixRow][matrixCol]}"]`);
              let inventoryOfCurrentTileCounter = inventoryOfCurrentTile.querySelector('.tile-inventory-counter');
              // update counter ui with object data -> 
              inventoryOfCurrentTileCounter.textContent = minecraft.gamePanel.tilesInventory.collection[matrix[matrixRow][matrixCol]];
             
             //2. update value to 0 in matrix
              matrix[matrixRow][matrixCol] = 0;
              
              //3. update ui -> ADD  class SKY
              selectedTile.classList.add(minecraft.gameMap.getTileCssClassName(matrix[matrixRow][matrixCol]));
              

          }
          else {
            console.log('cant remove animation on tool');
          }

  
      

        });
        // Append current tile to game map
        gameMapContainer.appendChild(tile);
    }
  }
};
/** @param {number} tileType - represent tile type e.g: 1
  * @returns {string} css class name - e.g: tile-sky */
 minecraft.gameMap.getTileCssClassName = (tileType) => {
  switch(parseInt(tileType)) {
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



/** DATA: Tools Collection */
minecraft.gamePanel.tools.collection = 
[
  {
    name: 'axe',
    removeTileType: [3, 4],
    cssClassName: 'tool-axe'
  },
  {
    name: 'pickaxe',
    removeTileType: [5],
    cssClassName: 'tool-pickaxe'
  },
  {
    name: 'shovel',
    removeTileType: [1,2],
    cssClassName: 'tool-shovel'
  }
];
/** SET: Tools Panel UI + Event Listener */
minecraft.gamePanel.tools.init = (toolsArray) => {
  const toolsContainer = document.querySelector('.tools-container');
  // create for each tool object tool UI
  for(let i = 0; i < toolsArray.length; i++){
    // Create Base tool
    const toolDiv = document.createElement('div');
    toolDiv.setAttribute('data-item-type', 'tool');
    toolDiv.setAttribute('data-tools-array-index', i);
    //Set tool UI 
    toolDiv.classList.add('tool');
    toolDiv.classList.add(toolsArray[i].cssClassName);
    //Set tool event listener
     toolDiv.addEventListener('click', (event) => {
      // console.log(`tool locate in index ${event.currentTarget.dataset.arrayIndex} in tools array`);
      minecraft.setSideBarItemAsSelected(event.currentTarget);
    });
    // Append current tile to game map
    toolsContainer.appendChild(toolDiv);
  }
};



/** DATA: Tile Inventory - Property = Tile type, Value = Inventory Count */
minecraft.gamePanel.tilesInventory.collection = 
{
  1: 0, //Ground
  2: 0, //Grass
  3: 0, //Tree Trunk
  4: 0, //Leaves 
  5: 0  //Rock
};
/** SET: Inventory Panel UI + Event Listener */
minecraft.gamePanel.tilesInventory.init = (inventory) => {
  const inventoryContainer = document.querySelector('.inventory-container');
  //Create for each inventory item in inventory object UI
  for (const [tileType, inventoryCount] of Object.entries(inventory)) {
    // Create Base inventory item
    let inventoryItemDiv = document.createElement('div');
    inventoryItemDiv.setAttribute('data-item-type', 'inventory-tile');
    inventoryItemDiv.setAttribute('data-inventory-tile-type', tileType);
    //Set inventory item UI 
    inventoryItemDiv.classList.add('tile-inventory');
    inventoryItemDiv.classList.add(minecraft.gameMap.getTileCssClassName(tileType));
    //Set Counter UI
    let inventoryItemCounterSpan = document.createElement('span');
    inventoryItemCounterSpan.classList.add('tile-inventory-counter');
    inventoryItemDiv.appendChild(inventoryItemCounterSpan);
    //Set Counter data
    inventoryItemCounterSpan.textContent = inventoryCount;
    //Set inventory item event listener
    inventoryItemDiv.addEventListener('click', (event) => {
      // console.log(`inventory tile item type ${event.currentTarget.dataset.tileType}`);
      minecraft.setSideBarItemAsSelected(event.currentTarget);
    });
     //Append current inventory item to inventory container
    inventoryContainer.appendChild(inventoryItemDiv);
  }
}


/**
 * This function set selected UI to passed element item (tool / inventory tile) 
 * snd set unselected UI to previous selected item
 * @param {object} selectedItem - element object represent tool / inventory tile item
 */
minecraft.setSideBarItemAsSelected = (selectedItem) => {      
  //Set previous selected item (if exists) UI to Unselected
   let previousSelectedItem = document.querySelector('[data-selected="true"]');
   if (previousSelectedItem !== null){
     previousSelectedItem.dataset.selected = "false";
     previousSelectedItem.classList.remove((previousSelectedItem.dataset.itemType === 'tool') ? 'tool-selected' : 'tile-inventory-selected');
   }
   //Set current item UI as SELECTED
   selectedItem.dataset.selected = "true";
   selectedItem.classList.add((selectedItem.dataset.itemType === 'tool') ? 'tool-selected' : 'tile-inventory-selected');
 }


/** Current player action - HARDCODED */
minecraft.action = 
{
  name: 'remove',
  preformOnTileType: [1,2]
}


/** Init Game *****************************************************************************************************/
minecraft.gameMap.init(minecraft.gameMap.matrix);
minecraft.gamePanel.tools.init(minecraft.gamePanel.tools.collection);
minecraft.gamePanel.tilesInventory.init(minecraft.gamePanel.tilesInventory.collection);

