// This is a solo challenge

// Your mission description:
// A Wizard, Fred, needs to cast a spell to turn his assistant, Stan, back into a human.
// He can only cast a spell if he has a wand.
// His wand was taken by a dog, Fido, who is in the corridor.
// Find Fido, give him a treat to make him drop your wand, pick up your wand
// And turn Stan back into a human

// Pseudocode
// Create an 'assistant' object with attributes "name" = "Stan", "form" = "frog", and a position object with attributes x = 1, y=0;
// Create a 'wizard' object with attributes "name" = "Fred", "form" = "human", "holding" = empty array, and a position object with attributes x = 0, y=0;
// Create an empty 'wand' object.
// Create a 'treat' object with an attribute flavor: bacon and a parameter called position which has an object as a value with values {x = 2, y = 10}.
// Create a 'dog' object with attributes "name" = "Fido", "form" = "dog", "holding" array containing one object 'wand', and a position object with attributes {x = 10, y=10};
// Add methods as parameters to the wizard object: moveLeft, moveRight, moveUp, moveDown which change his position accordingly move him around the world
// Add method to 'wizard' object: castMakeHumanSpell which takes an object as an argument sets that object's form parameter to human after it checking that the wands parameter > 0 and that the object is no more than 1 unit away from his current position. The method should log an error to the console if the value of the wands parameter is not > 0 or if he is not close enough to the oject.
// Add a method to 'wizard' and 'dog' objects: pickUp that takes an object as an argument and checks that that the objects position parameter is in same precise location. If it is, add the object to the calling object's 'holding' array and remove the position parameter from the object provided as an argument.
//  Add a method to 'wizard' and 'dog' objects: putDown that takes an object as a paramenter and will pop that object from the array stored in the holding parameter if it is present and give it a location equal the calling object's position.
// Add a method 'searchForTreat' to the dog object that will pop all items


// Initial Code
// An 'assistant' object with attributes "name" = "Stan", "form" = "frog", and a position object with attributes x = 1, y=0;
var assistant = {
  name: 'Stan',
  form: 'frog',
  position: {
    x: 1,
    y: 0
  }
};

// Create a 'wizard' object with attributes "name" = "Fred", "form" = "human", "holding" = empty array, and a position object with attributes x = 0, y=0;
var wizard = {
  name: 'Fred',
  form: 'human',
  holding: [],
  position: {
    x: 0,
    y: 0
  }
};

// Create an empty 'wand' object.
var wand = {};

// Create a 'treat' object with an attribute flavor: bacon and a parameter called position which has an object as a value with values {x = 2, y = 10}.
var treat = {
  flavor: 'bacon',
  position: {
    x: 2,
    y: 10
  }
};

// Create a 'dog' object with attributes "name" = "Fido", "form" = "dog", "holding" array containing one object 'wand', and a position object with attributes {x = 10, y=10};
var dog = {
  name: 'Fido',
  form: 'dog',
  holding: [wand],
  position: {
    x: 10,
    y: 10
  }
};


// Add methods as parameters to the wizard object: moveLeft, moveRight, moveUp, moveDown which change his position accordingly move him around the world
wizard.moveLeft = function() {
  this.position.x -= 1;
};

wizard.moveRight = function() {
  this.position.x += 1;
};

wizard.moveUp = function() {
  this.position.y -= 1;
};

wizard.moveDown = function() {
  this.position.y += 1;
};


// Add method to 'wizard' object: castMakeHumanSpell which takes an object as an argument sets that object's form parameter to human after it checking that the holding array contains the wand object and that the object is no more than 1 unit away from his current position. The method should log an error to the console if the value of the wands parameter is not > 0 or if he is not close enough to the oject.
wizard.castMakeHumanSpell = function(obj) {
  if (this.holding.indexOf(wand) < 0)
    console.log("The wizard is not holding a wand!")
  else if (Math.abs(obj.position.x - this.position.x) > 1 || Math.abs(obj.position.y - this.position.y) > 1)
    console.log("That target is too far away!")
  else
    obj.form = 'human';
};

// Add a method to 'wizard' and 'dog' objects: pickUp that takes an object as an argument and checks that that the objects position parameter is in same precise location. If it is, add the object to the calling object's 'holding' array and remove the position parameter from the object provided as an argument.
wizard.pickUp = function(obj) {
  console.log('The object is at: ' + obj.position.x + ',' + obj.position.y + ' the character is at: ' + this.position.x + ',' + this.position.y)
  if ((obj.position.x - this.position.x) !== 0 || (obj.position.x - this.position.x) !== 0)
    console.log("There's nothing here to pick up!")
  else
    delete obj.position;
    this.holding.push(obj);
};

dog.pickUp = function(obj) {
  if ((obj.position.x - this.position.x) !== 0 || (obj.position.x - this.position.x) !== 0)
    console.log("There's nothing here to pick up!")
  else
    delete obj.position;
    this.holding.push(obj);
};

//  Add a method to 'wizard' and 'dog' objects: putDown that takes an object as a paramenter and will pop that object from the array stored in the holding parameter if it is present and give it a location equal the calling object's position.
wizard.putDown = function(obj) {
  if (this.holding.indexOf(obj) < 0)
    console.log("Not holding that!");
  else
    this.holding.pop(obj);
    obj.position = this.position;
};

dog.putDown = function(obj) {
  if (this.holding.indexOf(obj) < 0)
    console.log("Not holding that!");
  else
    this.holding.pop(obj);
    obj.position = this.position;
};

// solution:
//console.log(wizard,assistant,dog);
wizard.moveRight();
wizard.moveRight();
for (var i = 0; i < 10; i++) {
  wizard.moveDown();
}
wizard.pickUp(treat)
for (var i = 0; i < 8; i++) {
  wizard.moveRight();
}
wizard.putDown(treat);
dog.putDown(wand);
dog.pickUp(treat);
wizard.pickUp(wand);

// wizard should have wand now, he must return to his assistant
for (var i = 0; i < 10; i++) {
  wizard.moveUp();
}
for (var i = 0; i < 10; i++) {
  wizard.moveLeft();
}
wizard.castMakeHumanSpell(assistant);

console.log(wizard,assistant,dog,wand,treat);


// Refactored Code






// Reflection
//
//
//
//
//
//
//
//