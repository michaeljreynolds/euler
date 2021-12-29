/*
Non-abundant sums

A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.

*/

// algorithm
// calculate (find divisors) D (deficient), P (perfect), or A (abundant) for numbers 1 through 28123 (double loop)
// filter out a list of A
// Start at index i, check sum from i + 1 to length - 1 of. insert sum into a hash (double loop)
// loop through all D, P, and A, if not in hash add to running sum
// return running sum

// runtime analysis
// lots of double loops
// 

function calculateNumberStatus() {
    let statusOf = [];
    statusOf.push({ num: 0, status: 'U'});
    statusOf.push({ num: 1, status: 'U'});
    
    let divisors = [];
    let counter = 1;
    let divisorSum = 0;
    for (let num = 2; num <= 28123; num++) { // o(n^2)
        counter = 1;
        divisors = [];
        while (counter < num) {
            if (num % counter === 0) {
                divisors.push(counter);
            }
            counter++;
        }
        divisorSum = divisors.reduce((prev, curr) => prev + curr);
        if (divisorSum === num) {
            statusOf.push({
                num,
                status: 'P'
            });
        } else if (divisorSum < num) {            
            statusOf.push({
                num,
                status: 'D'
            });
        } else {            
            statusOf.push({
                num,
                status: 'A'
            });
        }
    }
    return statusOf;
}

function getSumWhenNotTwoAbundantNumbers() {
    let hash = {};
    let sum = 1;
    let statusOf = calculateNumberStatus();        
    let abundant = statusOf.filter((row) => row.status === 'A'); // o(n)
    
    let num1 = 0;
    let num2 = 0;
    for (let i = 0; i < abundant.length; i++) { // hash sums of two abundant numbers so we dont count later o(n^2)
        num1 = abundant[i].num;
        for (let j = 0; j < abundant.length; j++) {
            num2 = abundant[j].num;
            if (hash[num1 + num2] === undefined) {
                hash[num1 + num2] = true;
            }            
        }
    }

    for (let i = 2; i < statusOf.length; i++) { // o(n)        
        if (hash[statusOf[i].num] === undefined) { // dont count sums in hash
            sum += statusOf[i].num;
        }
    }

    console.log(hash);
    console.log(statusOf);    
    console.log(abundant);
    return sum;
}

function runTest(expected) {
    let actual = getSumWhenNotTwoAbundantNumbers();
    console.log(`We got ${actual} and expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(4179871);


