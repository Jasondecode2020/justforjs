// ################### *1* ###################

const { constant } = require("lodash");

// const define an immutable value
const constValue = 'hey';
// let defines mutable value
let variableValue = 0;
// var is an old version of JS to define scope of value to function, not recommended
var anotherVariableValue = false;

variableValue = 1;
anotherVariableValue = 2;

console.log("1 const, var, let:")
console.log(constValue);
console.log(variableValue);
console.log(anotherVariableValue);
// hey
// 1
// 2

// ################### *2* ###################
// console.log is print method is JS
// we have a constant
console.log("2 console.log")
const name = 'Bindi';
// and a variable
let age = 22;
// and an object
let wildlifeWarrior = {
  name: name,
  age: age,
  gender: 'f',
};

console.log('Hello, world!');

console.log(name);
console.log(age);
console.log('name:', name);
console.log('age: ' + age);
console.log('Person:', wildlifeWarrior);
/*
Hello, world!
Bindi
22
name: Bindi
age: 22
Person: { name: 'Bindi', age: 22, gender: 'f' }
*/
// as we know, there are two different type of comment: inline and block

// ################### *3* ###################
// data types: 8
console.log("3 data types:")
let value;
console.log("1", typeof value);
// 1 Number
value = 0.1;
console.log("2", typeof value);
// 2 string
value = 'hey';
console.log("3", typeof value);
// 3 null
value = null;
console.log("4", typeof value);
// 4 undefined
value = undefined;
console.log("5", typeof value);
// 5 boolean
value = true;
console.log("6", typeof value);
// 6 Symbol()
value = Symbol();
console.log("7", typeof value);
// 7 object
value = { key: 'hey', anotherKey: 10 };
console.log("8", typeof value);
// 8 BigInt
value = BigInt(4433433343433);
console.log("9", typeof value);

// ################### *4* ###################
// function can be defined in anonymous or normal way
console.log('4 function')
let value1, value2;

value1 = function(param) {
  console.log('param =', param);
};
console.log("value1:", typeof value1);

value2 = (param1, param2) => {
  console.log(param1, param2);
}
// define function without defining variable
function foo(bar) {
  return bar + 1;
}
// calling function
const result = foo(10);
value1(result);
value2(result, result);

// ################### *5* ###################
// type conversing
console.log(undefined == null); // same value
console.log(undefined === null); // diff type
let value3 = 10;
let strValue3 = value3.toString();
let strValue4 = value3 + '';
console.log(typeof strValue3);
console.log(typeof strValue4);

let numValue = parseInt(strValue4, 10);
let floatValue = parseFloat(strValue4)
console.log(typeof numValue);
console.log(typeof floatValue);

let bigIntValue = BigInt(numValue);
let bigIntValue1 = BigInt(strValue4);
console.log(typeof bigIntValue);
console.log(typeof bigIntValue1);

let numValue1 = Number(bigIntValue);
let numValue2 = parseInt(bigIntValue, 10);
console.log(typeof numValue1, typeof numValue2);

// ################### *5* ###################
// == and ===, always use ===
let a = 10;
let b = '10';
console.log(a == b); // string convert to number
console.log(a === b); // diff type

// ################### *6* ###################
// Object, Array, Map, Set
const obj = { key: 'some-value', anotherKey: 10 };
console.log(obj.key);
console.log(obj['key']);

// arr is obj with index and length
const arr = ['first value', 2, obj];
console.log(arr[0]);
console.log(arr.length);
console.log(typeof arr);

// Map can use any value as a key, preserves order
const map = new Map();
map.set('one', 1);
console.log(map.get('one'));
console.log(map.has('one'));

// Set contains unique values
const set = new Set();
set.add('one');
set.add('one');
console.log(set.has('one'));

// ################### *7* ###################
// conditions
// if else 
let c = 5;
if (c > 0) {
  console.log(true);
}

if (c < 0) {
  console.log('c < 0');
} else {
  console.log('c > 0');
}
 if (c < 0) {
   console.log('c < 0');
 } else if (0 <= c && c < 5) {
   console.log('0 <= c && c < 5')
 } else {
   console.log('c >= 5');
 }
// switch
switch (c) {
  case 0:
    console.log(0);
    break;
  case 1:
    console.log(1);
    break;
  case 2:
    console.log(2);
    break;
  case 3:
    console.log(3);
    break;
  case 4:
    console.log(4);
    break;
  default:
    console.log(5);
}
// inline
const res = c === 5 ? true : false;
console.log(res);

function runSomething() {
  console.log('runSomething');
}

if (c) {
  runSomething();
}

c && runSomething(); // simple way of if 

// important to know if condition for data type, obj always print
if('0') {
  console.log('print');
}

if (0) {
  console.log('never');
}

if (Symbol()) {
  console.log('print');
}

if (function x() {}) {
  console.log('print');
}

if (+'0') {
  console.log('never');
}

if (new String('')) {
  console.log('always print');
}

if (new Number(0)) {
  console.log('print');
}

// ################### *8* ###################
// loops
// for
for (let i = 0; i < 3; i++) {
  console.log(i);
}

let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}

let j = 0;
do {
  ++j;
  if (j >= 3) {
    break;
  }
  console.log(j);
} while (true);

j = 0;
do {
  console.log(j);
  j++;
} while (j < 3);

// ################### *9* ###################
// classes
class Snack {
  // constructor auto called
  constructor(calories, name) {
    this.caloriesRemaining = calories;
    this.name = name;
  }

  // method
  chew() {
    this.caloriesRemaining -= 100;
    return 
  }
}
let snack = new Snack(200, 'goody'); // use class obj
snack.chew() // call function
console.log(snack.caloriesRemaining);

class Pizza extends Snack {
  static caloriesPerGram = 2.66;

  constructor(weightInGrams) {
    super(Pizza.caloriesPerGram * weightInGrams, 'XL');
  }
}
let pizza = new Pizza(200);
console.log(pizza);
pizza.chew() // call function
console.log(pizza.caloriesRemaining);


class Crisps extends Snack {
  static caloriesPerGram = 5.66;

  constructor(weightInGrams) {
    super(Crisps.caloriesPerGram * weightInGrams, 'Thins');
  }
}

let crisps = new Crisps(200);
console.log(crisps);
crisps.chew() // call function
console.log(crisps.caloriesRemaining);

class Meal {
  constructor(snacks) {
    this.snacks = snacks;
  }
  eatSome() {
    for (let i = 0; i < this.snacks.length; i++) {
      const snack = this.snacks[i];
      console.log('chewing', snack.name);
      snack.chew();
    }
  }

  logCalories() {
    for (let i = 0; i < this.snacks.length; i++) {
      const snack = this.snacks[i];
      console.log(snack.name, ': ', snack.caloriesRemaining);
    }
  }
}
console.log(typeof Meal); // function

const snacks = [
  new Pizza(400),
  new Crisps(150),
];
  
const meal = new Meal(snacks);
meal.logCalories();
meal.eatSome();
meal.logCalories();
console.log(typeof Meal); // not new function
console.log(typeof meal); // after new obj
// ################### *10* ###################
// fibo in JS
const fib = (n) => {
  if (n === 0 || n === 1) {
    return n;
  }

  let curr = 1, prev = 1, prePrev = 0;
  for (let i = 2; i < n + 1; i++) {
    prePrev = prev;
    prev = curr;
    curr = prePrev + prev;
  }
  return curr;
};
console.log(fib(5));