//my homework
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

console.log(boxIt(['Jon Snow', 'Cersei Lannister']))