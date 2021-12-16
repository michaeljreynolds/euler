/*
Sum Square Difference
The sum of the squares of the first ten natural numbers is, 1^2 + 2^2 + ... 10^2 = 385
The square of the sum of the first ten natural numbers is, (1 + 2  + ... + 10)^2 = 3025
Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 - 385 = 2640.
Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
*/

// thoughts
// I suspect that calculating the square of the sum of the first 100 natural numbers should be quite possible with js memory requirements
// js memory limit for numbers is 1.7976931348623157e+308 which 

// algorithm
// 1) declare two variables, one to keep track of sum of the squares and one to keep track of sum of natural numbers.
// 2) loop through the first x natural numbers. assign values to two variables
// 3) calculate difference between sum of square and square of sum.

// runtime analysis - scales well with high numbers
// as far as cycles, Math.pow is more expensive than addition, so summing squares should take longer than squaring a sum at the end
// should run in o(n) time complexity

function getSumSquareDifference(maxNumber) {    
    let sumSquares = 0;
    let squareSums = 0;    

    // can do both checks in one loop
    for (let i = 1; i <= maxNumber; i++) { // o(n)
        sumSquares += Math.pow(i, 2);
        squareSums += i;
    }
    return Math.pow(squareSums, 2) - sumSquares;
}


function runTest(maxNumber, expected) {
    let actual = getSumSquareDifference(maxNumber);
    console.log(`The difference calculated is ${actual} for a range from 1 to ${maxNumber}`);
    console.log(`Passes? ${actual === expected}`);    
}

runTest(10, 2640);
runTest(100, 25164150); // euler answer
runTest(10000000000, 2.4999999996734532e39); // stress test

