/*
Summation of Primes

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.

*/

// algorithm - use sieve to generate primes up to two million
// run reduce() function through array of primes to sum them

// runtime analysis 
// sieve runs in o(nlogn) time
// we could save some cycles reducing by keeping track of the sum as we go instead
// but eventually this method will be ported to its own class and SRP dictates it just generates a list of primes

function getSumOfPrimesBelow(number) {
    let sieve = [];
    let primes = [];

    for (let i = 0; i < number; i++) {
        sieve.push(true);
    }

    let hasPrime = true;
    let currentPrime = 1;

    while (hasPrime) { // o(n) * o(logn) => o(nlogn)
        hasPrime = false;
        // find next prime and add to list
        for (let i = currentPrime + 1; i <= sieve.length; i++) { // o(n)
            if (sieve[i] === true) {
                currentPrime = i;
                primes.push(i);
                hasPrime = true;
                break;
            }
        }
        if (hasPrime) {
            for (let i = currentPrime * 2; i < sieve.length; i+=currentPrime) { // o(logn)
                sieve[i] = false;
            }
        }
    }
    // reduce to find sum of all primes in list
    return primes.reduce((prev, current) => prev + current);
}

function runTest(number, expected) {
    let actual = getSumOfPrimesBelow(number);
    console.log(`The sum of all the primes below ${number} is ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(10, 17);
runTest(2000000, 142913828922 );

