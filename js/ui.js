
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
    this.Update();
}

PlayerView.prototype.Update = function() {
    
    this.div.find("div.hitpoints-meter").css("width", "" + Math.floor(100*this.player.hitPoints/this.player.maxHitPoints) + "%" ); 
    this.div.find("div.hitpoints-meter").html("" + this.player.hitPoints + "/" + this.player.maxHitPoints);
    
    this.div.find("div.holding > .item").attr("class", "inventory item holding " + this.player.weapon.css ); 
    this.div.find("div.wearing > .item").attr("class", "inventory item wearing " + this.player.armor.css  );
    
    this.div.find("div.money > label > .money").html(this.player.money);       
    var coins = this.player.money;       
    while (coins > 10) coins /= 10;
    var row1 = coins > 5 ? 5 : coins;
    var row2 = coins < 5 ? 0 : (coins-5);
    this.div.find("div.money > .row1").css("width", "" + (row1*16)+ "px"); 
    this.div.find("div.money > .row2").css("width", "" + (row2*16)+ "px");

    itemsdiv = this.div.find("div.items > .item-container");
    itemsdiv.empty();
    for (var k in this.player.items)
    {
        var div = $(DIV);
        var item = this.player.items[k];
        div.attr("class", "inventory item " + item.css );
        itemsdiv.append(div);
    }

}

function ConsoleView(obj) {
    copyProps(this, obj);
    
    this.log = this.div.find(".log");
    this.input = this.div.find(".input");
}

var MESSAGE = "message";
var INPUT = "input";
var DANGER = "danger";
var HURRAY = "hurray"

ConsoleView.prototype.Log = function(type, message) {
    this.log.append("<div class='" + type + "'>" + message + "</div>");
    this.log.scrollToBottom();   
}
         
ConsoleView.prototype.BackSpace = function(charCode)
{
    var h = this.input.html();
    this.input.html(h.substring(0, h.length -1));
}

ConsoleView.prototype.TypeChar = function(charCode) {this.input.html("" + this.input.html() + String.fromCharCode(charCode).toLowerCase() ); }

ConsoleView.prototype.GetCommand = function() {return this.input.html();}

ConsoleView.prototype.ClearCommand = function() {this.input.html("");}


function PlayerController(obj) {
    copyProps(this, obj);
}

PlayerController.prototype.Play = function() { 
    
    this.mapview.CenterOnTile(this.player.x, this.player.y);
    
    $(window).keydown(jQuery.proxy(function(event){
                
        if (this.player.hitPoints <= 0) 
        {
            return;
        }      
        
        var turn = false;    
        
        if ((event.which >= 48 && event.which <= 90) || event.which == 32)
        {
            this.consoleview.TypeChar(event.which);
            event.preventDefault();
            return;
        }
        switch (event.keyCode) {
            case 37: turn = this.RunCommand("move left"); event.preventDefault(); break;
            case 38: turn = this.RunCommand("move up"); event.preventDefault(); break;
            case 39: turn = this.RunCommand("move right"); event.preventDefault(); break;
            case 40: turn = this.RunCommand("move down"); event.preventDefault(); break;
            
            case 13: /* enter */ 
                turn = this.RunCommand(this.consoleview.GetCommand());   
                this.consoleview.ClearCommand();
                event.preventDefault();
                break;
            case 8: /* backspace */ this.consoleview.BackSpace(); event.preventDefault(); return; break;
            
            default: return;
        }
        
        if (turn)
        {          
            this.mapview.map.Turn();
            
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
            
            this.mapview.CenterOnTile(player.x, player.y);
            this.playerview.Update();
        }
        
        
    }, this) );         

    $(window).resize(jQuery.proxy(function(event){
        mapview.CenterOnTile(this.player.x, this.player.y);
    }, this) );
}

PlayerController.prototype.RunCommand = function(str) {
    
    this.consoleview.Log(INPUT, ">" + str);

    var dirs = {
        "left": {x: -1, y: 0},
        "right": {x: 1, y: 0},
        "up": {x: 0, y: -1},
        "down": {x: 0, y: 1}
    }
    
    
    
    tokens = str.split(" ").filter(function(e) { return e != "" });
    str = tokens.join(" ");    
        
    var valid = false;
    var validation_message = "command not recognized"
    var match;
    
    if (match = /^move (up|down|left|right)$/.exec(str))
    {
        var dir = match[1]; 
        d = dirs[match[1]];     

        if (this.player.AttemptMove(d.x, d.y)) {
            valid = true;
        }
        else {
            validation_message = "you can't move " + match[1];
        }         
    }
    if (match = /^use item ([0-9]+)$/.exec(str))
    {
        var index = parseInt(match[1]) - 1;
        
        if (index >= this.player.items.length) {
            validation_message = "you do not have that many items";
        }
        else
        {
            this.player.UseByIndex(index);
            valid = true;
        }        
    }
    if (match = /^use (.*)$/.exec(str))
    {
        var index = this.player.FindItemByName(match[1]);
        
        if (index == -1) {
            validation_message = "you do not have a " + match[1];
        }   
        else
        {
            this.player.UseByIndex(index);
            valid = true;
        }
    }
         /*
    switch (tokens[0])
    {
        case "move":
            if (tokens.length < 2) break;
                           
            d = dirs[tokens[1]];
            if (d) { 
                this.player.AttemptMove(d.x, d.y);
                valid = true;
            }
            break;
        case "use":
            if (tokens[1] == "item")
            {
                
            }
        
    }     */
    
    if (!valid) {
        this.consoleview.Log(DANGER, validation_message)
    }
    
    return valid;
}
