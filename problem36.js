/*
Double-base palindromes

The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.

Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.

(Please note that the palindromic number, in either base, may not include leading zeros.)
*/

// algorithm
// for k from 1 to x
// if k is palindrome, convert to base 2, if palindrome, sum += k

// runtime analysis o(n). lots of o(n) operations

// time to complete 12 minutes


function isDoubleBasePalindrome(num) { // o(n)
    if (isPalindrome(num)) {
        let asBinary = num.toString(2);
        if (isPalindrome(asBinary)) {
            return true;
        }
    }
    return false;
}

// very javascriptey way to check a palindrome
// slower than using double pointers obviously
function isPalindrome(num) { // reversing is o(n) and joining is o(n) but this is still overall just o(n)
    return num.toString() === [...num.toString()].reverse().join('');
}

function sumDoublePalindromesUpTo(limit) {
    let sum = 0;
    for (let num = 1; num < limit; num++) { // o(n)
        sum += isDoubleBasePalindrome(num) ? num : 0;
    }
    return sum;
}

function runTest(limit, expected) {
    let actual = sumDoublePalindromesUpTo(limit);
    console.log(`From 1 to ${limit} the sum of double palindromic numbers is ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(1000000, 872187);