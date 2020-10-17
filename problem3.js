/*
The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the number 600851475143 ?
*/


const primeLimit = 1000000;

function solve(limit) {    
    let primes = generatePrimes(primeLimit);        
    let primeFactors = findPrimeFactors(primes, limit);
    console.log(`prime factors ${primeFactors}`);
    // can use spread operator, instead of apply, as long as array isnt too big
    return Math.max(...primeFactors);
}

// since primeLimit isnt too big we can use the sieve
function generatePrimes(limit) {
    let primes = [];
    let onlyPrimes = [];

    for (let i = 0; i <= limit; i++) {
        primes[i] = true;
    }    

    let increment = 1;        
    let stay = true;
    
    while (stay) {        
        stay = false;        
        for (let i = increment + 1; i < primes.length; i++) {
            if (primes[i] === true) {
                increment = i;
                onlyPrimes.push(increment);
                stay = true;
                break;
            }
        }            
        if (stay) {
            for (let i = increment * 2; i < limit; i += increment) {
                primes[i] = false;
            }
        }        
    }    
    return onlyPrimes;
}

function findPrimeFactors(primes, limit) {    
    let primeFactors = [];          
    let lastIndex = 0;

    let onLastPrime = false;
    let nextLimit = limit;  
    while (!onLastPrime) {        
        for (let i = lastIndex; i < primes.length; i++) {            
            // exit condition
            if (nextLimit === 1) {
                onLastPrime = true;                
                break;
            }

            if (nextLimit % primes[i] === 0) {                
                primeFactors.push(primes[i]);
                nextLimit = nextLimit / primes[i];                                                
                lastIndex = i + 1;                                
                break;
            }
        }
    }    
    return primeFactors;
}




function runTest(limit, expected) {
    let result = solve(limit);
    let passed = result === expected;
    console.log(`Running test for largest prime factor for ${limit}. \n Expecting ${expected}. Got ${result}`);    
    console.log(`Passed ${passed}`);
}

//runTest(20, 5);
runTest(13195, 29);
runTest(600851475143, 6857);