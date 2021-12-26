/*
Factorial digit sum

n! means n × (n − 1) × ... × 3 × 2 × 1

For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

Find the sum of the digits in the number 100!
*/

// algorithm
// run a reduce of 100! into a bigInt type
// convert to string
// reduce, convert letter to number and sum

// runtime analysis -> o(3n) -> o(n);

function factorial(num) {
    if (num === 1) {
        return BigInt(1);
    }
    return BigInt(num) * BigInt(factorial(num -1));
}

function getSumOfDigits(num) {
    let bigInt = factorial(num);
    let sum = [...bigInt.toString()].map(x => parseInt(x, 10)).reduce((prev, curr) => prev + curr); // o(n) + o(n) + o(n) = o(3n) = o(n)    
    return sum;
}

function runTest(num, expected) {
    let actual = getSumOfDigits(num);
    console.log(`For a num ${num} we got ${actual} and expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(10, 27);
runTest(100, 648 );