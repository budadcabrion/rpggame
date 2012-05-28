function Lightmap(obj)
{
    fillProps(this, Lightmap.default);
    copyProps(this, obj);
    //Map.apply(this);

    this.width = this.map.width;
    this.height = this.map.height;
    this.tiles = Array.filled(this.width * this.height, this.ambientlight);
    this.things = [];
    this.tileset = Lightmap.default.tileset;
    this.lights = [];

    //this.AddLight(1, 1, 0)

    return this;
}

Lightmap.inherits(Map);

Lightmap.default = {
    name: "lightmap",
	width: 0,
	height: 0,
	tiles: null,
    things: null,
	tileset: { css: "lightmap", tiles: null },
	darkcolor: "#012",
	lightcolor: "#ffb",
    ambientlight: 0.05
	//map: new Map()
}

Lightmap.prototype.RenderTile = function(div, x, y, index) {

    div.id = x + "," + y;
    div.x = x * this.gridSize;
    div.y = y * this.gridSize;

    var t = this.tiles[index];
    div.addClass('tile');
    div.css('opacity', Math.abs(1.0 - 2.0/(t+1.0)) );
    div.css('background-color', t < 1 ? this.darkcolor : this.lightcolor);
}

Lightmap.prototype.Update = function() {
    var divs = this.mapdiv.find('>div');

    for (var i = 0; i < this.tiles.length; i++) {
        var div = $(divs[i]);
        var t = this.tiles[i];

        div.css('opacity', Math.abs(1.0 - 2.0/(t+1.0)) );
        div.css('background-color', t < 1 ? this.darkcolor : this.lightcolor);
    }
}

Lightmap.prototype.AddVariations = function() { 

}

Lightmap.prototype.Reset = function() {
    this.tiles = Array.filled(this.width * this.height, this.ambientlight);
}
/*
Lightmap.prototype.Reset = function(rect, lightlevel) {
    for (var y = rect.tl.y; y < rect.br.y; y++) {
        var i = this.i(rect.tl.x, y);
        var iend = this.i(rect.br.x, y);
        for (; i < iend; i++) {
            this.tiles[i] = lightlevel;
        }
    }
}

lightmap.prototype.ResetLight = function(x, y, lightlevel) {
    var diff = lightlevel - ambientlightlevel;

    var rect = {
        tl: {
            x: x - diff,
            y: y - diff
        },
        br: {
            x: x + diff,
            y: y + diff
        }
    };

    if (rect.tl.x < 0) rect.tl.x = 0;
    if (rect.tl.y < 0) rect.tl.y = 0;
    if (rect.br.x >= this.width) rect.br.x = this.width-1;
    if (rect.br.y >= this.height) rect.br.y = this.height-1;
}
*/

function addmap(tiles, x) {
    for (var i = 0; i < tiles.length; i++) tiles[i] += x[i];
}

function submap(tiles, x) {
    for (var i = 0; i < tiles.length; i++) tiles[i] += x[i];
}

function setmap(tiles, x) {
    for (var i = 0; i < tiles.length; i++) tiles[i] = x[i];
}

Lightmap.prototype.CompileLights = function() {

    if (this.basetiles) {
        this.tiles = new Array(this.width * this.height);
        setmap(this.tiles, this.basetiles);
    }
    else {
        this.tiles = Array.filled(this.width * this.height, this.ambientlight);
    }

    for (var i = 0; i < this.lights.length; i++)
    {
        addmap(this.tiles, this.lights[i].tiles);
    }
}

Lightmap.prototype.MakeLightsPermanent = function() {

    this.CompileLights();

    this.basetiles = this.tiles;
    if (!this.baselights) this.baselights = [];
    this.baselights = this.baselights.concat(this.lights);
    this.lights = [];
}

Lightmap.prototype.AddLight = function(x, y, lightlevel) {

    var light = {x:x, y:y, lightlevel:lightlevel};
    light.tiles = Array.filled(this.width * this.height, 0.0);
    this.lights.push(light);

    var map = this.map;

    rec(x, y, lightlevel, false);

    function rec(x, y, lightlevel, solidambient) {

        var i = map.i(x, y);
        if (i == -1) return;


        var solid = map.IsSolid(x, y);

        if (solidambient) {
            if (solid) lightlevel *= 0.67;
            else return;
        }

        if (lightlevel < light.tiles[i]) return;

        light.tiles[i] = lightlevel;

        if (solid) solidambient = true;
    
        var light_straight = 0.67 * lightlevel;
        var light_diagonal = 0.57 * lightlevel;
        
        rec(x-1, y, light_straight, solidambient);
        rec(x+1, y, light_straight, solidambient);
        rec(x, y-1, light_straight, solidambient);
        rec(x, y+1, light_straight, solidambient);
        rec(x-1, y-1, light_diagonal, solidambient);
        rec(x+1, y+1, light_diagonal, solidambient);
        rec(x+1, y-1, light_diagonal, solidambient);
        rec(x-1, y+1, light_diagonal, solidambient);
        
    }
}


