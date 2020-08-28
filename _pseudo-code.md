# Play MAP

## Draw
- grid container : 20 x 25 items (html).

- init matrix : represent initial state of map, tile type represent by unique number sky = 0, ground = 1, grass = 2.

- render matrix : iterate matrix, in each location create div and append it to container. (EACH DIV : DATA ATTR - represent it location in matrix, CLASS - tile base class + tile type class - determine by matrix value, CLICK LISTENER)


## Functionality
### Remove Tile
1. get current tool value (match tile value it can remove)
2. get current tile matrix location -> get value
3. check : toolValue === tileValue <br>
  true -> save tileValue in inventory, update matrix, update UI <br>
  false -> notify player to use appropriate tool
   
### Add Tile
1. get from inventory tileTypeValue (inventory click)
2. get current tile matrix location, get value (map click)
3. check : location is available  <br>
  true -> decrement from inventory, update matrix value , update UI <br>
  false -> notify player to use appropriate tool

# Side Menu - Tools
## Data Structure

toolObject = { <br>
  removeTileType: [1,2], <br>
  class: img <br>
}

toolsArray = [ tool{...}, tool{...}, tool{...} ]

Tools LIST : <br>
Axe - (tree trunk/ tree top)  <br>
Pickaxe - (rock)  <br>
Shovel - (ground/grass)  <br>

## Draw
- init tools array : hardcoded array of tool objects

- render tools array : iterate tools, in each location create div and append it to container. (EACH DIV : DATA ATTR - represent it location in array, CLASS - base for tool + tool type class - removeTileType value, CLICK LISTENER)

## Functionality
### onClick
update current tool global var with tool location in tools array, update action mode -> remove



# Side Menu - Inventory
## Data Structure
inventory { <br> 
1: 15 <br> 
2:3 <br> 
3:3 <br> 
}
property represent tile type, value represent inventory amount

## Functionality
### onClick
update current tile global var with tile value in tools array, update action mode -> remove



