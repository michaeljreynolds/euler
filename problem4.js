/*
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.
*/

// find a palindrome based off of two digit multiplication
// 10 * 10, 10 * 11, 10 * 12, 10 * 13
// x * x, x * (x+1), x * (x+2) etc


// algorithm - using 3 digit numbers, compute the product
// check if product is a palindrome
// if it is, check against current max
// return max at end

// runtime analysis -> o(n) * (o(n) + o(1)) = o(n) * o(n) = O(n^2)
// not great runtime, but runs fast enough for 3 digit numbers. 4 digit numbers takes a noticeably longer time, but still runnable.

function solve() {
    let multiplicand = 999;
    let multiplier = 999;
    let minRange = multiplier / 10; // knocks a digit off

    let product = 0;    
    let max = 0;    
    for (let i = multiplicand; i > minRange; i--) { // o(n)
        for (let j = multiplier; j > minRange; j--) { // o(n)
            product = i * j;            
            if (isPalindrome(product)) { 
                console.log(`We found a palindrome ${product} from the two factors ${i} and ${j}`);
                max = product > max ? product : max;                
            }
        }
    }
    console.log(`The max palindrome is ${max}`);
    return max;
}

// fun js way to check palindrome. convert number to string then array and compare to a reversed version
function isPalindrome(number) {                
    return number.toString() === number.toString().split('').reverse().join('');
}

solve();

