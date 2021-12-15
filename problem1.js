/*
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.
*/


// This is probably one of the cleanest solutions
// The 3 and 5 magic numbers are only written once

// global value for multiples
const multiplesOf = [3,5];

function solve(limit) {
    let multiples = findMultiples(limit, multiplesOf); 
    return sum(multiples);
}


function findMultiples(limit, multiplesOf) {
    // by using an object, we save our multiple value as a property of an object
    // this is an indirect hash
    // we can then loop through the objects properties values and sum
    let multiples = {};
    for (let i = 0; i < multiplesOf.length; i++) {
        const startNum = multiplesOf[i];
        let currentNum = startNum;
        while (currentNum < limit) {
            multiples[currentNum] = currentNum;
            currentNum += startNum;
        }
    }
    return multiples;
}

function sum(multiples) {    
    let sum = 0;
    for (let multiple in multiples) {
        sum += multiples[multiple];
    }    
    return sum;
}

function runTest(limit, expected) {    
    const result = solve(limit);
    const passed = result === expected;
    console.log(`Running test for ${limit} \n Expecting ${expected}, got ${result}`);
    console.log(`Passed: ${passed}`);
    return passed;
}

runTest(10, 23); // 3, 5, 6, 9
runTest(1000, 233168);

