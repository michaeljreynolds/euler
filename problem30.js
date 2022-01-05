/*
Digit fifth powers

Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

1634 = 1^4 + 6^4 + 3^4 + 4^4
8208 = 8^4 + 2^4 + 0^4 + 8^4
9474 = 9^4 + 4^4 + 7^4 + 4^4
As 1 = 1^4 is not a sum it is not included.

The sum of these numbers is 1634 + 8208 + 9474 = 19316.

Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.
*/

// algorithm
// since we don't have an upper ceiling, we can pick a limit to stop at
// loop from x = 2 to x = limit
// for each number, convert to string, grab each letter, perform Math.pow(x, 5), and sum
// if sum === number, add to results array
// sum results array through reduce

// runtime analysis
// runs in o(n) + o(log n) => o(n)

// time to complete 22 minutes

const ceiling = 10000000;
function getSumPowersOfDigits(power) {
    let results = [];
    let numAsString = '';
    let tempSum = 0;
    for (let num = 2; num < ceiling; num++) { // o(n)        

        numAsString = num.toString();        
        tempSum = 0;

        for (let letterIndex = 0; letterIndex < numAsString.length; letterIndex++) { // < o(log n / 2) since the limit of this loop is length of digits. For n = 1,000,000 length of digits is 7.
            tempSum += Math.pow(parseInt(numAsString[letterIndex], 10), power);
        }        

        if (tempSum === i) {
            results.push(tempSum);
        }
    }
    console.log(results);
    return results.reduce((prev, cur) => prev + cur);
}

function runTest(power, expected) {
    let actual = getSumPowersOfDigits(power);
    console.log(`The sum of all numbers that can be written as the sum of ${power} powers is ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(4, 19316);
runTest(5, undefined);