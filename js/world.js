function World(obj)
{
    copyProps(this, this.default);
    copyProps(this, obj);
}

World.prototype.default = {
    db: [ null ],
    active: [ null ],
    loadcount: 0,
    nextid: 1
}

World.prototype.load = function(id) {
    if (this.active[id] == null) 
    {
        this.loadcount++;
        this.active[id] = new Entity(this.db[id]);
    }
    
    return this.active[id];
}

World.prototype.save = function(id) {
    var active = this.active[id];
    var current_db_object = this.db[id];
    var new_db_object = {};
    
    foreach(var prop in active)
    {
        if (prop[0] == "_")
        {
            new_db_object[prop] = active[prop];
        }
    }
    this.db[id] = new_db_object;
}

World.prototype.unload = function(id) { 
    if (this.active[id] != null) this.loadcount--;
    delete this.active[id];
}

World.prototype.saveAndUnload = function(id) {
    this.save(id);
    this.unload(id);
}

World.prototype.add(entity) {
    entity.id = this.nextid++;
    entity.world = this;
    
    this.active[id] = entity;
}

World.prototype.addAndSave(entity) {
    this.add(entity);
    this.save(entity.id);
}

World.prototype.addToDb(entity) {
    this.add(entity);
    this.saveAndUnload(entity);
}

function Entity(obj)
{   
    copyProps(this, this.default);
       
    for( var type in this.types )
    {
        fillProps(this, type.default);
        copyProps(this, type);
    }
                        
    copyProps(this, obj); 
}

Entity.prototype.default = {
    //entity
    id: -1,
    types: [],
    world: null
}

function Damageable(){}
Damageable.prototype.default = {      
    //creatures, things that can be damaged
    _maxlife: null,
    _life: null,
}

function Physical(){}
Physical.prototype.default = {    
    //for things that exist physically
    _inside: null, //_inside? 
        //eg map. in a box which is on a map. inside a magic crystal in a box on a map.    
    _map: null, //if it's on a map...
    _x: null,
    _y: null,
    _z: null //in this awesome world z is up... could have stuff in the sky?
        //stuff falls on you?  things fly?  YES THINGS FLY.          
}
