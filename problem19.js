/*
Counting Sundays

You are given the following information, but you may prefer to do some research for yourself.

1 Jan 1900 was a Monday.
Thirty days has September,
April, June and November.
All the rest have thirty-one,
Saving February alone,
Which has twenty-eight, rain or shine.
And on leap years, twenty-nine.
A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

*/

// algorithm
// I only need to make some loops that will go through each day for my given time range
// If a given day is a sunday and it is on the first of the month and the year is between 1901 - 2000, we increment our running total
// Year and month dates stay the same, but days differ per month
// Calculate days based off of month and leap year status

// runtime analysis is o(y) * o(m) * o(d) where y=year m =month and d=day. so we have o(ymd) = o(n) linear

let weekdays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
];

function getNumberOfSundaysOnFirstOfMonth() {        
    let sundaysOnFirstOfMonth = 0;        
    let count = 0;
    for (let year = 1900; year <= 2000; year++) { // o(y)
        for (let month = 1; month <= 12; month++) { // o(m)
            // find out how many days this month
            let days = 31;

            // ez
            if (month === 9 || month === 4 || month === 6 || month === 11) {
                days = 30;
            }
            // leap year 
            if (month === 2) {
                if (year % 4 === 0 && year !== 1900) {
                    days = 29;
                } else {
                    days = 28;
                }
            }
            
            for (let day = 1; day <= days; day++) { // o(d)
                if (weekdays[count] === "sunday" && day === 1 && year !== 1900) {
                    sundaysOnFirstOfMonth++;
                }
                //console.log(`It is ${weekdays[count]} ${day} ${month} ${year}`);
                count = count + 1 <= weekdays.length - 1 ? count + 1 : 0; // cycle through weekdays
            }
        }
    }
    return sundaysOnFirstOfMonth;
}

function runTest(expected) {
    let actual = getNumberOfSundaysOnFirstOfMonth();
    console.log(`The amount of sundays that fell on the first of the month from 1901 to 2000 was ${actual} and we expected ${expected}`);
    console.log(`Passes? ${actual === expected}`);
}

runTest(171);