function fixrect(r) {
	if (r.tl.x > r.br.x) { var t = r.tl.x; r.tl.x = r.br.x; r.br.x = t; }
	if (r.tl.y > r.br.y) { var t = r.tl.y; r.tl.y = r.br.y; r.br.y = t; }
	r.width = r.br.x - r.tl.x;
	r.height = r.br.y - r.tl.y;
}

function rect(x1, y1, x2, y2) {
	var r = { tl: {x:x1, y:y1}, br: {x:x2, y:y2} };
	fixrect(r);
	return r;
}

function mapgen1(w, h) {

	var size = w * h;
	var mw = (w-1)/2;
	var mh = (h-1)/2;

  var m = { width: w, height: h, tiles: null }
  var mg = new MapGenerator( {map:m} );
  //mg.maze(rect(0,0, 15, 15));

  //random rectangles
  for (var i = 0; i < size/100; i++) {
  	var r = {tl:{}, br:{}};
  	r.tl.x = Math.randint(1, mw-2) * 2 + 1;
  	r.tl.y = Math.randint(1, mh-2) * 2 + 1;
  	r.br.x = r.tl.x + Math.randint(1, 4) * 2;
  	r.br.y = r.tl.y + Math.randint(1, 4) * 2;
  	if (r.br.x > w-2) r.br.x = w-2;
  	if (r.br.y > h-2) r.br.y = h-2;
  	fixrect(r);
  	console.log(r);

  	mg.fillrect(r.tl.x, r.tl.y, r.br.x, r.br.y);

  	//now make a door for this thing
  	mg.fillrect(r.tl.x, r.tl.y-1, r.tl.x, r.tl.y-1);
  }

  /*

  mg.fillrect(3, 5, 7, 9);
  mg.fillrect(5, 4, 5, 4);

  mg.fillrect(11, 9, 15, 13);
  mg.fillrect(16, 11, 16, 11);

  mg.fillrect(25, 1, 31, 5);
  mg.fillrect(27, 6, 27, 6);

  mg.fillrect(33, 5, 39, 9);
  mg.fillrect(32, 7, 32, 7);
*/
  mg.maze();

	return mg.map;
}

function MapGenerator( obj ) {
	copyProps(this, obj)
	fillProps(this, this.default)

	if (!(this.map instanceof Map)) {
		this.map = new Map(this.map);
	}
}

MapGenerator.default = {

};

MapGenerator.prototype.maze = function(rect) {
	
	if (rect) { 
		fixrect(rect);
		this.bounding = rect;
	}
	else {
		rect = this.bounding = { 
			tl: {x:0, y:0},
			br: {x:this.map.width, y:this.map.height},
			width: this.map.width,
			height: this.map.height
		}
	}

	mazew = Math.floor((rect.width-1)/2);
	mazeh = Math.floor((rect.height-1)/2);
	
	this.maze.c = {
		x: 1, //Math.randint(0, mazew-1) * 2 + rect.tl.x + 1,
		y: 1 //Math.randint(0, mazeh-1) * 2 + rect.tl.y + 1
	};

	this.map.tiles[this.map.i(this.maze.c.x, this.maze.c.y)] = 1;

	this.maze.stack = [];
	this.maze.stack.push({x: this.maze.c.x, y: this.maze.c.y});

	while(this.maze.stack.length > 0) {
		this.maze_step();
	}

}

MapGenerator.prototype.maze_step = function() {

	var m = this.maze;

	console.log('at ', m.c.x, m.c.y);
	var dirs = this.maze_getdirections(m.c.x, m.c.y);
	if (dirs.length == 0)
	{
		m.c = m.stack.pop();
		console.log('cant move, backing up ', m.c.x, m.c.y);
	}
	else
	{	
		var i = Math.randint(0, dirs.length-1);
		var d = dirs[i];
		this.maze_carve(d.x, d.y);
		m.stack.push( {x: m.c.x, y: m.c.y} );

		console.log('carved in direction ', d.x, d.y, ' to ', m.c.x, m.c.y);
	}

}

MapGenerator.prototype.maze_getdirections = function(x, y) {
	var dir = [];

	if (this.isfree(x + 2, y))
		dir.push({x: 1, y: 0});

	if (this.isfree(x - 2, y))
		dir.push({x: -1, y: 0});

	if (this.isfree(x, y + 2))
		dir.push({x: 0, y: 1});

	if (this.isfree(x, y - 2))
		dir.push({x: 0, y: -1});

	return dir;
}

