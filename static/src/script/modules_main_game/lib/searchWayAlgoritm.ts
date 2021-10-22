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
        var fieldArray = new Array(this.size_w); //Создаем матрицу с нужными размерами
        startY = Math.round(startY);
        startX = Math.round(startX);
        finishY = Math.round(finishY);
        finishX = Math.round(finishX);
        for (var i = 0; i < this.size_h; i++) {
            fieldArray[i] = [];
            console.log(i, this.size_h);
            for (var j = 0; j < this.size_w; j++) {
                if (this.furniture_collection.checkFreeCoord({ x: j, y: i })) {
                    fieldArray[i][j] = 0;
                } else {
                    fieldArray[i][j] = 1;
                }
            }
        }

        var currentX = startX;
        var currentY = startY;
        console.log("!!!! SearchWay fieldArray", startX, startY,"to", finishX, finishY ,fieldArray);
        fieldArray[finishY][finishX] = 0;

        fieldArray[currentY][currentX] = 2; //Точка с которой начинаем, ставим равную 2
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

        if (fieldArray[finishY][finishX] - 2 >= 0) {
            console.log("makeRoad => ",this.makeRoad(fieldArray, Number(finishX), Number(finishY)););
            return this.makeRoad(fieldArray, Number(finishX), Number(finishY));
        }

        return [[finishX + ";" + finishY]];
        //Создаем массив координат, по которым нужно двигаться до конечной точки
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
