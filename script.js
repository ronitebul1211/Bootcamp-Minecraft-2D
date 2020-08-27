'use-strict'

/**Game Object */
const minecraft = {};

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
        switch(matrix[row][col]) {
          case 0:
            tile.classList.add('tile-sky');
            break;
          case 1:
            tile.classList.add('tile-ground');
            break;
          case 2:
            tile.classList.add('tile-grass');
            break;
          case 3:
            tile.classList.add('tile-tree-trunk');
            break;
          case 4:
            tile.classList.add('tile-leaves');
            break;
          case 5:
            tile.classList.add('tile-rock');
            break;
        }
        //Set tiles event listener
        tile.addEventListener('click', (event) => {
          console.log(`MATRIX ROW ${event.currentTarget.dataset.matrixRow} MATRIX COL ${event.currentTarget.dataset.matrixCol}`);
        })
        // Append current tile to game map
        gameMapContainer.appendChild(tile);
    }
  }
}

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
  
  let toolsContainer = document.querySelector('.tools-container');
 
  for(let i = 0; i < toolsArray.length; i++){
    
    // Create Base tool
    let toolDiv = document.createElement('div');
    toolDiv.setAttribute('data-array-index', i);
    
    //Set tool UI 
    toolDiv.classList.add('tool');
    toolDiv.classList.add(toolsArray[i].className);
    
    //Set tool event listener
     toolDiv.addEventListener('click', (event) => {
      console.log(`tool locate in index ${event.currentTarget.dataset.arrayIndex} in tools array`);
    })
    // Append current tile to game map
    toolsContainer.appendChild(toolDiv);

  
  }
}







/** Init Game *****************************************************************************************************/
minecraft.initGameMap(minecraft.gameMapMatrix);
minecraft.initTools(minecraft.tools);

