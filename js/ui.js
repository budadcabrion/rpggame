//somethin somethin

function MapView(obj) {
    copyProps(this, obj);
    fillProps(this, this.default);
    
    this.Render(); 
}

MapView.prototype.default = {
    map: new Map(),
    mapdiv: null,
    viewdiv: null
}

MapView.prototype.LookAt = function(x, y) {
        
    this.mapdiv.x = -x;
    this.mapdiv.y = -y;
}

MapView.prototype.CenterOnTile = function(x, y) {      
    var cx = 0;
    var cy = 0;
    
    if (this.mapdiv.width() > this.viewdiv.width())
    {                                                  
        cx = (x + 0.5) * this.map.gridSize - this.viewdiv.width() / 2;                    
        if (cx < 0) cx = 0;                                                                     
        if (cx > this.mapdiv.width() - this.viewdiv.width()) cx = this.mapdiv.width() - this.viewdiv.width();
    }  
    
    if ( this.mapdiv.height() > this.viewdiv.height() )
    {
        cy = (y + 0.5) * this.map.gridSize - this.viewdiv.height() / 2;         
        if (cy < 0) cy = 0;  
        if (cy > this.mapdiv.height() - this.viewdiv.height()) cy = this.mapdiv.height() - this.viewdiv.height();
    }
    
    this.LookAt(cx, cy);
}

MapView.prototype.Render = function() { 
    this.mapdiv.empty();
    this.mapdiv.x = 0;
    this.mapdiv.y = 0;
    this.map.Render(this.mapdiv);  
}

function PlayerView(obj) {
    copyProps(this, obj);
    this.Render();
}

PlayerView.prototype.Render = function() {
    this.div.empty();
    
    this.div.append("<label class='hitpoints'>hit points: </label><div class='hitpoints-bar'><div class='hitpoints' style='width:100%;'></div></div>");
    this.div.append("<label class='holding'>holding: </label><div class='inventory item holding'></div>");
    this.div.append("<label class='wearing'>wearing: </label><div class='inventory item wearing'></div>");
    
    this.div.append("<label for='money'>doolars: <div class='money'></div></div>");
    this.div.append("<div class='coin moneyBar'></div>");  
         
    this.div.append("<label class='items'>items: </label><div class='inventory items'></div>");
    
    
    this.Update();
    
}

PlayerView.prototype.Update = function() {
    
    this.div.find("div.hitpoints").css("width", "" + Math.floor(100*this.player.hitPoints/this.player.maxHitPoints) + "%" ); 
    this.div.find("div.hitpoints").html("" + this.player.hitPoints + "/" + this.player.maxHitPoints);
    
    this.div.find("div.holding").attr("class", "inventory item holding " + this.player.weapon.css ); 
    this.div.find("div.wearing").attr("class", "inventory item wearing " + this.player.armor.css  );
    
    this.div.find("div.money").html(this.player.money);       
    var coins = this.player.money;       
    while (coins > 10) coins /= 10;
    this.div.find("div.moneyBar").css("width", "" + (coins*16)+ "px");

    itemsdiv = this.div.find("div.items");
    itemsdiv.empty();
    for (var k in this.player.items)
    {
        var div = $(DIV);
        var item = this.player.items[k];
        div.attr("class", "inventory item " + item.css );
        itemsdiv.append(div);
    }

}

function PlayerController(obj) {
    copyProps(this, obj);
}

PlayerController.prototype.Play = function() { 
    
    var player = this.player;
    var mapview = this.mapview; 
    this.mapview.CenterOnTile(this.player.x, this.player.y);
    
    $(window).keydown(function(event){
        
        if (player.hitPoints <= 0) 
        {
            return;
        }
        
        switch (event.keyCode) {
            case 37: player.AttemptMove(-1, 0); break;
            case 38: player.AttemptMove(0, -1); break;
            case 39: player.AttemptMove(1, 0); break;
            case 40: player.AttemptMove(0, 1); break;
            default: return;
        }
        
        mapview.map.Turn();
        
        if (player.hitPoints <= 0)
        {
            return;
        }
        
        if (mapview.map != player.map)
        {       
            this.mapview.map = player.map;  
            this.mapview.Render(); 
            this.mapview.CenterOnTile(player.x, player.y);
        }
        
        mapview.CenterOnTile(player.x, player.y);
        playerview.Update();
    });         

    $(window).resize(function(event){
        mapview.CenterOnTile(player.x, player.y);
    });
}