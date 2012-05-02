/*function Inventory(obj) {
    copyProps(this, obj);
}
*/

var defaultPlayer = {
    x: 0, y: 0,
    weapon: itemTypes.playerfist,
    armor: itemTypes.armor.tshirt,
    money: 0,    
    items: []
};


function Player(obj) {
    if (arguments.length == 0) return this;
    
    copyProps(this, defaultPlayer);
    Creature.apply(this, [obj]); 
    
    return this;
}

Player.inherits(MapThing)
Player.inherits(Creature);

Player.prototype.Turn = function () {}
    
Player.prototype.Hit = function(thing) {
    if (thing instanceof Creature)
    {
        this.Attack(thing);
    }
    else if (thing instanceof Item)
    {
        if (thing.is.money)
        {
            this.money += thing.value;
                
            log("you just picked up a " + thing.name + ".  you now have " + this.money + " doolars");
        }
        else
        {
            this.items.push(thing);
            log ("you just picked up a " + thing.name);
        }
        
        this.map.Remove(thing);    
    }
    else if (thing instanceof MapTeleport)
    {                           
        this.map.Remove(this);
        this.map = thing.targetmap;
        this.x = thing.targetx;
        this.y = thing.targety;
        this.map.Add(this);
    }
}

Player.prototype.UseByIndex = function(index) {
    item = this.items[index];
    
    if (item.is.weapon)
    {
        this.items.push(this.weapon);
        this.weapon = item;   
        this.RemoveItemByIndex(index);           
        log("you have armed yourself with a " + item.name);
        return true;
    }
    else if (item.is.armor)
    {
        this.items.push(this.armor);
        this.armor = item;   
        this.RemoveItemByIndex(index);
        log("you have donned " + item.name);
        return true;
    } 
    else if (item.UseBy)
    {
        item.UseBy(this);
        this.RemoveItemByIndex(index);
        return true;
    }   
    return false;
}

Player.prototype.RemoveItemByIndex = function(index) {
    this.items.splice(index, 1);
}

Player.prototype.FindItemByName = function(name) {
    for (var i in this.items)
    {
        if (this.items[i].name == name) return i; 
    }
    return -1;
}