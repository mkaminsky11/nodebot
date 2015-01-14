//battleship
var coor_x = ["1","2","3","4","5","6","7","8","9","10"];
var coor_y = ["A","B","C","D","E","F","G","H","I","J"];

/*
 1 2 3
A
B
C
*/

var pos = []; //name, hit, missed, placed, up, l, r, bottom
var ships = [];
/*
[
  {
    size: 2,
    x: "",
    y: "",
    hit: [true, false]
  }
]
*/

function reset(){
  pos = [];
  for(var a = 0; a < coor_x.length; a++){
    for(var b = 0; b < coor_y.length; b++){
      var o = {};
      o.name = coor_x[a] + coor_y[b] + "|" + coor_y[b] + coor_x[a];
      o.hit = false;
      o.missed = false;
      o.placed = false;
      
      o.up = coor_y + 1;
      o.l = coor_x + 1;
      o.r = 10 - coor_x;
      o.down = 10 - coor_y;
    }
  }
  
  ships = [];
  add_ship(5);
  add_ship(4);
  add_ship(4);
  add_ship(3);
  add_ship(3);
  add_ship(2);
  add_ship(2);
}

