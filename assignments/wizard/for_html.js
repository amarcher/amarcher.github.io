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
    x: 0,
    y: 0
  }
};

// Create a 'wizard' object with attributes "name" = "Fred", "form" = "human", "holding" = empty array, and a position object with attributes x = 0, y=0;
var wizard = {
  name: 'Fred',
  form: 'human',
  holding: [],
  position: {
    x: 1,
    y: 0
  }
};

// Create an empty 'wand' object.
var wand = { name: 'wand' };

// Create a 'treat' object with an attribute flavor: bacon and a parameter called position which has an object as a value with values {x = 2, y = 10}.
var treat = {
  name: 'treat',
  flavor: 'bacon',
  position: {
    x: 2,
    y: 9
  }
};

// Create a 'dog' object with attributes "name" = "Fido", "form" = "dog", "holding" array containing one object 'wand', and a position object with attributes {x = 10, y=10};
var dog = {
  name: 'Fido',
  form: 'dog',
  holding: [wand],
  position: {
    x: 9,
    y: 9
  }
};

var moveWizard = function(prev_pos, new_pos) {
  var old_cell = document.getElementById(prev_pos.join(''));
  var new_cell = document.getElementById(new_pos.join(''));
  var wiz = document.getElementById('wizard').outerHTML;
  new_cell.insertAdjacentHTML('afterbegin', wiz);
  old_cell.innerHTML = old_cell.innerHTML.replace(wiz,'');
  log('&nbsp;')
};

var log = function(message) {
  var console = document.getElementById('console');
  console.innerHTML = (message);
}

// Manipulate the DOM:
// Change classname of *object* to include " held"
// Change classname of *posessor* to include " has_{obj}"
var pickUpObject = function(posessor, obj) {
  var holder = document.getElementById(posessor);
  var obje = document.getElementById(obj);
  var has_string = " has_" + obj;
  obje.className = "object held";
  holder.className += has_string;
}

// Manipulate the DOM:
// Change classname of *posessor* to replace string " has_{obj}" with ""
// Put the object into the current cell
// Change classname of *object* to replace string " held" with ""
var dropObject = function(posessor, obj) {

  // Change classname of *posessor* to replace string " has_{obj}" with ""
  var holder = document.getElementById(posessor);
  var has_string = " has_" + obj;
  holder.className = holder.className.replace(has_string,"");

  // Put the object into the current cell
  var obje = document.getElementById(obj);
  var objeHTML = obje.outerHTML;
  obje.parentNode.removeChild(obje);
  holder.parentNode.appendChild(obje);

// Change classname of *object* to replace string " held" with ""
  obje = document.getElementById(obj);
  obje.className = "object";
}

var makeHuman = function(obj) {
  var assistant = document.getElementById(obj);
  assistant.className = assistant.className.replace('frog','human');
  log('Thank you, kind wizard!');
}



// Add methods as parameters to the wizard object: moveLeft, moveRight, moveUp, moveDown which change his position accordingly move him around the world
wizard.moveLeft = function() {
  var prev_pos = [this.position.y,this.position.x];
  if (prev_pos[1] > 0) {
      this.position.x -= 1;
      var new_pos = [this.position.y,this.position.x];
      moveWizard(prev_pos, new_pos);
    } else {
      log("Can't move that way!");
    }
};

wizard.moveRight = function() {
  var prev_pos = [this.position.y,this.position.x];
  if (prev_pos[1] < 9) {
    this.position.x += 1;
    var new_pos = [this.position.y,this.position.x];
    moveWizard(prev_pos, new_pos);
  } else {
      log("Can't move that way!");
    }
};

wizard.moveUp = function() {
  var prev_pos = [this.position.y,this.position.x];
  if (prev_pos[0] > 0) {
    this.position.y -= 1;
    var new_pos = [this.position.y,this.position.x];
    moveWizard(prev_pos, new_pos);
   } else {
      log("Can't move that way!");
    }
};

wizard.moveDown = function() {
  var prev_pos = [this.position.y,this.position.x];
  if (prev_pos[0] < 9) {
    this.position.y += 1;
    var new_pos = [this.position.y,this.position.x];
    moveWizard(prev_pos, new_pos);
  } else {
      log("Can't move that way!");
    }
};


// Add method to 'wizard' object: castMakeHumanSpell which takes an object as an argument sets that object's form parameter to human after it checking that the holding array contains the wand object and that the object is no more than 1 unit away from his current position. The method should log an error to the console if the value of the wands parameter is not > 0 or if he is not close enough to the oject.
wizard.castMakeHumanSpell = function(obj) {
  if (this.holding.indexOf(wand) < 0)
    log("The wizard is not holding a wand!")
  else if (Math.abs(obj.position.x - this.position.x) > 1 || Math.abs(obj.position.y - this.position.y) > 1)
    log("That target is too far away!")
  else {
    assistant.form = 'human';
    makeHuman('assistant');
  }
};

// Add a method to 'wizard' and 'dog' objects: pickUp that takes an object as an argument and checks that that the objects position parameter is in same precise location. If it is, add the object to the calling object's 'holding' array and remove the position parameter from the object provided as an argument.
wizard.pickUp = function(obj) {
  if (! inSamePosition(this,obj))
    log("There's not a " + obj.name + " here to pick up!")
  else {
    delete obj.position;
    this.holding.push(obj);
    pickUpObject('wizard',obj.name);
  }
};

dog.pickUp = function(obj) {
  if (! inSamePosition(this,obj))
    log("There's nothing here to pick up!")
  else {
    delete obj.position;
    this.holding.push(obj);
    pickUpObject('dog',obj.name);
  }
};

//  Add a method to 'wizard' and 'dog' objects: putDown that takes an object as a paramenter and will pop that object from the array stored in the holding parameter if it is present and give it a location equal the calling object's position.
wizard.putDown = function(obj) {
  if (this.holding.indexOf(obj) < 0)
    log("Not holding that!");
  else {
    this.holding.pop(obj);
    obj.position = {x: this.position.x, y: this.position.y};
    dropObject('wizard',obj.name);
  }
};

dog.putDown = function(obj) {
  if (this.holding.indexOf(obj) < 0)
    log("Not holding that!");
  else {
    this.holding.pop(obj);
    obj.position = this.position;
    dropObject('dog',obj.name);
  }
};

var inSamePosition = function(one, two) {
  if (one.position && two.position) {
    return ((one.position.x === two.position.x) && (one.position.y === two.position.y));
  } else {
    return false;
  }
}

wizard.whistleAtDog = function(dog) {
  if (! inSamePosition(this,dog)) {
    log("There's no dog here to whistle at!");
  }
  else if (! (this.holding.indexOf(treat) < 0)) {
    log("The dog says: 'Drop that treat for me please!");
  }
  else if (! inSamePosition(dog,treat)) {
    log("The dog says: 'Grrr... I don't see any treats!'")
  }
  else {
    dog.putDown(wand);
    dog.pickUp(treat);
    log("The dog says: Bacon!!! Nom nom nom")
  }
}

// solution:



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