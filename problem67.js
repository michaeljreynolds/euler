/*
Maximum path sum II

By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

3
7 4
2 4 6
8 5 9 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom in triangle.txt (right click and 'Save Link/Target As...'), a 15K text file containing a triangle with one-hundred rows.

NOTE: This is a much more difficult version of Problem 18. It is not possible to try every route to solve this problem, as there are 299 altogether! If you could check one trillion (1012) routes every second it would take over twenty billion years to check them all. There is an efficient algorithm to solve it. ;o)

// algorithm - 2 or 3 hours of straight thinking how to speed this up. divide and conquer problem
// step1) go to each cell
// step2) for each cell, rewrites its value as the current value + either its left or right adjacent neighbor above it. this is the new max sum for this path
// step3) check each of these rewrites against the global max sum

// runtime analysis o(n * m) = o(nm) = o(n) we visit each node in the grid once. column length varies proportionally to the row we are on, increasing as we go down the grid

*/
var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      let triangle = reader.result.replaceAll('\n', ' ').replaceAll('\r', '');
      runTest(triangle, 7273);      
    };
    reader.readAsText(input.files[0]);
  };
  
function convertTriangleToArray(triangle) {
    let table = [];
    let pointer = 0;
    let rowSize = 1;
    let temp = [];

    while (pointer < triangle.length) {
        let current = triangle.substring(pointer, pointer + 2);
        if (current !== ' ') {
            temp.push(parseInt(current, 10));
        }        
        if (temp.length === rowSize) {
            rowSize++;
            table.push(temp);
            temp = [];
            
        }
        pointer += 3;
    }

    return table;
}

function getMaximalSum(triangle) {
    let table = convertTriangleToArray(triangle);
    let max = 0;    
    for (let row = 1; row < table.length; row++) {
        for (let column = 0; column < table[row].length; column++) {
            let cell = table[row][column];
            let left = undefined;
            let right = undefined;

            if (column - 1 >= 0) {
                left = table[row - 1][column - 1];
            }
            if (column < table[row - 1].length) {
                right = table[row - 1][column];
            }                    
            
            if (left && right) {
                if (left > right) {
                    table[row][column] = left + cell;                    
                } else {
                    table[row][column] = right + cell;
                }
            } else if (left) {
                table[row][column] = left + cell;
            } else if (right) {
                table[row][column] = right + cell;
            }

            if (table[row][column] > max) {
                max = table[row][column]
            }            
        }
    }
    console.log(table);
    console.log(`max sum is ${max}`);
    return max;
}

function runTest(triangle, expected) {
    let actual = getMaximalSum(triangle);
    console.log(`For a triangle of shape ${triangle} we got a maximum total of ${actual} and expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}