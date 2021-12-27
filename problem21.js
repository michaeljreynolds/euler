/*
Amicable Numbers

Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.
*/

// algorithm
// calculate d(n) from n = 1 to n = 10,000
// loop again from n =1 to n = 10,000
// if d(n) is not in hash
// d(a) = b, if d(b) = a and a !== b we have amicable numberfs a and b. Sum += a + b.
// For each pair of amicable numbers, we can hash a and b so we dont double count

// runtime analysis
// runs in o(n^2) for filling out d(n)
// runs in o(n) for finding amicable numbers as this requires one iteration through d
// o(n^2) + o(n) = o(n^2)

function getSumOfAmicableNumbers(num) {
    let d = {
        0: 0,
        1: 0
    };
    
    for (let i = 2; i < num; i++) { // this has worst runtime, o(n^2)
        d[i] = getDivisors(i).reduce((prev, curr) => prev + curr);
    }

    let cache = {};
    let sum = 0;
    for (let num in d) { // o(n)
        let a = parseInt(num, 10);
        let b = d[a];
        if (cache[a] === undefined) {
            if (d[b] === a && b !== a) {
                sum += a;
                sum += b;                                       
                cache[a] = true;
                cache[b] = true;
            }
        }        
    }
    return sum;
}

function getDivisors(num) {
    let divisors = [];
    let count = 1;
    while (count < num) {
        if (num % count === 0) {
            divisors.push(count);
        }
        count++;
    }
    return divisors;
}

function runTest(num, expected) {
    let actual = getSumOfAmicableNumbers(num);
    console.log(`From 1 to ${num} the sum of the amicable numbers are ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`)
}

runTest(10000, 31626);