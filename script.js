'use-strict'

/**Game Object */
const minecraft = 
{
  gameMap: {},
  gamePanel: 
  {
    tools: {},
    tilesInventory: {}
  },
  playMode: 
  {
    currentAction: 
    {
      name: '',
      actOnTileType: []
    }
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
          const selectedTile = event.currentTarget;
           switch(minecraft.playMode.currentAction.name){
            case 'removeTile':
              minecraft.playMode.removeTile(selectedTile);
              break;
            case 'addTile':
              console.log('call addTile function');
              break;
            case '':
              console.log('player did not take an action');
              break;
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
/** FUN: Get tile type in matrix */
minecraft.gameMap.getTileTypeInMatrix = (selectedTile) => {
  const matrix = minecraft.gameMap.matrix;
  const rowIndex = selectedTile.dataset.matrixRow; 
  const colIndex = selectedTile.dataset.matrixCol;
  return matrix[rowIndex][colIndex];
}
/** FUN: Set tile type in matrix */
minecraft.gameMap.setTileTypeInMatrix = (selectedTile, tileType) => {
  const matrix = minecraft.gameMap.matrix;
  const rowIndex = selectedTile.dataset.matrixRow; 
  const colIndex = selectedTile.dataset.matrixCol;
  matrix[rowIndex][colIndex] = tileType;
}


 /**
 * This function set Selected UI to game panel item when it clicked 
 * @param {object} selectedItem - Element object 
 */
minecraft.gamePanel.setSelectedItemUI = (selectedItem) => {      
  //Get previous selected item & Set its UI to Unselected
   let previousItem = document.querySelector('[data-selected="true"]');
   if (previousItem !== null){
    previousItem.dataset.selected = "false";
    previousItem.classList.remove(minecraft.gamePanel.getSelectedCssClassName(previousItem.dataset.itemType));
   }
   //Set current selected item UI to Selected
   selectedItem.dataset.selected = "true";
   selectedItem.classList.add(minecraft.gamePanel.getSelectedCssClassName(selectedItem.dataset.itemType));
 }
/**
 * @param {string} itemType - game panel item type: Tool / Inventory tile
 * @return {string} - css class name of selected UI by item type
 */
 minecraft.gamePanel.getSelectedCssClassName = (itemType) => {
    switch(itemType){
      case 'tool':
       return 'tool-selected';
      case 'inventory-tile':
      return 'tile-inventory-selected'; 
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
    toolDiv.setAttribute('data-tool-index', i);
    //Set tool UI 
    toolDiv.classList.add('tool');
    toolDiv.classList.add(toolsArray[i].cssClassName);
    //Set tool event listener
     toolDiv.addEventListener('click', (event) => {
      const toolElement = event.currentTarget; // Get current tool element
      minecraft.gamePanel.setSelectedItemUI(toolElement); //Set selected UI to current tool element
      toolData = minecraft.gamePanel.tools.collection[toolElement.dataset.toolIndex]; //Get current tool object
      minecraft.playMode.setCurrentAction('removeTile', toolData.removeTileType); // set play mode action
    });
    // Append current tile to game map
    toolsContainer.appendChild(toolDiv);
  }
};



/** DATA: Tile Inventory - Property = Tile type, Value = Inventory Count */
minecraft.gamePanel.tilesInventory.items = 
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
    inventoryItemDiv.setAttribute('data-tile-type', tileType);
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
      const inventoryItemElement = event.currentTarget; // Get current inventory item element
      minecraft.gamePanel.setSelectedItemUI(inventoryItemElement); //Set selected UI to current inventory item element

      console.log(inventoryItemElement.dataset.tileType);
      
      // toolData = minecraft.gamePanel.tools.collection[toolElement.dataset.toolIndex]; //Get current tool object
      // minecraft.playMode.setCurrentAction('addTile', toolData.removeTileType); // set play mode action

    });
     //Append current inventory item to inventory container
    inventoryContainer.appendChild(inventoryItemDiv);
  }
};
/** FUN: update Counter Ui of inventory item */
minecraft.gamePanel.tilesInventory.updateItemCounterUi = (tileType) => {

  let inventoryItem = document.querySelector(`[data-tile-type="${tileType}"]`);
  let inventoryItemCounter = inventoryItem.querySelector('.tile-inventory-counter');

  inventoryItemCounter.textContent = minecraft.gamePanel.tilesInventory.items[tileType];
}

/**
 * FUN: set current action
 * @param {string} actionName - removeTile / addTile
 * @param {array[number]} actOnTileType  - contain tiles type action can act of
 */
minecraft.playMode.setCurrentAction = (actionName, actOnTileType) => {
  minecraft.playMode.currentAction.name = actionName;
  minecraft.playMode.currentAction.actOnTileType = actOnTileType;
};
/** FUN: remove selected tile */
minecraft.playMode.removeTile = (selectedTile) => {

  //Check if selected tool can remove selected tile
  const preformOnTilesType = minecraft.playMode.currentAction.actOnTileType;
  const isRemovable = preformOnTilesType.some((tileType) => tileType === minecraft.gameMap.getTileTypeInMatrix(selectedTile));

  if (isRemovable){
    //** Remove selected tile UI
    selectedTile.classList.remove(minecraft.gameMap.getTileCssClassName(minecraft.gameMap.getTileTypeInMatrix(selectedTile)));

    //Add the removed tile to the inventory + Update inventory UI
    minecraft.gamePanel.tilesInventory.items[minecraft.gameMap.getTileTypeInMatrix(selectedTile)] += 1; 
    minecraft.gamePanel.tilesInventory.updateItemCounterUi(minecraft.gameMap.getTileTypeInMatrix(selectedTile));
     
    //Update matrix
    minecraft.gameMap.setTileTypeInMatrix(selectedTile, 0); // 0 = Sky
  
    //** update ui -> ADD  class SKY
   selectedTile.classList.add(minecraft.gameMap.getTileCssClassName(minecraft.gameMap.getTileTypeInMatrix(selectedTile))); 
 }
 else {
   console.log('animation in selected tool: border red ');
 }




};



/** Init Game *****************************************************************************************************/
minecraft.gameMap.init(minecraft.gameMap.matrix);
minecraft.gamePanel.tools.init(minecraft.gamePanel.tools.collection);
minecraft.gamePanel.tilesInventory.init(minecraft.gamePanel.tilesInventory.items);

