function RpgMain() {
    $(document).ready(function () {
               
        window.player = new Player({
            creatureType: creatureTypes.dude,
            x: 1,
            y: 1,       
        });
    
        the_outside_map.Add(player);
        
        /*
        window.player.x = 15;
        window.player.y = 15;
        the_dungeon_map.Add(player);
          */
        //the_little_hut_map.Add(player);
        //player.weapon = new Item( {itemType: itemTypes.sword} );
        //player.armor = new Item( {itemType: itemTypes.armor.plate} );
        player.money = 2;
        /*
                            
        player.weapon = new Item( {itemType: itemTypes.sword} );
        player.armor = new Item( {itemType: itemTypes.armor.plate} ); 
          
        player.x = 24;
        player.y = 20;
          */       
        window.mapview = new MapView( { map: player.map, mapdiv: $(".map"), viewdiv: $(".mapview") } );
        window.playerview = new PlayerView( { player: player, div: $(".playerview") } );
        window.consoleview = new ConsoleView( { div:$(".console") } );
        
        window.playercontroller = new PlayerController( { player: player, mapview: mapview, playerview: playerview, consoleview: consoleview  } );
       
        window.log = function(type, str){
        
            if (arguments.length == 1)
            {
                str = type;
                type = MESSAGE;  
            }
            
            consoleview.Log(type, str);
        }
               
        playercontroller.Play();           
    });
    
}