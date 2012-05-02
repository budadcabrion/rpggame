var tilesets = {};

tilesets.dungeon = {
    css: "dungeon",
    tiles: [
        { css: "stone randvar4", solid: true },
        { css: "tunnel randvar4", solid: false } ,
        { css: "tunnel ladder", solid: false }
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
        { css: "grass randvar4", solid: false }, 
        { css: "dirt randvar4", solid: false }, 
        { css: "river randvar4", solid: true },
        { css: "bridge", solid: false }, 
        { css: "tree", solid: true },
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
    fullheal: true
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
    maxHitPoints: function () { return Math.randint(1, 4); },
    damagePoints: function() { return Math.randint(1, 2); },
    onDie: function() {  
        if (Math.random() < 0.5)
        {
            this.map.Add( new Item( {itemType: itemTypes.coin, x: this.x, y: this.y} ) );
        }    
    }
};

creatureTypes.cat = {
    css: "cat", 
    name: "cat",
    maxHitPoints: function() { return Math.randint(3, 6); },
    damagePoints: function() { return Math.randint(1, 4); } ,
    onDie: function() {
        this.map.Add( new Item( {itemType: itemTypes.apple, x: this.x, y: this.y} ) );
    }
}; 

creatureTypes.tiger = {
    css: "tiger", 
    name: "tiger",
    maxHitPoints: function() { return Math.randint(7, 12); },
    damagePoints: function() { return Math.randint(3, 6); } ,
    onDie: function() {
        this.map.Add( new Item( {itemType: itemTypes.armor.plate, x: this.x, y: this.y} ) );
    }
};

creatureTypes.dude = {
    css: "dude",     
    name: "dude",
    maxHitPoints: 20,
    damagePoints: function() { return Math.randint(1, 2); }
};
