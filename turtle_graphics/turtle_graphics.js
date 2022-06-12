class Turtle {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.points = [];
        this.directions = ['east', 'south', 'west', 'north'];
        this.face = this.directions[0];
    }
    
    forward(step){
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
            this.y -= step;
            for (let i = 1; i <= step; i++) {
                this.points.push([this.x, oldY - i])
            }
        }
        if (this.face == 'north') {
            this.y += step;
            for (let i = 1; i <= step; i++) {
                this.points.push([this.x, oldY + i])
            }
        }
        return this;
    }

    right(){
        const idx = this.directions.indexOf(this.face);
        if (this.directions[idx + 1]) {
            this.face = this.directions[idx + 1]
        } else {
            this.face = this.directions[0]
        }
        return this;
    }

    left(){
        const idx = this.directions.indexOf(this.face);
        if (this.directions[idx - 1]) {
            this.face = this.directions[idx - 1]
        } else {
            this.face = this.directions[this.directions.length - 1]
        }
        return this;
    }

    allPoints(){
        return this.points;
    }

    print() {
        let landArr = [];
        let maxY = -Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let minX = Infinity;
        for (let point of this.points) {
            if(point[1] > maxY) maxY = point[1];
            if(point[0] > maxX) maxX = point[0];
        };
        for (let point of this.points) {
            if(point[1] < minY) minY = point[1];
            if(point[0] < minX) minX = point[0];
        };

        for (let i = 1; i <= maxY - minY + this.initialY + 1; i++) {
            landArr.push('\u25CB'.repeat(maxX - minX + this.initialX + 1).split(''))
        };

        if (minX < 0) {
            for (let i = maxY; i >= minY; i--) {
                for (let point of this.points) {
                    if (point[1] == i) {
                        landArr[maxY - i + this.initialY][point[0] - minX] = '\u25CF'
                    }
                }
            }
            landArr[landArr.length - 1 + minY - this.initialY][this.initialX - minX] = '\u25CF';
        } else {
            for (let i = maxY; i >= minY; i--) {
                for (let point of this.points) {
                    if (point[1] == i) {
                            landArr[maxY - i + this.initialY][point[0]] = '\u25CF'
                    }
                }
            }
            landArr[landArr.length - 1 + minY - this.initialY][this.initialX] = '\u25CF';
        }

        let resultStr = '';
        for (let line of landArr) {
            resultStr = resultStr + line.join(' ') + '\n';
        }
        return resultStr;
    }

}

const jakie = new Turtle(0, 0).forward(5).right().forward(5).right().forward(5).right().forward(5);
console.log(jakie.allPoints());
console.log(jakie.print());

const henry = new Turtle(0,0).forward(2).left().forward(2).right().forward(2).right().forward(3).right().forward(10).right().forward(3);
console.log(henry.allPoints());
console.log(henry.print());

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
console.log(mira.print());

const flash = new Turtle(0, 0).forward(3).left().forward(3);
console.log(flash.allPoints());
console.log(flash.print());