function Map(obj) {
    fillProps(this, Map.default);
    copyProps(this, obj);
    
    for (var i in this.things)
    {
        this.things[i].map = this;
    }

    if (!this.tiles) {
        this.tiles = Array.zeros(this.width * this.height);
    }
    
    return this;
}

Map.default = {
    name: "map",
    width: 3,
    height: 3,
    tiles: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    gridSize: 32,
    tileset: { css: "dungeon", tiles: [ { css: "stone imagevar", solid: true }, { css: "tunnel imagevar", solid: false } ] },
    things: [],
    mapdiv: null
};

Map.prototype.Add = function (thing) {
    this.things.push(thing);
    thing.map = this;
    if (this.mapdiv)
    {
        thing.Render(this.mapdiv);
    }
};

Map.prototype.Remove = function(thing) {
    for (var k in this.things) {
        if (this.things[k] == thing) {
            this.things[k].div.remove();
            this.things[k].map = null;
            delete this.things[k];
        }
    }
};

Map.prototype.Render = function (mapdiv) {

    this.mapdiv = mapdiv;

    this.mapdiv.addClass('map');
    this.mapdiv.addClass(this.tileset.css);
    this.mapdiv.width(this.width * this.gridSize);
    this.mapdiv.height(this.height * this.gridSize);

    for (var index = 0, x = 0, y = 0; index < this.tiles.length; index++, x++) {

        if (x >= this.width) {x = 0; y++}
        if (y >= this.height) {y = 0;}
        
        var div = $(DIV);
        this.RenderTile(div, x, y, index);
        this.mapdiv.append(div); 
                
    }

    this.AddVariations(mapdiv);

    for (var i in this.things)
    {
        var thing = this.things[i];

        if (thing.Render) {
            thing.Render(mapdiv);
        }
        else alert(i);
    }
}

Map.prototype.RenderTile = function(div, x, y, index) {
    div.addClass(this.tileset.tiles[this.tiles[index]].css);
    div.addClass("tile");
    div.id = x + "," + y;
    div.x = x * this.gridSize;
    div.y = y * this.gridSize;    
}

Map.prototype.Turn = function () {
    for (var x in this.things)
    {
        if (this.things[x].Turn)
        {
            this.things[x].Turn();
        }
    }
}

Map.prototype.i = function(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) 
        return -1;
    return y * this.width + x;
},

Map.prototype.IsSolid = function (x, y) {
    var i = this.i(x,y);
    
    if (i == -1) return true;
    
    var step = this.width * this.height;
    
    while (i < this.tiles.length)
    {
        if (this.tileset.tiles[this.tiles[i]].solid)
        {
            return true;
        }
        i += step;
    }
    
    return false;
}   

Map.prototype.ThingsAt = function(x, y) {
    var foundthings = [];
    
    for (var i in this.things)
    {
        if (this.things[i].x == x && this.things[i].y == y)
        {
            foundthings.push(this.things[i]);
        }
    }
    
    return foundthings;
}

Map.prototype.AddVariations = function(mapdiv) {
    
    //color variations
    colorvardivs = mapdiv.find(">div.colorvar");
    
    colorvardivs.each(function(){
        var div = $(this);
        var color = new ColorFromRgb(div.css('background-color'));
        
        
        var r = Math.random();
        var ratio = r * 0.1 + 1;
        
        
        color.r = Math.round(color.r * ratio);  
        color.g = Math.round(color.g * ratio);
        color.b = Math.round(color.b * ratio);
                                
        div.css('background-color', color.toString());
    });
    
    //4x4 image variation
    imagevardivs = mapdiv.find(">div.imagevar");
    
    imagevardivs.each(function(){
        div = $(this);
        div.removeClass("imagevar");
        x = parseInt(div.css("background-position-x").replace("px", ""));
        y = parseInt(div.css("background-position-y").replace("px", ""));
        
                                             
        imgx = x -(Math.randint(0,3) * 32) ;  
        imgy = y - (Math.randint(0,1) * 32) ;
        
        div.css("background-position-x", imgx.toString() + "px"); 
        div.css("background-position-y", imgy.toString() + "px");
    });
    
    //position variation for sprites
    posvardivs = mapdiv.find(">div.posvar");
    
    posvardivs.each(function(){
        div = $(this);
        div.removeClass("posvar");
        
        div.x += Math.randint(-4, 4);
        div.y += Math.randint(-4, 4);
    });    
}

