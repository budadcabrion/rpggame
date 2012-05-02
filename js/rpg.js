function MapThing(obj) {    
    if (arguments.length == 0) return this;
    copyProps(this, obj);   
    
    if (this.map)
    {
        this.map.Add(this);
    }
}

MapThing.prototype = {
    Render: function (mapdiv) {  
        this.div = $(DIV);
        this.div.addClass(this.css);
        this.div.addClass("mapThing");
        this.div.x = this.x * this.map.gridSize;
        this.div.y = this.y * this.map.gridSize;
        mapdiv.append(this.div);
    },
    
    Update: function() {
        this.div.x = this.x * this.map.gridSize;
        this.div.y = this.y * this.map.gridSize;
    }
};

function Creature(obj) {
    if (arguments.length == 0) return this;
    
    MapThing.apply(this, [obj]);       
            
    fillProps(this, obj.creatureType);
    
    if (typeof(this.maxHitPoints) == "function") {
        this.hitPoints = this.maxHitPoints = Math.floor(obj.creatureType.maxHitPoints());
    }
    else
    {
        this.hitPoints = this.maxHitPoints;
    }
    

    return this;
}

Creature.inherits(MapThing);

Creature.prototype.AttemptMove = function(dx, dy) {
    var nx = this.x + dx;
    var ny = this.y + dy;
    
    if (!this.map.IsSolid(nx, ny))
    {
        mapthings = this.map.ThingsAt(nx, ny);
        
        if (mapthings.length > 0)
        {   
            if (this.Hit)
            {
                this.Hit(mapthings[0]);
            }
            if (mapthings[0].HitBy)
            {
                mapthings[0].HitBy(this);
            }
        }
        else              
        {
            this.x = nx;
            this.y = ny;
            //this.Update();
            this.div.animate({ 
                left: nx * this.map.gridSize, 
                top: ny * this.map.gridSize 
                },
                40);
        }
        //some kind of move happened
        return true;
    }
    else
    {
        //nothing happened
        return false;
    }
};
    
Creature.prototype.Hit = function(thing) {
    if (thing instanceof Player)
    {
        this.Attack(thing);
    }        
};

Creature.prototype.Attack = function(thing) {
    
    var d = 0;
    var witha = "";
    var verb = "attacks"
    if (this.weapon)
    {
        d = this.weapon.damagePoints();
        witha = " with a " + this.weapon.name;
        verb = this.weapon.attackverb;
    }
    else
    {           
        var d = this.damagePoints();
    }
    
    log (DANGER, this.name + " " + verb + " " + thing.name + witha + " for " + d + " damage");
    thing.Damage(d);
};

Creature.prototype.Damage = function(damage){ 
    
    originaldamage = damage;
    
    if (this.armor)
    {
        damage = this.armor.modifyDamage(originaldamage);
        var diff = originaldamage - damage;
        log (DANGER, this.name + "'s' " + this.armor.name + " absorbs " + diff + " damage so you take " + damage + " damage");
    }    
    
    this.hitPoints -= damage;
    
    if (this.hitPoints <= 0)
    {     
        log (HURRAY, this.name + " is dead.");
        
        if (this.onDie)
        {
            this.onDie();
        }
        
        this.div.remove(); 
        if (this.map)
        {
            this.map.Remove(this);
        }
    }
    else
    {
        this.Update();
    }
};

Creature.prototype.Turn = function() {
    var d = [ [1,0], [-1,0], [0,1], [0,-1] ];
    
    for (var i in d)
    {
        if (player.x == this.x + d[i][0] && player.y == this.y + d[i][1])
        {
            this.AttemptMove(d[i][0], d[i][1]); 
            return;
        }  
    }
    
    var i = Math.floor(Math.random()*5);
    if (d[i])
        this.AttemptMove(d[i][0], d[i][1]);    
};

Creature.prototype.Render = function(mapdiv) {
    MapThing.prototype.Render.apply(this, [mapdiv]);
    
    var bgdiv = $(DIV);
    var hpdiv = this.hpdiv = $(DIV); 
    bgdiv.addClass("hitPointsBar");
    hpdiv.addClass("hitPoints");
    this.div.append(bgdiv)
    this.div.append(hpdiv);
    this.div.addClass("creature");
    
    this.Update();
};

Creature.prototype.Update = function() {  
    MapThing.prototype.Update.apply(this); 
    
    this.hpdiv.html(this.hitPoints + "/" + this.maxHitPoints); 
    this.hpdiv.css('width', Math.floor(30 * this.hitPoints/this.maxHitPoints) );      
};

function MapTeleport(obj) {
    copyProps(this, obj);
    return this;    
}

MapTeleport.inherits(MapThing);

function Item(obj) {
    if (obj.itemType)
    {
        copyProps(this, obj.itemType);
    }
    
    copyProps(this, obj);
    
    return this;
}

Item.inherits(MapThing);
              
Item.prototype.UseBy = function(thing) {
    if (this.fullheal)
    {
        thing.hitPoints = thing.maxHitPoints;             
        log(thing.name + " has been fully healed by a " + this.name);
    }
}