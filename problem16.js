/*
Power Digit Sum

2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

What is the sum of the digits of the number 2^1000?
*/

// algorithm - we wont have enough precision if we just use js number type. luckily there is the bigInt primitive!
// step 1) convert to bigInt
// step 2) convert to string
// step 3) convert to an array of numbers where each element is a digit. now we can hold a large number
// step 4) reduce the array and keep track of the sum

// runtime analysis - map and reduce are both o(n) so we have o(n) + o(n) = o(2n) => o(n)
// as expected this runs fast. map and reduce has to loop through the whole array.
// runs in linear time


function getSumOfDigits(number) {
    //let big = BigInt(number);
    //let bigNumberAsArray = [...BigInt(number).toString()].map((letter) => parseInt(letter, 10));
    //let sum = bigNumberAsArray.reduce((prev, current) => prev + current);    
    //let sum = [...BigInt(number).toString()].map((letter) => parseInt(letter, 10)).reduce((prev, current) => prev + current);
    return [...BigInt(number).toString()].map((letter) => parseInt(letter, 10)).reduce((prev, current) => prev + current);
}

function runTest(number, expected) {
    let actual = getSumOfDigits(number);
    console.log(`For the number ${number}, the sum of the digits is ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(Math.pow(2,15), 26);
runTest(Math.pow(2,1000), 1366);