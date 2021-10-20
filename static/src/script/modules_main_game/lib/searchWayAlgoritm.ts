export class SearchWay {
    size_h: number;
    size_w: number;
    furniture_collection: any;
    constructor(size_w, size_h, furniture_collection) {
        this.size_w = size_w;
        this.size_h = size_h;
        this.furniture_collection = furniture_collection;
    }
    start(startX, startY, finishX, finishY) {
        console.log(startX, startY);
        let blocks = [];
        var fieldArray = new Array(this.size_w); //Создаем матрицу с нужными размерами

        for (var i = 0; i < this.size_h; i++) {
            fieldArray[i] = [];

            for (var j = 0; j < this.size_w; j++) {
                // // this.furniture_collection.forEach((element) => {
                // //     fieldArray[i][j] = 0;
                // // });
                // console.log(this.furniture_collection.checkFreeCoord({ x: i, y: j }), i, j);
                if (this.furniture_collection.checkFreeCoord({ x: j, y: i })) {
                    fieldArray[i][j] = 0;
                } else {
                    fieldArray[i][j] = 1;
                }
            }
        }

        // for (var i = 0; i < this.size_w; i++)
        //     for (var j = 0; j < this.size_h; j++) {
        //         if (blocks[i * this.size_h + j].getAttribute("src") == "./static/src/images/block1.png")
        //             //block1.png - пустое место
        //             fieldArray[i][j] = 0;
        //         if (blocks[i * this.size_h + j].getAttribute("src") == "./static/src/images/block2.jpg")
        //             //block2.jpg - стена
        //             fieldArray[i][j] = 1;
        //     }

        var currentX = startX;
        var currentY = startY;
        fieldArray[currentY][currentX] = 2; //Точка с которой начинаем, ставим равную 2
        console.log(fieldArray);
        if (finishX > startX)
            //Если конечная точка находится справа от начальной
            this.recurseRight(fieldArray, Number(finishX), Number(finishY), Number(currentX), Number(currentY));
        else if (finishX < startX)
            //Если конечная точка находится слева от начальной
            this.recurseLeft(fieldArray, Number(finishX), Number(finishY), Number(currentX), Number(currentY));
        else if (finishY > startY)
            //Если конечная точка находится снизу от начальной
            this.recurseDown(fieldArray, Number(finishX), Number(finishY), Number(currentX), Number(currentY));
        //Если конечная точка находится сверху от начальной
        else this.recurseUp(fieldArray, Number(finishX), Number(finishY), Number(currentX), Number(currentY));

        //В fieldArray построится дорога

        return this.makeRoad(fieldArray, Number(finishX), Number(finishY)); //Создаем массив координат, по которым нужно двигаться до конечной точки
    }
    recurseRight(fieldArray, finishX, finishY, currentX, currentY) {
        if (finishX == currentX && finishY == currentY)
            //Если дошли до конечной точки
            return true;
        if (currentX + 1 < fieldArray[0].length) {
            //вправо
            if (
                fieldArray[currentY][currentX + 1] <= 0 &&
                fieldArray[currentY][currentX + 1] != fieldArray[currentY][currentX] - 1
            ) {
                //fieldArray[currentY][currentX + 1] <= 0 - чтобы не заходить на уже пройденные поля ; fieldArray[currentY][currentX + 1] != fieldArray[currentY][currentX] - 1 - чтобы не вернуться назад
                fieldArray[currentY][currentX + 1] = fieldArray[currentY][currentX] + 1;
                if (this.recurseRight(fieldArray, finishX, finishY, currentX + 1, currentY)) return true;
            }
        }
        if (currentY + 1 < fieldArray[0].length) {
            //вниз
            if (
                fieldArray[currentY + 1][currentX] <= 0 &&
                fieldArray[currentY + 1][currentX] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY + 1][currentX] = fieldArray[currentY][currentX] + 1;
                if (this.recurseRight(fieldArray, finishX, finishY, currentX, currentY + 1)) return true;
            }
        }
        if (currentY - 1 >= 0) {
            //вверх
            if (
                fieldArray[currentY - 1][currentX] <= 0 &&
                fieldArray[currentY - 1][currentX] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY - 1][currentX] = fieldArray[currentY][currentX] + 1;
                if (this.recurseRight(fieldArray, finishX, finishY, currentX, currentY - 1)) return true;
            }
        }
        if (currentX - 1 >= 0) {
            //влево
            if (
                fieldArray[currentY][currentX - 1] <= 0 &&
                fieldArray[currentY][currentX - 1] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY][currentX - 1] = fieldArray[currentY][currentX] + 1;
                if (this.recurseRight(fieldArray, finishX, finishY, currentX - 1, currentY)) return true;
            }
        }
        return false;
    }
    recurseLeft(fieldArray, finishX, finishY, currentX, currentY) {
        if (finishX == currentX && finishY == currentY) return true;
        if (currentX - 1 >= 0) {
            //влево
            if (
                fieldArray[currentY][currentX - 1] <= 0 &&
                fieldArray[currentY][currentX - 1] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY][currentX - 1] = fieldArray[currentY][currentX] + 1;
                if (this.recurseLeft(fieldArray, finishX, finishY, currentX - 1, currentY)) return true;
            }
        }
        if (currentY + 1 < fieldArray[0].length) {
            //вниз
            if (
                fieldArray[currentY + 1][currentX] <= 0 &&
                fieldArray[currentY + 1][currentX] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY + 1][currentX] = fieldArray[currentY][currentX] + 1;
                if (this.recurseLeft(fieldArray, finishX, finishY, currentX, currentY + 1)) return true;
            }
        }
        if (currentY - 1 >= 0) {
            //вверх
            if (
                fieldArray[currentY - 1][currentX] <= 0 &&
                fieldArray[currentY - 1][currentX] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY - 1][currentX] = fieldArray[currentY][currentX] + 1;
                if (this.recurseLeft(fieldArray, finishX, finishY, currentX, currentY - 1)) return true;
            }
        }
        if (currentX + 1 < fieldArray[0].length) {
            //вправо
            if (
                fieldArray[currentY][currentX + 1] <= 0 &&
                fieldArray[currentY][currentX + 1] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY][currentX + 1] = fieldArray[currentY][currentX] + 1;
                if (this.recurseLeft(fieldArray, finishX, finishY, currentX + 1, currentY)) return true;
            }
        }
        return false;
    }
    recurseUp(fieldArray, finishX, finishY, currentX, currentY) {
        if (finishX == currentX && finishY == currentY) return true;
        if (currentY - 1 >= 0) {
            //вверх
            if (
                fieldArray[currentY - 1][currentX] <= 0 &&
                fieldArray[currentY - 1][currentX] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY - 1][currentX] = fieldArray[currentY][currentX] + 1;
                if (this.recurseUp(fieldArray, finishX, finishY, currentX, currentY - 1)) return true;
            }
        }
        if (currentX + 1 < fieldArray[0].length) {
            //вправо
            if (
                fieldArray[currentY][currentX + 1] <= 0 &&
                fieldArray[currentY][currentX + 1] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY][currentX + 1] = fieldArray[currentY][currentX] + 1;
                if (this.recurseUp(fieldArray, finishX, finishY, currentX + 1, currentY)) return true;
            }
        }
        if (currentX - 1 >= 0) {
            //влево
            if (
                fieldArray[currentY][currentX - 1] <= 0 &&
                fieldArray[currentY][currentX - 1] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY][currentX - 1] = fieldArray[currentY][currentX] + 1;
                if (this.recurseUp(fieldArray, finishX, finishY, currentX - 1, currentY)) return true;
            }
        }
        if (currentY + 1 < fieldArray[0].length) {
            //вниз
            if (
                fieldArray[currentY + 1][currentX] <= 0 &&
                fieldArray[currentY + 1][currentX] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY + 1][currentX] = fieldArray[currentY][currentX] + 1;
                if (this.recurseUp(fieldArray, finishX, finishY, currentX, currentY + 1)) return true;
            }
        }
        return false;
    }
    recurseDown(fieldArray, finishX, finishY, currentX, currentY) {
        if (finishX == currentX && finishY == currentY) return true;
        if (currentY + 1 < fieldArray[0].length) {
            //вниз
            if (
                fieldArray[currentY + 1][currentX] <= 0 &&
                fieldArray[currentY + 1][currentX] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY + 1][currentX] = fieldArray[currentY][currentX] + 1;
                if (this.recurseDown(fieldArray, finishX, finishY, currentX, currentY + 1)) return true;
            }
        }
        if (currentX + 1 < fieldArray[0].length) {
            //вправо
            if (
                fieldArray[currentY][currentX + 1] <= 0 &&
                fieldArray[currentY][currentX + 1] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY][currentX + 1] = fieldArray[currentY][currentX] + 1;
                if (this.recurseDown(fieldArray, finishX, finishY, currentX + 1, currentY)) return true;
            }
        }
        if (currentX - 1 >= 0) {
            //влево
            if (
                fieldArray[currentY][currentX - 1] <= 0 &&
                fieldArray[currentY][currentX - 1] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY][currentX - 1] = fieldArray[currentY][currentX] + 1;
                if (this.recurseDown(fieldArray, finishX, finishY, currentX - 1, currentY)) return true;
            }
        }
        if (currentY - 1 >= 0) {
            //вверх
            if (
                fieldArray[currentY - 1][currentX] <= 0 &&
                fieldArray[currentY - 1][currentX] != fieldArray[currentY][currentX] - 1
            ) {
                fieldArray[currentY - 1][currentX] = fieldArray[currentY][currentX] + 1;
                if (this.recurseDown(fieldArray, finishX, finishY, currentX, currentY - 1)) return true;
            }
        }
        return false;
    }

    makeRoad(fieldArray, finishX, finishY) {
        //Проходим путь от конечной точки до начальной по уменьшающимся координатам матрицы
        let road = new Array(fieldArray[finishY][finishX] - 2); //создаем массив под будующий путь
        road[road.length - 1] = finishX + ";" + finishY; //Последняя координата пути - конечная точка в формате "Столбец";"Строка"
        for (var i = road.length - 2; i >= 0; i--) {
            //Проходим путь (количество шагов - значение в конечной точке - 2, так как они посчитаны алгоритмом)
            if (finishY - 1 >= 0 && fieldArray[finishY][finishX] == fieldArray[finishY - 1][finishX] + 1) {
                //finishY - 1 >= 0 - проверка, чтобы не выйти за границы матрицы ;
                //fieldArray[finishY][finishX] == fieldArray[finishY - 1][finishX] + 1 - проверка на нужное направление(потому что, когда мы идем назад значение должно на 1 уменьшаться)
                finishY -= 1;
                road[i] = finishX + ";" + finishY; //Запоминаем очередную клетку пути
                continue;
            }
            if (
                finishY + 1 < fieldArray.length &&
                fieldArray[finishY][finishX] == fieldArray[finishY + 1][finishX] + 1
            ) {
                finishY += 1;
                road[i] = finishX + ";" + finishY;
                continue;
            }
            if (finishX - 1 >= 0 && fieldArray[finishY][finishX] == fieldArray[finishY][finishX - 1] + 1) {
                finishX -= 1;
                road[i] = finishX + ";" + finishY;
                continue;
            }
            if (
                finishX + 1 < fieldArray.length &&
                fieldArray[finishY][finishX] == fieldArray[finishY][finishX + 1] + 1
            ) {
                finishX += 1;
                road[i] = finishX + ";" + finishY;
            }
        }
        return road;
    }
}
