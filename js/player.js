/*function Inventory(obj) {
    copyProps(this, obj);
}
*/

var defaultPlayer = {
    x: 0, y: 0,
    weapon: itemTypes.playerfist,
    armor: itemTypes.armor.tshirt,
    money: 0,
    
    items: [ itemTypes.apple, itemTypes.apple, itemTypes.armor.leather ]
    //inventory: new Inventory
};


function Player(obj) {
    if (arguments.length == 0) return this;
    
    copyProps(this, defaultPlayer);
    Creature.apply(this, [obj]); 
    
    return this;
}

Player.inherits(MapThing)
Player.inherits(Creature);

copyProps(Player.prototype, {
    Turn: function () {
    
    } ,
    
    Hit: function(thing) {
        if (thing instanceof Creature)
        {
            this.Attack(thing);
        }
        else if (thing instanceof MapTeleport)
        {                           
            this.map.Remove(this);
            this.map = thing.targetmap;
            this.x = thing.targetx;
            this.y = thing.targety;
            this.map.Add(this);
        }
    },
});