// new DragonAnimationUpdate(result.data, element.children, obj.name);
export class ViewScene {
    arrObjPersons: any;
    furniture_collection: any;
    loader: any;
    constructor(arrObjPlayers, loader, furniture_collection = []) {
        this.arrObjPersons = arrObjPlayers;
        this.furniture_collection = furniture_collection;
        this.loader = loader;
    }

    renderPlayer = (cnvsElem, elem, img) => {
        let ctx;

        cnvsElem.style.position = "absolute";
        cnvsElem.classList.add("person");
        if (elem.evil) {
            cnvsElem.classList.add("ai");
        } else {
            cnvsElem.classList.add("players");
        }
        cnvsElem.setAttribute("data-image", elem.person.url);
        cnvsElem.setAttribute("title", elem.person.nick);
        cnvsElem.setAttribute("data-id", elem.person.id);

        cnvsElem.style.top = elem.y * 100 - 60 + "px";
        cnvsElem.style.left = elem.x * 100 - 30 + "px";
        cnvsElem.style.width = 160 + "px";
        cnvsElem.style.height = 160 + "px";

        ctx = cnvsElem.getContext("2d");

        this.drawImage(ctx, img);
        // this.changeHealth(ctx, elem);
        return cnvsElem;
    };
    renderElement = (element) => {
        element.domPerson.style.left = element.getX() * 100 + "px";
        element.domPerson.style.top = element.getY() * 100 + "px";
    };
    drawImage(ctx, img) {
        let width, height, coef;
        if (img) {
            if (img.width > 200) {
                coef = 150 / parseFloat(img.width);
                width = img.width * coef;
                height = img.height * coef;
            } else {
                width = img.width;
                height = img.height;
            }

            ctx.drawImage(img, 0, 0, width + 150, height);
            ctx.scale(-1, 1);
            ctx.restore();
        } else {
            console.log("fail in load image");
        }

        return ctx;
    }

    clearPrev(canvas, loader) {
        let ctx = canvas.getContext("2d"),
            img;
        ctx.clearRect(0, 0, 1000, 1000);
        img = loader.get(canvas.getAttribute("data-image"));
        this.drawImage(ctx, img);
    }
    changePersonView(canvas, loader) {
        let ctx = canvas.getContext("2d"),
            id,
            img;

        ctx.fillStyle = "coral"; // меняем цвет рамки
        ctx.fillRect(0, 0, 1000, 1000);
        img = loader.get(canvas.getAttribute("data-image"));
        this.drawImage(ctx, img);
        id = { id: canvas.getAttribute("data-id") };
        // this.changeHealth(ctx, { person: id });
    }
    showAvailabeMovies(canvas) {
        let posX = canvas.style.left.split("px")[0],
            posY = canvas.style.top.split("px")[0],
            arrBlocks: any = document.getElementsByClassName("sence__block"),
            radius,
            posXblock,
            posYblock;

        radius = Math.sqrt(posX * posX + posY * posY);
        arrBlocks = [].slice.call(arrBlocks);

        arrBlocks.forEach((element) => {
            posXblock = element.style.left.split("px")[0];
            posYblock = element.style.top.split("px")[0];
        });
    }
    renderBlockView(block, posX, posY, i, j, src = "./static/src/images/block1.png") {
        block.setAttribute("data-coord", i + ";" + j);
        block.classList.add("sence__block");
        block.style.left = posX + "px";
        block.style.top = posY + "px";
        block.src = src;
        this.furniture_collection.getCollection().forEach((element) => {
            if (element.x == i && element.y == j) {
                block.src = element.person.url;
                if (element.person.type == "table") {
                    block.classList.add("sence__block-table");
                }
            }
        });

        return block;
    }
    randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    showCurentUnit(domPerson) {
        // Fix Me сделать адекватный выбор
        domPerson.classList.add("block__free");
    }
    disableCurentUnit(domPerson) {
        domPerson.classList.remove("block__free");
    }
}
