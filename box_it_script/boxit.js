#! /home/nimbus-user/.nvm/versions/node/v17.6.0/bin/node
//Added shbang line in the fisrt line 
//in order to run the script without typing 'node'

function drawLine(n) {
    return '\u2501'.repeat(n)
}

function drawTopBorder(n) {
    return '\u250F' + drawLine(n) + '\u2513'
}

function drawMiddleBorder(n) {
    return '\u2523' + drawLine(n) + '\u252B'
}

function drawBottomBorder(n) {
    return '\u2517' + drawLine(n) + '\u251B'
}

function drawBarsAround(str, extraSpaceAmount) {
    return '\u2503' + str + ' '.repeat(extraSpaceAmount) + '\u2503'
}

function boxIt(arr) {
    let maxLen = 0;
    let result = '';
    if (arr.length === 0) return drawTopBorder(0) + '\n' + '\n' + drawBottomBorder(0);
    if (arr.length === 1) return drawTopBorder(arr[0].length) + '\n' + drawBarsAround(arr[0], 0) + '\n' + drawBottomBorder(arr[0].length);
    for (let str of arr) {
        if (str.length > maxLen) maxLen = str.length
    }
    for (let i = 0; i < arr.length; i++) {
        let extraSpaceAmount = maxLen - arr[i].length;
        if (i === 0) {
            result = result + drawTopBorder(maxLen) + '\n' + drawBarsAround(arr[i], extraSpaceAmount) + '\n' + drawMiddleBorder(maxLen) + '\n'
        } else if (i === arr.length - 1) {
            result = result + drawBarsAround(arr[i], extraSpaceAmount) + '\n' + drawBottomBorder(maxLen)
        } else {
            result = result + drawBarsAround(arr[i], extraSpaceAmount) + '\n' + drawMiddleBorder(maxLen) + '\n'
        }
    }
    return result
}

//Piecing It All Together. 
//Turn your file into a script allowing anyone to use it from the command line as follows:
//$ node boxit.js 'Jon Snow' 'Cersei Lannister' 'Daenerys Targaryen'

let arrForArgv = process.argv.slice(2);
console.log(boxIt(arrForArgv));

//Add support to read CSV files and output the results
//when called as follows: `./boxit.js characters.csv`

const fs = require('fs');
const csv = require('fast-csv');
const data = [];

fs.createReadStream('./characters.csv')
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on('data', row => data.push(row))
    .on('end', () => {
        const arrForCsv = [];
        for (let subArr of data) {
            let newStr = subArr.join(' \u2503 ');
            arrForCsv.push(newStr);
        }
        console.log(boxIt(arrForCsv));
    });
