import { MiniGame } from "./miniGame";

export class Tetris extends MiniGame {
    next_round: boolean;
    game: GameLogic;
    constructor() {
        super();
        this.initDom();
        this.next_round = false;
    }

    initDom() {
        super.initDom();
        let canvas = this.createCanvas();
        let rules = this.createRules();
        let container: HTMLElement | null = document.getElementById("minigame");
        let input_again = document.createElement('input');
        let input_cancel = document.createElement("input");

        this.createButton(input_again, "Заного", this.again);
        this.createButton(input_cancel, "Отмена", this.cancel);

        if (container) {
            container.innerHTML = "";
            const ctx = canvas.getContext("2d");
            ctx?.fillRect(0, 0, canvas.width, canvas.height);

            container.appendChild(canvas);
            container.appendChild(rules);
            container.appendChild(input_again);
            container.appendChild(input_cancel);

            canvas.focus();
            this.game = new GameLogic(ctx, canvas);
            document.onkeydown = this.checkKey;
        }

    }

    createRules() {
        let rules = document.createElement('div');
        rules.innerHTML = 
            "<div>Управление</div><div>→ враво, ← влево,</div><div>↑ вращать</div>";
        rules.classList.add('container_game_rules');
        return rules;
    }

    checkKey = e => {
        e.preventDefault();

        e = e || window.event;
        let direction = '';

        if (e.keyCode == '40') {
            direction="down";
        } else if (e.keyCode == "37") {
            direction="left";
        } else if (e.keyCode == "39") {
            direction="right";
        } else if (e.keyCode == "38"){
            direction="up";
        } else {
            return;
        }

        this.game.input(direction);
    }
}

class GameLogic {
    gameStatus: string;
    board: Board;
    ctx: CanvasRenderingContext2D;
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.gameStatus;
        this.board = new Board(ctx, canvas.height, canvas.width);
        this.board.init();

        this.run();
    }

    input(direction) {
        this.board.clearShape();
        this.board.moveShape(direction);
        this.board.drawShape();
    }

    run() {
        this.board.addShape();
        this.board.drawShape();
        this.gameStatus = 'running';
        setInterval(() => {
            if (this.gameStatus == 'running') {
                this.input("down");
                if (this.board.currentShape.fixed) {
                    this.board.checkRows();
                    this.board.addShape();
                    if (this.board.loseState) {
                        this.stop();
                        
                    }
                    this.board.drawShape();
                }
            }
        }, 700);
    }

    stop() {
        this.gameStatus = 'stop';
    }

    pause() {
        this.gameStatus = 'paused';
    }

    resume() {
        this.gameStatus = 'running';
    }

    restart() {

    }
}

class Board {
    columnNum: number;
    rowNum: number;
    pHeight: number;
    pWidth: number;
    pSize: number;
    pixels: Array<Array<BoardPixel>>;
    loseState: boolean;
    currentShape: Shape;
    ctx: CanvasRenderingContext2D;
    constructor(ctx, height, width) {
        this.ctx = ctx;
        this.columnNum = 10;
        this.rowNum = 15;
        this.pHeight = height/this.rowNum;
        this.pWidth = width/this.columnNum;
        this.pSize = (this.pHeight > this.pWidth) ? this.pWidth : this.pHeight;
        this.pixels = new Array();
        this.loseState = false;
        this.currentShape;
    }

    init() {
        for (let j = 0; j < this.rowNum; j++) {
            let row: Array<BoardPixel> = [];
            for (let i = 0; i < this.columnNum; i++) {
                let newpixel = new BoardPixel(i, j, this.pSize);
                row.splice(i, 0, newpixel);
                newpixel.renderPixel(this.ctx);
            }
            this.pixels.splice(j, 0, row);
        }
        this.addShape();
    }

    clearShape() {
        let locationArray = this.currentShape.getBlockLocation(this.currentShape.location);
        locationArray.forEach(shapePixel => {
            let pixel = this.setPixelType(shapePixel, 0);
            if (pixel) {
                pixel.clearPixel(this.ctx);
            }
        });
    }

    drawShape() {
        let locationArray = this.currentShape.getBlockLocation(this.currentShape.location);
        locationArray.forEach(shapePixel => {
            let pixel = this.setPixelType(shapePixel, 1);
            if (pixel) {
                pixel.fillPixel(this.ctx, this.currentShape.color);
            }
        });
    }

    addShape() {
        let randomShape = Math.floor(Math.random() * 5);
        let randomColor = Math.floor(Math.random() * 5);
        this.currentShape = new Shape(randomShape, randomColor);
        let offset = -1;
        if (this.currentShape.frameDim() > 3) {
            offset = -3;
        }
        this.currentShape.moveToLocation(offset, Math.floor(this.columnNum/2) - 1);
        let locationArray = this.currentShape.getBlockLocation(this.currentShape.location);
        if (this.hasShapeCollision(locationArray)) {
            this.loseState = true;
        }
    }

    moveShape(direction) {
        let location = this.currentShape.getNewLocation(direction);
        let locationArray = this.currentShape.getBlockLocation(location);
        if (this.hasShapeCollision(locationArray)) {
            this.currentShape.fixed = true;
        } else if (!this.hasWallCollision(locationArray)) {
            this.currentShape.updateLocation();
        }
    }

    checkRows() {
        let rowsToClear: Array<number> = [];
        for (let row = 0; row < this.pixels.length; row++) {
            let filledLine = true;
            for (let column = 0; column < this.pixels[row].length; column++) {
                if (this.pixels[row][column].type == 0) {
                    filledLine = false;
                }                    
            }
            if (filledLine) {
                rowsToClear.push(row);
            }
        }
        rowsToClear.forEach(row => {
            this.redrawPixelArray(row);
        });
    }

