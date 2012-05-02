var the_dungeon_map = new Map({
    name: "in a dungeon...",
    width: 26,
    height: 22,
    gridSize: 32,
    tileset: tilesets.dungeon,
    tiles: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        
        0 //outside square
        ] ,
    things: [  
        new Creature({
            creatureType: creatureTypes.rat,
            x: 18,
            y: 10
        }),   
        new Creature({
            creatureType: creatureTypes.rat,
            x: 18,
            y: 12
        }), 
        new Creature({
            creatureType: creatureTypes.rat,
            x: 19,
            y: 14
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 4,
            y: 4
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 6,
            y: 8
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 9,
            y: 17
        }),
        new Creature({
            creatureType: creatureTypes.tiger,
            x: 24,      
            y: 18
        }),   
        
        new Creature({
            creatureType: creatureTypes.rat,
            x: 10,      
            y: 20
        }), 
        new Creature({
            creatureType: creatureTypes.rat,
            x: 11,      
            y: 20
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 12,      
            y: 20
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 13,      
            y: 20
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 14,      
            y: 20
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 15,      
            y: 20
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 16,      
            y: 20
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 17,      
            y: 20
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 18,      
            y: 20
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 19,      
            y: 20
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 20,      
            y: 20
        }),              
        new Item( {
            x: 21, y: 14,
            itemType: itemTypes.sword
        }) 
    ]
}); 


//THIS CODE WILL MAKE RANDOM MONSTERS!!!
/*
{
    var x, y;
    for ( x = 4; x < 20; x+= 2)
    {
        for (y = 30; y < 40; y+=2)
        {
            var c = new Creature({
                x:x,
                y:y,
                creatureType: [creatureTypes.rat, creatureTypes.cat, creatureTypes.tiger][Math.randint(0,2)]
            });
            the_dungeon_map.Add(c);
        }
    }
}
  */
  
var the_little_hut_map = new Map({
    name: "outside!",
    width: 5,
    height: 5,
    gridSize: 32,
    tileset: tilesets.house,
    tiles: [
        0, 0, 0, 0, 0, 
        0, 1, 1, 1, 0,
        0, 1, 1, 1, 2,
        0, 1, 1, 1, 0,
        0, 0, 0, 0, 0,
        0 //outside square
        ]  ,
    things: [
        new Item( {
            x: 1, y: 1,
            itemType: itemTypes.dagger
        }),        
        new Item( {
            x: 1, y: 3,
            itemType: itemTypes.armor.leather
        })
    ]
});

var the_outside_map = new Map({
    name: "outside!",
    width: 26,
    height: 22,
    gridSize: 32,
    tileset: tilesets.outside,
    tiles: [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 4, 4, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 2, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 2, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2,
        4, 4 ,4, 4, 3, 3, 3, 4, 4, 3, 3, 4, 4, 2, 2, 2, 2, 2, 2, 5, 5, 5, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
        
        0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 6, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 6, 6,
        0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6,
        0, 0, 0, 0, 6, 0, 0, 6, 6, 6, 6, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 6, 6, 6, 6, 6,
        0, 0, 0, 0, 6, 0, 6, 6, 6, 0, 0, 0, 6, 6, 6, 6, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6,
        0, 0, 6, 0, 0, 6, 6, 6, 6, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6,
        0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 6, 6, 6,
        0, 0, 0, 6, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 6, 6,
        0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 0, 6, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,10, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0,
        0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        9, 9, 0, 9, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        9, 9, 9, 9, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
        9, 9, 9, 0, 0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0,
        9, 9, 9, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
        9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6,
        0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6,
        9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 
        
        1 //outside square
        ]  ,
    things: [ 
        new Item ({
            itemType: itemTypes.dagger,
            x:1, 
            y:0            
        }), 
        new Creature({
            creatureType: creatureTypes.rat,
            x: 18,
            y: 10
        }),    
        new Creature({
            creatureType: creatureTypes.rat,
            x: 2,
            y: 1
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 6,
            y: 8
        }),
        new Creature({
            creatureType: creatureTypes.rat,
            x: 9,
            y: 17
        }),
        new Creature({
            creatureType: creatureTypes.cat,
            x: 24,      
            y: 18
        }),
        new MapTeleport({ 
            x:10, y:21,
            targetmap: the_dungeon_map,
            targetx: 1,
            targety: 1,
        }),
        new MapTeleport({ 
            x:5, y:11,
            targetmap: the_little_hut_map,
            targetx: 4,
            targety: 2,
        })
    ]
});



//additional teleporta

the_dungeon_map.Add( new MapTeleport({ 
            x:1, y:1,
            targetmap: the_outside_map,
            targetx: 10,
            targety: 21,
}));  

the_little_hut_map.Add( new MapTeleport({ 
            x:4, y:2,
            targetmap: the_outside_map,
            targetx: 5,
            targety: 11
}));
