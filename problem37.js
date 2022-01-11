/*
Truncatable Primes

The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.

Find the sum of the only eleven primes that are both truncatable from left to right and right to left.

NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.
*/

// algorithm
// generate primes using sieve
// run through each prime that is digit length > 1 and perform full rotations left and right
// return false if any rotation yields a non prime number
// otherwise return true
// if return is true, add prime to running sum
// return sum

// runtime analysis
// generating primes takes the longest time since we need to fill an array (n), loop through it (n), and sieve primes (logn)
// truncating primes runs in (k) time where k is size of prime list. loop through k primes. truncating happens in (1) time since we use a lookup hash
// approximation ~ o(nlogn) +  o(k) => o(knlogn) => o(nlogn)

// time to code - 15 min

function generatePrimes(limit) { // o(n) * o(logn) => o(nlogn)
    let primes = new Array(limit).fill(true);
    primes[0] = false;
    primes[1] = false;

    let hash = {};

    let counter = 0;
    for (let i = 2; i < primes.length; i++) { // o(n)
        if (primes[i]) {
            hash[i] = true;
            for (let j = i + i; j < primes.length; j += i) { // o(logn)
                primes[j] = false;
            }
            counter++;
        }
    }    
    console.log(`prime sieve ran ${counter} times compared to a limt of ${limit} and the limit is x${limit / counter} bigger`);
    console.log(hash);
    return hash;
}

function isTruncatablePrime(num, primes) {    
    let size = num.toString().length;

    for (let i = 0; i < 2; i++) { // 0 = left and 1 = right
        let pointer = 0;
        while (pointer < size - 1) { 
            let truncated = i === 0 ? 
                num.toString().substring(pointer + 1) :
                num.toString().substring(0, size - 1 - pointer);            
                
            if (primes[parseInt(truncated, 10)] === undefined) {
                return false;
            }
            pointer++;
        }
    }    
    return true;
}

function sumTruncatablePrimes() {
    let limit = 100;
    let primes = generatePrimes(limit);
    let sum = 0;
    let tempList = [];

    for (let prime in primes) {
        if (prime.toString().length > 1 && isTruncatablePrime(prime, primes)) {
            tempList = [...tempList, prime];
            sum += parseInt(prime, 10);
        }
    }
    console.log(tempList);
    console.log(`templist length is ${tempList.length}`);
    return sum;
}

function runTest(expected) {
    let actual = sumTruncatablePrimes();
    console.log(`The sum of the only 11 truncatable primes is ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(undefined);