    redrawPixelArray(borderrow) {
        for (let row = this.pixels.length; row > 0; row--) {
            if (row < borderrow) {
                for (let col = 0; col < this.pixels[row].length; col++) {
                    let pixel = this.pixels[row][col];
                    this.pixels[row+1][col].type = pixel.type;
                    this.pixels[row+1][col].color = pixel.color;
                    this.pixels[row+1][col].renderPixel(this.ctx);
                }
            }

        }
    }

    getPixelTyoe(coords) {
        if (coords[0] >= 0 && coords[1] >= 0) {
            let pixel = this.pixels[coords[0]][coords[1]];
            return pixel.type;
        }
        return null;
    }
    
    setPixelType(coords, type) {
        if (coords[0] >= 0 && coords[1] >= 0) {
            let pixel = this.pixels[coords[0]][coords[1]];
            pixel.type = type;
            return pixel;;
        } else {
            return null;
        }
    }

    hasWallCollision(location) {
        let collision = false;
        location.forEach(shapePixel => {
            if (shapePixel[1] < 0 || shapePixel[1] > this.columnNum - 1) {
                collision = true;
            }
        });
        return collision;
    }

    hasShapeCollision(location) {
        let collision = false;
        // let currentlocation = this.currentShape.getBlockLocation(this.currentShape.location);
        // let intersection = location.filter(pixel => currentlocation.every((value, index) => {return value === location[index]}));
        // console.log(this.intersection(location, currentlocation));
        location.forEach(shapePixel => {
            if (shapePixel[0] > this.rowNum - 1) {
                collision = true;
            } else {
                if (this.getPixelTyoe(shapePixel) == 1) {
                    collision = true;
                }
            }
        });
        return collision;
    }

    intersection(location, currentlocation) {
        let intersection = false;
        location.forEach(pixel => {
            currentlocation.forEach(curpixel => {
                if ((pixel[0] == curpixel[0]) && (pixel[1] == curpixel[1])) {
                    intersection = true;
                }
            });
        });
        return intersection;
    }
}

class Shape {
    shapeType: number;
    shape: Array<Array<number>>;
    location: Array<number>;
    newlocation: Array<number>;
    color: string;
    fixed: boolean;
    constructor(shapeType, shapeColor) {
        const shapes = [
            [[1, 0], [0, 1], [1, 1], [2, 1]], // angle shape 3x3
            [[1, 0], [1, 1], [1, 2], [1, 3]], // line 4x4
            [[1, 1], [1, 2], [2, 1], [2, 2]], // square 2x2
            [[2, 0], [0, 1], [1, 1], [2, 1]], // L shape 3x3
            [[0, 0], [0, 1], [1, 1], [1, 2]]  // tetris shape 3x3
        ];
        const colors = [
            'green',
            'red',
            'blue',
            'orange',
            'purple'
        ];

        this.shapeType = shapeType;
        this.shape = shapes[shapeType];
        this.location = [0, 0]; // horizontal, vertical
        this.newlocation = [0, 0];
        this.color = colors[shapeColor];
        this.fixed = false;
    }

    moveLeft() {
        this.newlocation[0]--;
    }

    moveRight() {
        this.newlocation[0]++;
    }

    moveDown() {
        this.newlocation[1]++;
    }

    moveToLocation(row, col) {
        this.location = [col, row];
    }

    updateLocation() {
        this.location = this.newlocation.slice();
    }

    frameDim() {
        let num = 3;
        if (this.shapeType == 1 || this.shapeType == 2) {
            num = 4;
        }
        return num;
    }

    getNewLocation(direction) {
        this.newlocation = this.location.slice();
        if (direction == "down") {
            this.moveDown();
        } else if (direction == "left") {
            this.moveLeft();
        } else if (direction == "right") {
            this.moveRight();
        } else if (direction == "up") {
            this.rotate();
        }
        return this.newlocation;
    }

    getBlockLocation(loc) {
        let blockLocation: Array<Array<number>> = [];
        for (let i = 0; i < this.shape.length; i++) {
            let x = this.shape[i][0] + loc[0];
            let y = this.shape[i][1] + loc[1];
            blockLocation.push([y, x]);
        }
        return blockLocation;
    }

    rotate() {
        let transposed: Array<Array<number>> = [];
        this.shape.forEach(pixel => {
            transposed.push([pixel[1], pixel[0]]);
        });
        let reversed: Array<Array<number>> = [];
        let num = this.frameDim();
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                transposed.forEach(pixel => {
                    if (pixel[0] == i && pixel[1] == j) {
                        reversed.push([i, num - 1 - j]);
                    }
                });
                
            }
        }
        this.shape = reversed.slice();
    }

    turnRight() {
        this.rotate();
    }

    turnLeft() {
        this.rotate();
    }
}

class BoardPixel {
    x: number;
    y: number;
    pSize: number;
    type: number;
    color: string;
    constructor(xPosition, yPosition, pSize) {
        this.x = xPosition*pSize;
        this.y = yPosition*pSize;
        this.pSize = pSize;
        this.type = 0;
        this.color = 'black';
    }

    clearPixel(ctx: CanvasRenderingContext2D) {
        this.color = 'black';
        this.renderPixel(ctx);
    }

    renderPixel(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.pSize, this.pSize);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x, this.y, this.pSize, this.pSize);
    }

    fillPixel(ctx: CanvasRenderingContext2D, color) {
        this.color = color;
        this.renderPixel(ctx);
    }
}