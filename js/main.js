      
var player = new Player({
    creatureType: creatureTypes.dude,
    x: 1,
    y: 1            
});
  

function RpgMain() {
    $(document).ready(function () {
        
    
        the_outside_map.Add(player);
        //the_dungeon_map.Add(player);
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
        mapview = new MapView( { map: player.map, mapdiv: $(".map"), viewdiv: $(".mapview") } );
        playerview = new PlayerView( { player: player, div: $(".playerview") } );
        consoleview = new ConsoleView( { div:$(".console") } );
        
        playercontroller = new PlayerController( { player: player, mapview: mapview, playerview: playerview, consoleview: consoleview  } );
       
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


//inventory
//bow
