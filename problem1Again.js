/*
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.
*/

// algorithm
// A natural number has no decimal point.
// Compute multiples of 3 and 5 below a certain number (1000)
// Keep a running sum of multiples found and ouput at end

// returns an array of multiples
// runtime complexity analysis is O(n) + O(n) + O(n) -> O(3n) -> O(n)
function sumMultiples(limit) {
    console.log('Finding multiples ');    
    let multiples = [];
    let multiple = 3;
    let sum = 0;
    while (multiple < limit) { // O(n / 3) -> O(n)
        multiples.push(multiple);
        multiple += 3;
    }
    multiple = 5;
    while (multiple < limit) { // O(n / 5) -> O(n)
        // only push if we havent done so already
        // this could be improved with a hash lookup this is O(n) lookup currently
        if (multiples.indexOf(multiple) === -1) {
            multiples.push(multiple);
        }
        multiple += 5;
    }
    console.log(`The multiples for a limit of ${limit} are ${multiples}`)
    for (let i = 0; i < multiples.length; i++) { // O(n)
        sum += multiples[i];
    }
    console.log(`The sum for a limit of ${limit} is ${sum}`);
    return sum;
}

sumMultiples(10); // 23
sumMultiples(15);  // 3,5,6,9,10,12 should be 45
sumMultiples(1000);

