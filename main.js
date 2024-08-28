import hashMap from './hashmap.js';

const test = hashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Get method
// console.log(test.get('apple'));
// console.log(test.get('kite'));

// Has method
// console.log(test.has('apple'));
// console.log(test.has('cheese'));

// Remove method
console.log(test.remove('frog'));

// Number of keys
console.log(test.length());

// Clear hash map
// test.clear();

// Return keys
// console.log(test.keys());

// Return values
// console.log(test.values());

// Return entries
console.log(test.entries());

// Update key
test.set('apple', 'brat');
console.log(test.entries());
