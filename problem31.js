/*
Coin Sums

In the United Kingdom the currency is made up of pound (£) and pence (p). There are eight coins in general circulation:

1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), and £2 (200p).
It is possible to make £2 in the following way:

1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
How many different ways can £2 be made using any number of coins?
*/

// algorithm - this is a classic dynamic programming problem. A version of the unbounded knapsack problem
// We want to build our answer up bottom up so at the end we can grab the value at dp[num] as our number of coin combinations to make num
// dp[j] += dp[j - coins[i]] is the key here
// this keeps track of our current amount of combinations for every value 0 to num. 

// time to complete - 30 min + 20 min research on DP coin algorithms, bottoms up approach practice, different DP problems.

let dp = new Array(10000).fill(BigInt(0));
dp[0] = BigInt(1); // base case

function coin(coins, num) {    
    for (let i = 0; i < coins.length; i++) {
        for (let j = 0; j <= num; j++) {
            if (coins[i] <= j) {
                dp[j] += dp[j - coins[i]];
            }
        }
    }        
    return dp[num];
}

function runTest(coins, num, expected) {
    let actual = coin(coins, num);
    console.log(`We got ${actual} and expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest([1,2,5,10,20,50,100,200], 200, BigInt(73682));