class Turtle {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.points = [[x, y]];
        this.directions = ['east', 'south', 'west', 'north'];
        this.face = this.directions[0];
    }

    forward(step) {
        let oldX = this.x;
        let oldY = this.y;
        if (this.face == 'east') {
            this.x += step;
            for (let i = 1; i <= step; i++) {
                this.points.push([oldX + i, this.y])
            }
        }
        if (this.face == 'west') {
            this.x -= step;
            for (let i = 1; i <= step; i++) {
                this.points.push([oldX - i, this.y])
            }

        }
        if (this.face == 'south') {
            this.y += step;
            for (let i = 1; i <= step; i++) {
                this.points.push([this.x, oldY + i])
            }
        }
        if (this.face == 'north') {
            this.y -= step;
            for (let i = 1; i <= step; i++) {
                this.points.push([this.x, oldY - i])
            }
        }
        return this;
    }

    right() {
        const idx = this.directions.indexOf(this.face);
        if (this.directions[idx + 1]) {
            this.face = this.directions[idx + 1]
        } else {
            this.face = this.directions[0]
        }
        return this;
    }

    left() {
        const idx = this.directions.indexOf(this.face);
        if (this.directions[idx - 1]) {
            this.face = this.directions[idx - 1]
        } else {
            this.face = this.directions[this.directions.length - 1]
        }
        return this;
    }

    allPoints() {
        return this.points;
    }

    print() {
        let landArr = [];
        let maxY = -Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let minX = Infinity;

        for (let point of this.points) {
            if (point[1] > maxY) maxY = point[1];
            if (point[0] > maxX) maxX = point[0];
        };

        for (let point of this.points) {
            if (point[1] < minY) minY = point[1];
            if (point[0] < minX) minX = point[0];
        };

        for (let i = 1; i <= maxY - minY + this.initialY + 1; i++) {
            landArr.push(' '.repeat(maxX - minX + this.initialX + 1).split(''))
        };

        for (let i = minY; i <= maxY; i++) {
            for (let point of this.points) {
                if (point[1] == i) {
                    landArr[i][point[0]] = '\u25CF'
                }
            }
        }

        let resultStr = '';
        for (let line of landArr) {
            resultStr = resultStr + line.join(' ') + '\n';
        }
        return console.log(resultStr);
    }

}

const jakie = new Turtle(0, 0).forward(5).right().forward(5).right().forward(5).right().forward(5);
console.log(jakie.allPoints());
jakie.print();

const mira = new Turtle(0, 4);
mira.forward(3)
    .left()
    .forward(3)
    .right()
    .forward(5)
    .right()
    .forward(8)
    .right()
    .forward(5)
    .right()
    .forward(3)
    .left()
    .forward(3);
console.log(mira.allPoints());
mira.print();

const flash = new Turtle(0, 4).forward(3).left().forward(3);
console.log(flash.allPoints());
flash.print();

// The code below made the program usable as a script.

const command = process.argv[2];
const commandArr = command.split('-');
let newTurtle = new Turtle(0, 0);
for (let singleCommand of commandArr) {
    if (singleCommand[0] == 't') {
        newTurtle = new Turtle(parseInt(singleCommand[1]),parseInt(singleCommand[3]))
    }
    if (singleCommand[0] == 'f') {
        newTurtle.forward(parseInt(singleCommand.slice(1)))
    }
    if (singleCommand[0] == 'r') {
        newTurtle.right()
    }
    if (singleCommand[0] == 'l') {
        newTurtle.left()
    }
}

newTurtle.print();