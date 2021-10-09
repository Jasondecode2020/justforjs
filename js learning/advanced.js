// ################### *1* ###################

const items = [1, 3, 5];

const Square = (i) => {
  return {
    item: i,
    square: i * i,
  };
};

const itemsAndSquare = items.map(Square);
console.log(itemsAndSquare);

// ################### *2* ###################
const items1 = [1, 3, 2, 5];

const Even = (i) => {
  if (i % 2 == 0) {
    return true;
  } else {
    return false;
  }
};

const evenItems = items1.filter(Even);
console.log(evenItems);

// ################### *3* ###################
const items2 = [1, 3, 2, 5];

const getSum = (total, num) => {
  return total + num;
};

const totalItems = items2.reduce(getSum, 0);
console.log(totalItems);

// ################### *4* ###################
// more concise
let arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((t, v) => t + v, 0);
console.log(sum);
const even = arr.filter((number) => number % 2 == 0);
console.log(even);
const odd = arr.filter((number) => number % 2 == 1);
console.log(odd);
const over3 = arr.filter((number) => number > 3);
console.log(over3);
const index1to2 = arr.filter((number, idx) => (idx >= 1 && idx <= 2));
console.log(index1to2);
