/*
Circular Primes

The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.

There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

How many circular primes are there below one million?
*/

// to rotate - digit to string. string to array. pop top and push to back. do this n - 1 times where n is length of digits 

// algorithm
// generate primes up to 1 million
// for each prime, rotate n - 1 times. if is prime, increment sum
// i remembered sieve

// runtime anlysis
// generating primes takes o(nlogn)
// finding circular primes is o(logn) since we hashed our primes
// generating primes takes the longest so our worst case runtime is => o(nlogn)

// time to code 22 minutes - was fun

function generatePrimesUpTo(limit) { // o(nlogn)    
    let primes = {};
    let lastPrimeIndex = 0;        
    
    let sieve = new Array(limit + 1).fill(true); // o(n)    
    sieve[0] = false;
    sieve[1] = false;

    for (let i = lastPrimeIndex; i < sieve.length; i++) { // o(n)
        if (sieve[i]) {
            primes[i] = true;
            for (let j = i; j <= sieve.length; j += i) { // o(logn)
                sieve[j] = false;
            }
            lastPrimeIndex = i;
        }
    }    
    return primes;
}

function isCircularPrime(num, primes) { // o(logn) as our limit bounds increase, the size of our arr generated is logn of limit. 1,000,000 limit becomes 7 digits
    let arr = [...num.toString()];
    for (let i = 0; i < arr.length - 1; i++) {
        let popped = arr.shift();
        arr.push(popped);
        if (!primes[parseInt(arr.join(''), 10)]) { // o(1)
            return false;
        }
    }
    return true;
}

function getCircularPrimesUpTo(limit) {
    let primes = generatePrimesUpTo(limit); // o(nlogn)
    let sum = 0;

    for (let prime in primes) { // o(n)
        sum += isCircularPrime(prime, primes) ? 1 : 0; // o(logn)
    }    
    return sum;
}

function runTest(limit, expected) {
    let actual = getCircularPrimesUpTo(limit);
    console.log(`Up to ${limit} we got ${actual} and expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(100, 13);
runTest(1000000, 55);


