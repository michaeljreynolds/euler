/*
Number Spiral Diagonals

Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:

21 22 23 24 25
20  7  8  9 10
19  6  1  2 11
18  5  4  3 12
17 16 15 14 13

It can be verified that the sum of the numbers on the diagonals is 101.

What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?
*/

// algorithm
// Here's the pattern for 5x5 - go right 1, go down 1, go left 2, go up 2, go right 3, go down 3, go left 4, go up 4, go right 4
// set up a direction array that can be cycled through
// dont need a 2d array or anything special, we just need to keep the proper loop counters
// keep track of the direction because going right counts the num - 1 as the diagonal
// otherwise, whenever we start a new direction, the number we are on is a diagonal
// last spiral is special since the last direction stops size - 1 short

// runtime analysis
// o(nlogn) I don't think this is quite o(n^2) since we dont have full o(n) * o(n) nested loops. Both inner loops have constraints.


function sumSpirals(size) {
    let index = 1;
    let sum = 0;
    let num = 1;
    let directionsPointer = 0;        
    let diagonals = [];

    const directions = [0, 1, 2, 3];    

    let lastSpiral, limit;
    while (index < size) { // 0(n)
        lastSpiral = index === size - 1;
        limit = lastSpiral ? 3 : 2;
        
        for (let i = 0; i < limit; i++) { // O(1) since limit is constant
            for (let j = 0; j < index; j++) {  // o(nlogn) runs in o(n) + o(n - 1) + o(n - 2) => o(nlogn)
                num++;
            }
            if (!lastSpiral && directionsPointer === 0) {
                sum += num - 1;
                diagonals.push(num - 1);
            } else {
                sum += num;
                diagonals.push(num);
            }
            directionsPointer = directionsPointer + 1 < directions.length ? directionsPointer + 1 : 0;                
        }
        index++;
    }
    //console.log(diagonals.join(' '))
    return sum;
}

function runTest(size, expected) {
    let actual = sumSpirals(size);
    console.log(`For a ${size} by ${size} grid, the sum of the diagonals is ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

//runTest(5, 101);
runTest(100001, 669171001);