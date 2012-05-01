/* Trying to flesh out this "cards" engine for my rpg game.
I feel like there's potential in this idea. 

There are "cards" and "classes".  Basically objects and classes.

Each card has
-id
-an array of tokens (hit points, damage, money, etc)
-an array of other cards played on this card

The behavior of a card is determined by:
-The text on the card (programming of the card)
-The text of other cards both up and down the hierarchy
-The text on environmental effect cards
-The text of a card this card is targetting, or targetted by

A card can be made of an arbitrary array of classes.
A class can reference other classes and so on.
Order of classes matters!  I'm thinking IN ORDER    

More fundamental classes:
-animal, deer, rabbit, bear, sentient, human, timelord, sontoran, dwarf, elf
-plant, tree, pine, flower, tulip
D&D type classes
-archer, spellcaster, warrior, blacksmith, shopkeeper, etc
More rpg type classes
-alive, undead, boat, water, fire, earth, air
Tile classes
-tile, dirt, grass, tree, castle, room, wall, floor
More abstract stuff?
-named, special, lucky,  

ALSO VERBS
-move, attack, talk, run, defend, look, find, dig, build
-mechanic of most of verb cards is, you play them, then you get them back
-your "speed" = x number of move cards? probably move card with x number of tokens

example:
goblin undead swordsman archer
goblin = animal (alive, moves, damageable, body), humanoid
undead = !alive (removes alive)
humanoid = (torso, hand, hand, foot, foot, head) //if we want to get crazy
swordsman = you get a sword card, a sword skill card, equip sword
archer = you get a bow, a bow skill card, equip bow

final class array (or card array this is blowing my mind) for above example:
moves, damageable, body, animal, humanoid, goblin, undead, 
torso, hand, hand, foot, foot, head, humanoid,
sword, sword skill, bow (on hand card? in equip slot? with equip card on it???), bow skill 


Card events                                   
-when the card is played
-while the card is in play
-when the card is destroyed
-when the card is in your hand
-when the card is in your deck

*/