MapGenerator.prototype.maze_carve = function(dx, dy) {
	var m = this.map;
	var c = this.maze.c;

	c.x += dx;
	c.y += dy;
	m.tiles[m.i(c.x, c.y)] = 1;

	c.x += dx;
	c.y += dy;
	m.tiles[m.i(c.x, c.y)] = 1;
}

MapGenerator.prototype.isfree = function(x, y) {
	if (this.bounding && (x < this.bounding.tl.x || y < this.bounding.tl.y || x >= this.bounding.br.x|| y > this.bounding.br.y)) {
		return false;
	}

	if (x < 0 || y < 0 || x > this.map.width - 1 || y > this.map.width - 1) {
		return false;
	}

	return (this.map.tiles[this.map.i(x,y)] == 0);
}

MapGenerator.prototype.fillrect = function(fx, fy, tx, ty)
{
	if (fx > tx) { var t = fx; fx = tx; tx = t; }
	if (fy > ty) { var t = fy; fy = ty; ty = t; }
	for (var x = fx; x <= tx; x++)
	{
		for (var y = fy; y <= ty; y++)
		{
			var i = this.map.i(x, y);
			this.map.tiles[i] = 1;
		}
	}

}





var mapgen = {};

mapgen.generate_map = function(width, height) {
	this.map = new Map({
		name: "random map",
		width: width,
		height: height,
		gridSize: 32,
		tileset: tilesets.maze,
		tiles: Array.zeros(width * height),
		things: []
	});

	this.mazew = Math.floor((width-1)/2);
	this.mazeh = Math.floor((height-1)/2);
	this.c = {
		x: Math.randint(0, this.mazew-1) * 2 + 1,
		y: Math.randint(0, this.mazeh-1) * 2 + 1
	};

	this.map.tiles[this.map.i(this.c.x, this.c.y)] = 1;

	this.stack = [];
	this.stack.push({x: this.c.x, y: this.c.y});

//BASIC MAZE IMPLEMENTATION USING RECURSIVE BACKTRACKING
/*
	while(this.stack.length > 0)
	{
		console.log('at ', this.c.x, this.c.y);
		var dirs = mapgen.getdirections(this.c.x, this.c.y);
		if (dirs.length == 0)
		{
			this.c = this.stack.pop();
			console.log('cant move, backing up ', this.c.x, this.c.y);
		}
		else
		{
			var i = Math.randint(0, dirs.length-1);
			var d = dirs[i];
			this.carve(d.x, d.y);
			this.stack.push( {x: this.c.x, y: this.c.y} );

			console.log('carved in direction ', d.x, d.y, ' to ', this.c.x, this.c.y);
		}

	}
	*/

	

	this.step = function() {
			console.log('at ', this.c.x, this.c.y);
			var dirs = mapgen.getdirections(this.c.x, this.c.y);
			if (dirs.length == 0)
			{
				this.c = this.stack.pop();
				console.log('cant move, backing up ', this.c.x, this.c.y);
			}
			else
			{
				var i = Math.randint(0, dirs.length-1);
				var d = dirs[i];
				if (Math.randint(1, 3) == 3)
				{
					this.fatcarve(d.x, d.y);	
				}
				else
				{
					this.carve(d.x, d.y);
					this.stack.push( {x: this.c.x, y: this.c.y} );
				}

				console.log('carved in direction ', d.x, d.y, ' to ', this.c.x, this.c.y);
			}

	}

	while(this.stack.length > 0) {
		this.step();
	}


	//now add random monsters
	var ct = [creatureTypes.rat, creatureTypes.cat, creatureTypes.dog, creatureTypes.tiger, creatureTypes.skeleton];
	var it = [itemTypes.dagger, itemTypes.sword, itemTypes.armor.leather, itemTypes.armor.plate, itemTypes.apple, itemTypes.coin];

	for (var y = 3; y < this.map.height; y += 2 ) {
		for (var x = 1; x < this.map.width; x += 2 ) {
			var r = Math.randint(1, 6);
			if (r == 1 || r == 2) {
				//creature
				var creature = new Creature( {creatureType: ct[Math.randint(0, ct.length-1)] } );
				creature.x = x;
				creature.y = y;
				this.map.Add(creature);
			}
			if (r == 3) {
				var item = new Item( {itemType: it[Math.randint(0, it.length-1)] } );
				item.x = x;
				item.y = y;
				this.map.Add(item);
			}
		}
	}


	return this.map;

}

