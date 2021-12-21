/*
Number Letter Counts

If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?


NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
*/

// algorithm
// step1) Fill out initial table of english spellings of numbers eg 1 - 20, tens, hundreds, and thousands
// step2) New letters are calculated using previous spellings of numbers eg letters[35] = letters[30] + ' ' + letters[5]
// step3) Once we have calculted spelling of a number, trim spaces and add length to sum

// runtime analysis // o(n) * (o(1) + o(1) + o(i)) = o(n * 1) = o(n)

let letters = {};

function initLetters() {
    letters[1] = "one";
    letters[2] = "two";
    letters[3] = "three";
    letters[4] = "four";
    letters[5] = "five";
    letters[6] = "six";
    letters[7] = "seven";
    letters[8] = "eight";
    letters[9] = "nine";    

    letters[11] = "eleven";
    letters[12] = "twelve";
    letters[13] = "thirteen";
    letters[14] = "fourteen";
    letters[15] = "fifteen";
    letters[16] = "sixteen";
    letters[17] = "seventeen";
    letters[18] = "eighteen";
    letters[19] = "nineteen";

    letters[10] = "ten";
    letters[20] = "twenty";
    letters[21] = letters[20] + ' ' + letters[1];
    letters[30] = "thirty";
    letters[31] = letters[30] + ' ' + letters[1];
    letters[40] = "forty";
    letters[50] = "fifty";
    letters[60] = "sixty";
    letters[70] = "seventy";
    letters[80] = "eighty";
    letters[90] = "ninety";

    letters[100] = "one hundred";
    letters[200] = "two hundred";
    letters[300] = "three hundred";
    letters[400] = "four hundred";
    letters[500] = "five hundred";
    letters[600] = "six hundred";
    letters[700] = "seven hundred";
    letters[800] = "eight hundred";
    letters[900] = "nine hundred";    
    letters[1000] = "one thousand";
}

function sumLetters(range) {        
    let tens = 10;
    let hundreds = 100;
    let sum = 0;

    for (let i = 1; i <= range; i++) { // o(n)
        if (letters[i] === undefined) {
            if (i < hundreds) {
                letters[i] = letters[parseInt((i / tens), 10) * tens] + ' ' + letters[i % tens]; // o(1)            
            } else {
                letters[i] =letters[parseInt((i / hundreds), 10) * hundreds] + ' and ' + letters[i % hundreds]; // o(1)
            }            
        }        
        sum += parseInt(letters[i].replaceAll(' ', '').length, 10); // replace all will have to loop through the size of i // o(i)        
    }    
    return sum;
}

function runTest(range, expected) {
    let actual = sumLetters(range);
    console.log(`Spelling out numbers from 1 to ${range} results in ${actual} letters while we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

initLetters();

runTest(5, 19);
runTest(1000, 21124);
