/* 
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?
*/

// algorithm - we can pick a high enough limit to generate prime numbers (would be way below the number 600851475143)
// 1) use an array as a sieve to hold intermediary values as we calcualte primes
// 2) keep an array of primes as we find them
// 3) limit % next smallest prime number must equal 0 && limit / next smallest prime number = quotient. Then quotient / next smallest prime number
// 4) if quotient === next smallest prime number, we are done
// 13195 / 5 = 2639
// 2639 / 7 = 377
// 377 / 13 = 29
// 29 is a prime and is therefore the largest prime factor of 13195


// runtime analysis
// slightly more than o(n) -> o (nlogn)


let primeLimit = 1000000;

// finds max prime factorial for a given number
function findMaxPrimeFactorialFor(number) {
    let primes = generatePrimes(primeLimit);
    console.log('primes');
    console.log(primes);
    let factorials = getPrimeFactorials(primes, number);
    console.log('factorials');
    console.log(factorials);
    return getMaxPrimeFactorials(factorials);
}

// set all positions to true up to limit
// find next prime - hop through list and set multiples of prime to false
// repeat until done
function generatePrimes(limit) { // o(n) + (o (logn) * (o(n) + o(n/2))) -> o(n) + o(nlogn) -> o (nlogn)
    let sieve = [];
    let primes = [];

    for (let i = 0; i <= limit; i++) { // O (n)
        sieve.push(true);
    }

    let increment = 1;
    let stay = true;

    while (stay) { // < O (log n) since this outside loop runs much less than sieve length 
        stay = false;
        // find next prime and mark sieve
        for (let i = increment + 1; i <= sieve.length; i++) { // O (n)
            if (sieve[i] === true) {
                primes.push(i);
                increment = i;
                stay = true;
                break;
            }
        }
        // mark sieve 
        if (stay) {
            for (let i = increment * 2; i < sieve.length; i += increment) { // O (n / 2)
                sieve[i] = false;
            }
        }
    }
    return primes;
}

// needs a list of primes to search against and the number to use as the initial dividend
// returns a list of prime factorials
function getPrimeFactorials(primes, number) {    // o (logn)
    let factorials = [];
    let dividend = number;

    for (let i = 0; i < primes.length; i++) {
        let divisor = primes[i];
        // exit condition       
        if (dividend === divisor) {
            factorials.push(divisor);
            break;
        }        
        if (dividend % divisor === 0) {            
            factorials.push(divisor);
            dividend = dividend / divisor;
        }
    }    

    return factorials;
}

function getMaxPrimeFactorials(factorials) {
    return Math.max(...factorials);
}

function test(number, expected) {
    let result = findMaxPrimeFactorialFor(number);
    console.log(`We got ${result} and expected ${expected}`);
}

test(13195, 29);
test(600851475143, undefined);
