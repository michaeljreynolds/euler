/*
Maximum Path Sum 1


By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

3
7 4
2 4 6
8 5 9 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom of the triangle below:

75
95 64
17 47 82
18 35 87 10
20 04 82 47 65
19 01 23 75 03 34
88 02 77 73 07 63 67
99 65 04 28 06 16 70 92
41 41 26 56 83 40 80 70 33
41 48 72 33 47 32 37 16 94 29
53 71 44 65 25 43 91 52 97 51 14
70 11 33 28 77 73 17 78 39 68 17 57
91 71 52 38 17 14 91 43 58 50 27 29 48
63 66 04 68 89 53 67 30 73 16 69 87 40 31
04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

NOTE: As there are only 16384 routes, it is possible to solve this problem by trying every route. However, Problem 67, is the same challenge
with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method! ;o)

*/

// algorithm
// step1) start at the bottom of the triangle and loop through the row
// step2) turn each value into the root of a tree. this is level 0
// step3) go up a level until we hit the top of the triangle
///////// for each level, add left and right children to tree as applicable
///////// keep track of level in children as we go
//////// children values are value in triangle + parents value. this way we keep a running sum
//step4) whenever we increment running sum, check against maxsum

let smallTriangleAsString = '03 07 04 02 04 06 08 05 09 03';
let bigTriangleAsString = '75 95 64 17 47 82 18 35 87 10 20 04 82 47 65 19 01 23 75 03 34 88 02 77 73 07 63 67 99 65 04 28 06 16 70 92 41 41 26 56 83 40 80 70 33 41 48 72 33 47 32 37 16 94 29 53 71 44 65 25 43 91 52 97 51 14 70 11 33 28 77 73 17 78 39 68 17 57 91 71 52 38 17 14 91 43 58 50 27 29 48 63 66 04 68 89 53 67 30 73 16 69 87 40 31 04 62 98 27 23 09 70 98 73 93 38 53 60 04 23';

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

function Node(data) {
    this.value = data;
    this.left = null;
    this.right = null;
}

function getMaximumTotal(triangle) {
    let table = convertTriangleToArray(triangle);    
    let lastRowIndex = table.length - 1;    

    let level = 0;
    let maxSum = 0;

    let cell, tree, queue;

    let next, notAtRoot, hasLeftChild, hasRightChild;

    let value;

    for (let column = 0; column < table[lastRowIndex].length; column++) {
        cell = table[lastRowIndex][column];        
        tree = new Node(cell);
        queue = [];                
        queue.push({
            level: level,
            tree: tree,
            column: column
        });
        while (queue.length > 0) {
            next = queue.pop();
            notAtRoot = lastRowIndex - next.level > 0; 
            hasLeftChild = next.column > 0;
            hasRightChild = next.column < table[lastRowIndex - next.level].length - 1;
            
            if (notAtRoot) { 
                if (hasLeftChild) {                    
                    value = next.tree.value + table[lastRowIndex - next.level - 1][next.column - 1];
                    next.tree.left = new Node(value);        
                    if (next.tree.left.value > maxSum) {
                        maxSum = next.tree.left.value;
                    }
                    queue.push({
                        level: next.level + 1,                
                        column: next.column - 1,            
                        tree: next.tree.left
                    });              
                } 
                if (hasRightChild) {
                    value = next.tree.value + table[lastRowIndex - next.level -1][next.column];
                    next.tree.right = new Node(value);
                    if (next.tree.right.value > maxSum) {
                        maxSum = next.tree.right.value;
                    }                        
                    queue.push({
                        level: next.level + 1,          
                        column: next.column,              
                        tree: next.tree.right
                    });
                    
                }                                                          

            }
        }                        
    }    

    return maxSum
}

function runTest(triangle, expected) {
    let actual = getMaximumTotal(triangle);
    console.log(`For a triangle of shape ${triangle} we got a maximum total of ${actual} and expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(smallTriangleAsString, 23);
runTest(bigTriangleAsString, 1074);