function Map() {
    copyProps(this, this.default);
    copyProps(this, arguments[0]);
    this.mapdiv = null;
    
    for (var i in this.things)
    {
        this.things[i].map = this;
    }
    
    return this;
}

Map.default = {
    width: 3,
    height: 3,
    tiles: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    gridSize: 32,
    tileset: [ { css: "stone", solid: true }, { css: "tunnel", solid: false } ]
};

Map.prototype = {

    Add: function (thing) {
        this.things.push(thing);
        thing.map = this;
        if (this.mapdiv)
        {
            thing.Render(this.mapdiv);
        }
    },
    
    Remove: function(thing) {
        for (var k in this.things) {
            if (this.things[k] == thing) {
                this.things[k].div.remove();
                this.things[k].map = null;
                delete this.things[k];
            }
        }
    },

    Render: function (mapdiv) {
    
        this.mapdiv = mapdiv;
        
        this.mapdiv.attr('class', 'map');
        this.mapdiv.addClass(this.tileset.css);
        this.mapdiv.width(this.width * this.gridSize);
        this.mapdiv.height(this.height * this.gridSize);

        for (var index = 0, x = 0, y = 0; index < this.tiles.length; index++, x++) {
        
            if (x >= this.width) {x = 0; y++}
            if (y >= this.height) {y = 0;}
            
            var div = $(DIV);
            div.addClass(this.tileset.tiles[this.tiles[index]].css);
            div.addClass("tile");
            div.id = x + "," + y;
            div.x = x * this.gridSize;
            div.y = y * this.gridSize;
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
    },
    
    Turn: function () {
        for (var x in this.things)
        {
            if (this.things[x].Turn)
            {
                this.things[x].Turn();
            }
        }
    },
    
    i: function(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) 
            return -1;
        return y * this.width + x;
    },
    
    IsSolid: function (x, y) {
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
    },    
    
    ThingsAt: function(x, y) {
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
};  

Map.prototype.AddVariations = function(mapdiv) {
    divs = mapdiv.find(">div.randvar4");
    
    //ideas
    //this one i made for choosing out of a tileset - the html has a background 
    //image that gets moved around to point at the different tiles
    
    /*
    divs.each(function(){
        div = $(this);
        div.removeClass("randvar4");
        x = parseInt(div.css("background-position-x").replace("px", ""));
        y = parseInt(div.css("background-position-y").replace("px", ""));
        
                                             
        imgx = x -(Math.randint(0,3) * 32) ;  
        imgy = y - (Math.randint(0,3) * 32) ;
        
        div.css("background-position-x", imgx.toString() + "px"); 
        div.css("background-position-y", imgy.toString() + "px");
    });
    */
    
    ///this one varies the colors in steps
    
    divs.each(function(){
        var div = $(this);
        var color = new ColorFromRgb(div.css('background-color'));
        
        
        var r = Math.random();
        var ratio = r * 0.1 + 1;
        
        
        color.r = Math.round(color.r * ratio);  
        color.g = Math.round(color.g * ratio);
        color.b = Math.round(color.b * ratio);
                                
        div.css('background-color', color.toString());
    });
    
}

