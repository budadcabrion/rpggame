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