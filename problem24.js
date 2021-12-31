/*
Lexicographic Permutations

A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

012   021   102   120   201   210

What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
*/

// algorithm
// use Heaps Algorithm to generate all list of permutations
// this algorithm uses a decrease and conquer strategy
// sort results
// go to 1000000th index

function heapPermutation(array, size, n) {
    if (size === 1) {
        //console.log(array);
        length++;
    }

    for (let i = 0; i < size; i++) {
        heapPermutation(array, size - 1, n);
        if (size % 2 === 1) {
            let temp = array[0];
            array[0] = array[size - 1];
            array[size - 1] = temp;
        } else {
            let temp = array[i];
            array[i] = array[size - 1];
            array[size - 1] = temp;
        }
    }
}
let a = [1,2,3,4,5];
//heapPermutation(a, a.length, a.length);

// non recursive version of heaps algorithm
function generate(n, a) {
    let results = [];
    let c = [];
    
    let i;    
    for (i = 0; i < n; i++) {
        c[i] = 0;
    }
    
    results.push(a.join(''));
    
    i = 0;    
    while (i < n) {
        if (c[i] < i) {
            if (i % 2 === 0) {
                let temp = a[0];
                a[0] = a[i];
                a[i] = temp;
            } else {
                let temp = a[c[i]];
                a[c[i]] = a[i];
                a[i] = temp;
            }
            results.push(a.join(''));
            c[i] += 1;      
            i = 0;      
        } else {
            c[i] = 0;
            i += 1;
        }
    }
    console.log(results);
    return results;
}
let permutations = generate(10, [0,1,2,3,4,5,6,7,8,9]);
permutations.sort();
console.log(permutations);
console.log(permutations[999999]);