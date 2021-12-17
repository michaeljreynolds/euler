/*
10,001st Prime

By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

What is the 10 001st prime number?
*/

// algorithm - use sieve to generate primes
// since I like to visualize the primes, I decided to hold them in an array
// I could decrease memory requirements by keeping track of the prime count we are on instead of an array
 

let primeLimit = 1000000;

function findPrimeAt(position) {
    let primes = generatePrimesUsingSieve(primeLimit); 
    return primes[position - 1];
}

function generatePrimesUsingSieve(primeLimit) {
    let sieve = [];
    let primes = [];    

    // fill sieve out with all trues
    for (let i = 0; i < primeLimit; i++) {
        sieve.push(true);
    }    

    let currentPrime = 1;    
    let hasAnotherPrime = true;

    // find next prime, add to our list, and mark multiples as false in the sieve
    while (hasAnotherPrime) {
        hasAnotherPrime = false;
        for (let i = currentPrime + 1; i < sieve.length; i++) {
            if (sieve[i] === true) {
                hasAnotherPrime = true;
                primes.push(i);
                currentPrime = i;                        
                break;
            }
        }
        // currentPrime * 2 so we don't mark our current prime as false
        for (let i = currentPrime * 2; i < sieve.length; i += currentPrime) {
            sieve[i] = false;
        }
    }    
    console.log(primes);        
    return primes;
}

function runTest(limit, expected) {
    let actual = findPrimeAt(limit);
    console.log(`The prime at position ${limit} is ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(6, 13);
runTest(10, 29);
runTest(10001, 104743);
