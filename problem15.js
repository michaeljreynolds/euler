/*
Lattice Path

Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.


How many such routes are there through a 20×20 grid?

*/

// algorithm
// step1) for each point, we can calculate how many paths get there by counting the paths above it and to the left
// step2) return bottom right number in grid

function initGrid(size) {
    let grid = [];
    let temp = [];
    for (let row = 0; row <= size; row++) {        
        temp = [];
        for (let column = 0; column <= size; column++) {
            temp.push(0);
        }
        grid.push(temp);
    }
    return grid;
}

function calculateRoutesToBottom(size) {
    let grid = initGrid(size);    
    // assign path values
    for (let row = 0; row <= size; row++) {                
        for (let column = 0; column <= size; column++) {
            if (column === 0 || row === 0) {
                grid[row][column] = 1;
            } else {
                grid[row][column] = grid[row - 1][column] + grid[row][column -1];
            }
        }        
    }
    return grid[size][size];
}

function runTest(size, expected) {
    let actual = calculateRoutesToBottom(size);
    console.log(`For a grid of ${size} we got ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(1, 2);
runTest(2, 6);
runTest(3, 20);
runTest(4, 70); 
runTest(20, undefined); 