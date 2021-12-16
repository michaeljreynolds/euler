/*
smallest multiple problem
2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
*/

// algorithm - we can easily start at a number x and do a mod check for numbers 1 to 10. If we get 0 for each one, we have found our smallest number
// we can exploit certain numerical properties to skip numbers we know could not be divisible by numbers 1 10
// for instance, we know number has to be even
// to make this faster, we could change how much we increment divisor at the end of the while() loop
 
// runtime analysis - the complexity is increased by increasing the endRange
// going from endRange 10 to 20 forced me to increase limit from 10,000 to 1000,000,000 which is a x5 magnitude increase in the numbers we have to check
// I think runtime is O(n^2)

function getSmallestNumberDivisableBySequentialRange(startRange, endRange) {
    let limit = 100000000000;    
    let divisor = 2;

    let found = true;
    while (divisor < limit) { // limit goes up O (n^2) if we increase endRange by n amount
        found = true;                
        for (let i = startRange; i <= endRange; i++) {
            if (divisor % i !== 0) { 
                found = false;
                break;
            }
        }
        if (found) {
            console.log(`Smallest number is ${divisor}`);
            return divisor;
        }
        divisor+=2; // dont need to check odd numbers
    }
    return undefined;
}

function runTest(startRange, endRange, expected) {
    let actual = getSmallestNumberDivisableBySequentialRange(startRange, endRange);
    console.log(`The smallest number that is divisable for range ${startRange} to ${endRange} is ${actual} while we expected ${expected} `);
    console.log(`Passes? ${actual === expected}`);
}

runTest(1, 10, 2520);
runTest(1, 20, 232792560 );