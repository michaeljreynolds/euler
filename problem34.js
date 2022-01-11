/*
Digit Factorials

145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

Find the sum of all numbers which are equal to the sum of the factorial of their digits.

Note: As 1! = 1 and 2! = 2 are not sums they are not included.
*/

// algorithm
// write a memoized factorial funcion
// start at n from n = 1 to limit
// for every n, compute the sum of its digits factorialized
// if sum === n, add to running sum
// return running sum

// runtime analysis
// o(n) + o(k) = o(nk) => o(n)


let hash = {}
function factorial(n) { // o(n) since we memoized
    if (hash[n] !== undefined) {
        return hash[n];
    }        
    if (n <= 1) {        
        return hash[n] = 1;
    }
    return hash[n] = n * factorial(n - 1);
}

function getSumOfDigitFactorials(n) {    
    return [...n.toString()].map(x => factorial(parseInt(x, 10))).reduce((prev, curr) => prev + curr);
}

function getSumOfAllDigitFactorials(limit) {
    let sum = 0;    
    let nums = [];
        
    for (let i = 1; i < limit; i++) { // o(n)
        let sumFactorialDigits = getSumOfDigitFactorials(i); // o(k)            
            if (sumFactorialDigits === i && i !== 1 && i !== 2) {
                sum += i;
                nums.push(i);
            }
    }
    console.log(nums);
    return sum;
}

function runTest(limit, expected) {
    let actual = getSumOfAllDigitFactorials(limit);
    console.log(`Up to ${limit} the sum of all digit factorials is ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(1000000, 40730);
