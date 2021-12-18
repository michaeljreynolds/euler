/*
Special Pythagorean Triplet

A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

a^2 + b^2 = c^2
For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.

*/

// algorithm - we need to try different combinations of numbers for a, b, and c that sum up to 1000
// for each grouping of numbers, check if a^2 + b^2 = c^2
// we can establish some boundaries since we know a < b < c.
// for a = 1 to 998, loop through all values for b that would be > a. Use these to figure out c. 
// if numbers pass a < b < c, then check if they are a pythagorean triplet

// runtime analysis - o(n) * o(n) = o(n^2)
// nested loop means we are exponential runtime



function getProductOfPythagoreanTriplet(sum) {
    let rangeMin = 1;
    let rangeMax = sum - 2;

    for (let a = rangeMin; a <= rangeMax; a++) { // o(n)
        for (let b = a + 1; b <= rangeMax; b++) { // o(n)
            let c = sum - a - b; // c is easy to calculate since we only need to know a and b
            if (a < b && b < c) {
                // check if we have a triplet
                if ((Math.pow(a,2) + Math.pow(b,2)) === Math.pow(c,2)) {
                    let product = a * b * c;
                    console.log(`We found a product of ${product} with ${a}, ${b}, and ${c}` );
                    return product;
                }
            }
        }
    }    
}

function runTest(sum, expected) {
    let actual = getProductOfPythagoreanTriplet(sum);
    console.log(`For a sum ${sum}, the pythagorean triplet product is ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(1000, 31875000);
runTest(12, 60);
runTest(100000, 31875000000000 );