mapgen.fillrect = function(fx, fy, tx, ty)
{
	if (fx > tx) { var t = fx; fx = tx; tx = t; }
	if (fy > ty) { var t = fy; fy = ty; ty = t; }
	console.log('filling ', fx, fy, tx, ty);
	for (var x = fx; x <= tx; x++)
	{
		for (var y = fy; y <= ty; y++)
		{
			var i = this.map.i(x, y);
			this.map.tiles[i] = 1;
		}
	}

}

mapgen.fatcarve = function(x, y) {

	var perp = {x: y, y: x};
	var c = this.c;
	var d = 	{x: c.x + x*2, 						y: c.y + y*2};
	var w1 = 	{x: c.x + perp.x*2, 			y: c.y + perp.y*2};
	var w2 = 	{x: d.x + perp.x*2, 			y: d.y + perp.y*2};
	var w3 = 	{x: c.x - perp.x*2, 			y: c.y - perp.y*2};
	var w4 = 	{x: d.x - perp.x*2, 			y: d.y - perp.y*2};

	function pcomp(p1, p2) {
		if (p1 == null || p2 == null) return false;
		return p1.x == p2.x && p1.y == p2.y;
	}

	//first side
	if ( (this.isfree(w1.x, w1.y) || pcomp(w1, this.fatcarvecorner1)) && this.isfree(w2.x, w2.y))
	{
		this.fillrect(c.x, c.y, w2.x, w2.y);
		this.stack.push(w1);
		this.stack.push(w2);
		console.log('fat carving on one side');
		//now unfill the one corner
		//this.map.tiles[this.map.i(w2.x, w2.y)] = 0;
		this.newfatcarvecorner1 = w2;
	}
	else {
		this.newfatcarvecorner1 = null;
	}

	//other side
	if ( (this.isfree(w3.x, w3.y) || pcomp(w3, this.fatcarvecorner2)) && this.isfree(w4.x, w4.y))
	{
		this.fillrect(c.x, c.y, w4.x, w4.y);
		this.stack.push(w3);
		this.stack.push(w4);
		console.log('fat carving on other side');
		//now unfill the one corner
		//this.map.tiles[this.map.i(w4.x, w4.y)] = 0;
		this.newfatcarvecorner2 = w4;
	}
	else {
		this.newfatcarvecorner2 = null;
	}

	//now fill in the old corners
	if (this.fatcarvecorner1) {
		this.map.tiles[this.map.i(this.fatcarvecorner1.x, this.fatcarvecorner1.y)] = 1;
	}
	if (this.fatcarvecorner2) {
		this.map.tiles[this.map.i(this.fatcarvecorner2.x, this.fatcarvecorner2.y)] = 1;
	}

	this.fatcarvecorner1 = this.newfatcarvecorner1;
	this.fatcarvecorner2 = this.newfatcarvecorner2;

	this.carve(x, y);
	this.stack.push(d);

}
/*
mapgen.grow_room = function(x, y) {
	var stack = [];

	stack.push( {x:x, y:y} );


}*/


mapgen.isfree = function(x, y) {
	if (x < 0 || y < 0 || x >= this.map.width || y > this.map.height) {
		return false;
	}

	return (this.map.tiles[this.map.i(x,y)] == 0);
}

mapgen.getdirections = function(x, y) {
	var dir = [];

	if (this.isfree(x + 2, y))
		dir.push({x: 1, y: 0});

	if (this.isfree(x - 2, y))
		dir.push({x: -1, y: 0});

	if (this.isfree(x, y + 2))
		dir.push({x: 0, y: 1});

	if (this.isfree(x, y - 2))
		dir.push({x: 0, y: -1});

	return dir;
}

mapgen.carve = function(dx, dy) {
	var m = this.map;

	this.c.x += dx;
	this.c.y += dy;
	m.tiles[m.i(this.c.x, this.c.y)] = 1;

	this.c.x += dx;
	this.c.y += dy;
	m.tiles[m.i(this.c.x, this.c.y)] = 1;
}
