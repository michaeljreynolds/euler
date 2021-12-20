/*
Longest Collatz sequence

The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:

13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

Which starting number, under one million, produces the longest chain?

NOTE: Once the chain starts the terms are allowed to go above one million.

*/

// algorithm
// step1) check every number from 1 to 1 million
// step2) run collatz sequence and keep track of max terms
// step3) return max terms
// optimizations - keep a hash of terms we've already calculated
// this is a bottoms up approach to calculating longest collatz sequence
// we use a hash to memoize the results and this significantly speeds up the calculations

// runtime analysis - nested loops means o(n) * o(m) = o(n * m)
// as n increases, the calculation required for m is reduced further and further into O(1) lookups in the hash. O(1) + O(1) + .... -> O(1)

function getLongestChainUnder(number) {    
    let startingNumber = 2;
    let currentNumber = 0;
    let currentSequence = [];
    let memoize = [];
    let max = 0;
    let maxStartingNumber = 0;
    let hold = 0;

    while (startingNumber < number) { // o(n)

        currentSequence = [];
        currentNumber = startingNumber;
        currentSequence.push(currentNumber);

        while (currentNumber !== 1) { // o(m)
            if (currentNumber % 2 === 0) {
                if (memoize[currentNumber] === undefined) {
                    hold = currentNumber;
                    currentNumber = currentNumber / 2;                    
                    memoize[hold] = currentNumber;
                } else {
                    currentNumber = memoize[currentNumber];
                }                                
            } else {
                if (memoize[currentNumber] === undefined) {
                    hold = currentNumber;                    
                    currentNumber = (3 * currentNumber) + 1;
                    memoize[hold] = currentNumber;
                } else {
                    currentNumber = memoize[currentNumber];
                }                
            }
            currentSequence.push(currentNumber);
        }        
        // check for max
        if (max < currentSequence.length) {
            max = currentSequence.length;
            maxStartingNumber = startingNumber;
        }
        startingNumber++;
    }
    return maxStartingNumber;    
}

function runTest(number, expected) {
    let actual = getLongestChainUnder(number);
    console.log(`The starting number with the longest chain under ${number} is ${actual}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(1000000, 837799);
