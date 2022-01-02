/*
Reciprocal Cycles

A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:

1/2	= 	0.5
1/3	= 	0.(3)
1/4	= 	0.25
1/5	= 	0.2
1/6	= 	0.1(6)
1/7	= 	0.(142857)
1/8	= 	0.125
1/9	= 	0.(1)
1/10	= 	0.1
Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.

Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.

*/

// algorithm
// js doesnt have enough precision so we need to calculate numbers after the decimal
// using good old fashioned long division
// create a hash and array. hash contains our remainders as key and a counter as value (to keep track of index)
// per operation, add result to array and hash the remainder along with its index
// before starting a new operation, check if last remainder is in the hash
// if it is - we are done.
// to get length of our repeating digits, use the remainders hash value as the index to start. 
// grab digits from start to end of array
// if a remainder is 0, we are done and there are no repeating digits. Return 0

// runtime analysis
// double loop
// o(n^2)

function getRepetendLengthOf(y) { // num is 9 10, 11, etc, 101, 102
    let hash = {};
    let arr = [];
    let arrIndex = 0;
    let x = 1;
    let num = y;
    // to start long division, lets add 0s until our numerator is greater than our denonminator
    let zeroes, dividend;
    while (hash[x] === undefined && x !== 0) { // this can run up to n times
        zeroes = 0;
        hash[x] = arrIndex;        
        arrIndex++;                
        while (x < y) { // runs significantly less than n times
            if (zeroes > 0) {
                arr.push(0);
            }
            x *= 10;
            zeroes++;
        }                
        dividend = Math.floor(x / y);
        arr.push(dividend);                
        x = x % y;                        
    }    
    let result = arr.slice(hash[x]);    

    let pretty = x === 0 ?
    `1/${num} L=${result.length} 0.${result.join('')}` :
    `1/${num} L=${result.length} 0.${arr.slice(0, hash[x]).join('')}(${result.join('')})`;        
    console.log(pretty);

    return result.length;
}

function getLongestRepetendCycleUpTo(limit) {
    let d = 0;    
    let max = 0;    
    let repetendLength;
    for (let i = 2; i < limit; i++) { // o(n)
        repetendLength = getRepetendLengthOf(i); // o(n)
        if (max < repetendLength) {
            max = repetendLength;
            d = i;
        }
    }
    return d;
}

function runTest(limit, expected) {
    let actual = getLongestRepetendCycleUpTo(limit);
    console.log(`THe longest recurring cycle from 1 to ${limit} is at ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(1000, 983)
