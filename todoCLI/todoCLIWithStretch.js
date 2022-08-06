const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">"
})


const toDoMenu = '(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit';
const toDoListArr = [];

function view() {
    if(toDoListArr.length < 1) console.log('List is empty...');
    console.log(toDoListArr.join('\n'));
    console.log(toDoMenu);
}

function create(task) {
    toDoListArr.push(`${toDoListArr.length} [] ${task}`);
    console.log(toDoMenu);
}

function complete(index) {
    toDoListArr[index] = toDoListArr[index].replace('[]', '[✓]');
    console.log(`Completed "${toDoListArr[index].split(']')[1]}"`);
    console.log(toDoMenu);
}

function remove(index) {
    console.log(`Deleted "${toDoListArr[index].split(']')[1]}"`);
    toDoListArr.splice(index, 1);
    //decrease the order number for all taskes following the deleted one.
    for (let i = index; i < toDoListArr.length; i++) {
        toDoListArr[i] = toDoListArr[i].replace(/^\d+/, function(n){ return --n })
    }
    console.log(toDoMenu);
}

function save(fileName){
    const newArr = [];
    toDoListArr.map((item) => {
        let itemObj = {};
        itemObj.completed = item.includes('[✓]') ? true : false;
        itemObj.title = item.split(']')[1];
        newArr.push(itemObj);
    })
    const newJsonStr = JSON.stringify(newArr);
    fs.writeFile(fileName, newJsonStr, (err) => {
        if (err) {
            console.log('Something went wrong.', err)
        } else {
            console.log(`List saved to "${fileName}"`);
            console.log(toDoMenu);
        }
    })
}

function quit(){
    console.log('See you soon! 😄')
}


console.log('Welcome to Todo CLI!\n--------------------\n' + toDoMenu);
rl.prompt();

rl.on("line", (line) => {
    if (line == 'v') {
        view();
        rl.prompt();
    };

    if (line == 'n') {
        rl.question('What?\n>', (answer) => {
            create(answer);
            rl.prompt();
        });
    }

    if (line.startsWith('c')) {
        const idx = line.slice(1);
        complete(idx);
        rl.prompt();
    }

    if (line.startsWith('d')) {
        const idx = line.slice(1);
        remove(idx);
        rl.prompt();
    }

    if(line == 's') {
        rl.question('Where?\n>', (answer) => {
            if (answer) {
                save(answer);
                rl.prompt();
            } else {
                //If user provide the initial to-do-list file to read, it will be the file to write to. If not, the defaulf file to write to will be 'myTodos.json'.
                save(process.argv[2] || 'myTodos.json');
                rl.prompt();
            }
        });
    }
    
    if (line == 'q') {
        quit();
        rl.close();
    }  
})

//Add support to load a todo list from a JSON file as an argument

if(process.argv[2]) {
    const jsonFile = process.argv[2];
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) {
            console.log('Failed.')
        } else {
            let start = 0;
            JSON.parse(data).map((item) => {
                toDoListArr.push(`${start} ${item.completed == true? '[✓]' : '[]'} ${item.title}`);
                start++;
            })
        }
    })
}