define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewScene = void 0;
    var ViewScene = (function () {
        function ViewScene(arrObjPlayers, loader, furniture_collection) {
            var _this = this;
            if (furniture_collection === void 0) { furniture_collection = []; }
            this.renderPlayer = function (cnvsElem, elem, img) {
                var ctx;
                cnvsElem.style.position = "absolute";
                cnvsElem.classList.add("person");
                if (elem.evil) {
                    cnvsElem.classList.add("ai");
                }
                else {
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
                _this.drawImage(ctx, img);
                return cnvsElem;
            };
            this.renderElement = function (element) {
                element.domPerson.style.left = element.getX() * 100 + "px";
                element.domPerson.style.top = element.getY() * 100 + "px";
            };
            this.arrObjPersons = arrObjPlayers;
            this.furniture_collection = furniture_collection;
            this.loader = loader;
        }
        ViewScene.prototype.drawImage = function (ctx, img) {
            var width, height, coef;
            if (img) {
                if (img.width > 200) {
                    coef = 150 / parseFloat(img.width);
                    width = img.width * coef;
                    height = img.height * coef;
                }
                else {
                    width = img.width;
                    height = img.height;
                }
                ctx.drawImage(img, 0, 0, width + 150, height);
                ctx.scale(-1, 1);
                ctx.restore();
            }
            else {
                console.log("fail in load image");
            }
            return ctx;
        };
        ViewScene.prototype.clearPrev = function (canvas, loader) {
            var ctx = canvas.getContext("2d"), img;
            ctx.clearRect(0, 0, 1000, 1000);
            img = loader.get(canvas.getAttribute("data-image"));
            this.drawImage(ctx, img);
        };
        ViewScene.prototype.changePersonView = function (canvas, loader) {
            var ctx = canvas.getContext("2d"), id, img;
            ctx.fillStyle = "coral";
            ctx.fillRect(0, 0, 1000, 1000);
            img = loader.get(canvas.getAttribute("data-image"));
            this.drawImage(ctx, img);
            id = { id: canvas.getAttribute("data-id") };
        };
        ViewScene.prototype.showAvailabeMovies = function (canvas) {
            var posX = canvas.style.left.split("px")[0], posY = canvas.style.top.split("px")[0], arrBlocks = document.getElementsByClassName("sence__block"), radius, posXblock, posYblock;
            radius = Math.sqrt(posX * posX + posY * posY);
            arrBlocks = [].slice.call(arrBlocks);
            arrBlocks.forEach(function (element) {
                posXblock = element.style.left.split("px")[0];
                posYblock = element.style.top.split("px")[0];
            });
        };
        ViewScene.prototype.renderBlockView = function (block, posX, posY, i, j, src) {
            if (src === void 0) { src = "./static/src/images/block1.png"; }
            block.setAttribute("data-coord", i + ";" + j);
            block.classList.add("sence__block");
            block.style.left = posX + "px";
            block.style.top = posY + "px";
            block.src = src;
            this.furniture_collection.getCollection().forEach(function (element) {
                if (element.x == i && element.y == j) {
                    block.src = element.person.url;
                    if (element.person.type == "table") {
                        block.classList.add("sence__block-table");
                    }
                }
            });
            return block;
        };
        ViewScene.prototype.randomInteger = function (min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        };
        ViewScene.prototype.showCurentUnit = function (domPerson) {
            domPerson.classList.add("block__free");
        };
        ViewScene.prototype.disableCurentUnit = function (domPerson) {
            domPerson.classList.remove("block__free");
        };
        return ViewScene;
    }());
    exports.ViewScene = ViewScene;
});
