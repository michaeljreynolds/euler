/*
Names Score

Using names.txt (right click and 'Save Link/Target As...'), a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.

For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.

What is the total of all the name scores in the file?
*/

// algorithm
// read names into an array
// sort array into alphabetical order
// loop through array
// for each name, sum letter counts and multiply by index + 1 (position).
// add product to a running sum
// return sum

// runtime analysis
// reading list of names runs in o(n)
// sorting lists of names runs in o(nlogn) assuming average case and a quick sort implementation
// calculating score requires a split, map, and reduce which all run in o(n) time which equals o(3n) = o(n)
// o(n) + o(nlogn) + o(3n) = o(nlogn)

let openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      let names = reader.result.replaceAll("\"", "").split(",");
      runTest(names, 871198282 );      
    };
    reader.readAsText(input.files[0]);
};

let letters = {
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 4,
    "E": 5,
    "F": 6,
    "G": 7,
    "H": 8,
    "I": 9,
    "J": 10,
    "K": 11,
    "L": 12,
    "M": 13,
    "N": 14,
    "O": 15,
    "P": 16,
    "Q": 17,
    "R": 18,
    "S": 19,
    "T": 20,
    "U": 21,
    "V": 22,
    "W": 23,
    "X": 24,
    "Y": 25,
    "Z": 26    
}

function getSumOfNameScores(names) {    
    names.sort();
    let name;
    let sum = 0;
    let product = 0;
    let nameScore = 0;
    for (let index = 0; index < names.length; index++) {
        name = names[index];
        nameScore = name.split('').map(letter => letters[letter]).reduce((prev, curr) => prev + curr);
        product = nameScore * (index + 1);
        sum += product;
    }
    return sum;
}

function runTest(names, expected) {
    let actual = getSumOfNameScores(names);
    console.log(`For a list of names we got a sum of ${actual} and expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}