var tilesets = {};

tilesets.dungeon = {
    css: "dungeon",
    tiles: [
        { solid: false },
        { css: "dirt colorvar", solid: true },  
        { css: "stone imagevar", solid: true },           
        { css: "stonebricks", solid: true },
        { css: "tunnel imagevar", solid: false } ,
        { css: "ladder", solid: false },
    ]
}; 

tilesets.house = {
    css: "house",
    tiles: [
        { css: "wall", solid: true },
        { css: "floor", solid: false } ,
        { css: "door", solid: false }
    ]
};

tilesets.outside = {
    css: "outside",
    tiles:[
        { solid: false },
        { solid: true },
        { css: "grass colorvar", solid: false }, 
        { css: "dirt colorvar", solid: false }, 
        { css: "river colorvar", solid: true },
        { css: "bridge", solid: false }, 
        { css: "tree posvar", solid: true },
        null,
        { css: "castle", solid: false },
        { css: "boulder", solid :true },
        { css: "hut", solid: false }
    ]
};

var itemTypes = {};

itemTypes.apple = {
    name: "apple",
    css: "apple",
    is: {food: true},
    UseBy: function(thing) {
            thing.hitPoints = thing.maxHitPoints;             
            log(thing.name + " has been fully healed by a " + this.name);
    }
} 

itemTypes.key = {
    name: "key",
    css: "key",
    is: {key: true},    
}

itemTypes.playerfist = {
    name: "fist",
    attackverb: "punches",
    css: "fist",
    is: {weapon: true},
    damagePoints: function() { return Math.randint(1, 2); }
}

itemTypes.dagger = {
    name: "dagger",
    attackverb: "stabs",
    css: "dagger",
    is: {weapon: true},
    damagePoints: function() { return Math.randint(2, 4); }
}

itemTypes.sword = {
    name: "sword",  
    attackverb: "slices",
    css: "sword",
    is: {weapon: true},
    damagePoints: function() { return Math.randint(3, 6); }
}   

itemTypes.armor = {}; 

itemTypes.armor.leather = {
    name: "leather armor",  
    css: "leather armor",
    is: {armor: true},
    modifyDamage: function(originaldamage) {
        var d = originaldamage - 1;
        return d > 0 ? d : 0;
    }
}  

itemTypes.armor.plate = {
    name: "plate armor",  
    css: "plate armor",
    is: {armor: true},
    modifyDamage: function(originaldamage) {
        var d = originaldamage - 4;   
        return d > 0 ? d : 0;
    }
}

itemTypes.armor.tshirt = {
    name: "t shirt",  
    css: "tshirt armor",
    is: {armor: true},
    modifyDamage: function(originaldamage) {
        return originaldamage;
    }
}    

itemTypes.coin = {
    name: "coin",
    css: "coin",
    is: {money: true},
    value: 1
}    

var creatureTypes = {};

creatureTypes.rat = {
    css: "rat",
    name: "rat",
    maxHitPoints: function () { return Math.randint(1, 3); },
    damagePoints: function() { return Math.randint(1, 2); },
    onDie: function() {  
        if (Math.random() < 0.5)
        {
            this.map.Add( new Item( {itemType: itemTypes.coin, x: this.x, y: this.y} ) );
        }    
    }
};

creatureTypes.dog = {
    css: "dog",
    name: "wild dog",
    maxHitPoints: function() { return Math.randint(3,5); },
    damagePoints: function() { return Math.randint(2,4); }
};

creatureTypes.cat = {
    css: "cat", 
    name: "mountain cat",
    maxHitPoints: function() { return Math.randint(4, 6); },
    damagePoints: function() { return Math.randint(1, 3); } ,
    onDie: function() {
        this.map.Add( new Item( {itemType: itemTypes.apple, x: this.x, y: this.y} ) );
    }
}; 

creatureTypes.tiger = {
    css: "tiger", 
    name: "tiger",
    maxHitPoints: function() { return Math.randint(7, 12); },
    damagePoints: function() { return Math.randint(3, 6); } ,
    /*onDie: function() {
        this.map.Add( new Item( {itemType: itemTypes.armor.plate, x: this.x, y: this.y} ) );
    } */
};

creatureTypes.skeleton = {
    css: "skeleton",
    name: "skeleton",
    maxHitPoints: function() { return Math.randint(3,5); },
    damagePoints: function() { return Math.randint(3,5); }
};   

creatureTypes.evildude = {
    css: "evildude", 
    name: "evil dude",
    maxHitPoints: function() { return 20; },
    damagePoints: function() { return Math.randint(4, 8); } ,
    onDie: function() {
        log("you have defeated the evil dude!  you have won the game!");
    }
};

creatureTypes.dude = {
    css: "dude",     
    name: "dude",
    maxHitPoints: 20,
    damagePoints: function() { return Math.randint(1, 2); }
};
