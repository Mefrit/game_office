define(["require", "exports", "./person", "../viewScene", "./person_collection", "../lib/dragon", "../lib/miniGame", "../lib/deskBoard"], function (require, exports, person_1, viewScene_1, person_collection_1, dragon_1, miniGame_1, deskBoard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene = void 0;
    var Scene = (function () {
        function Scene(loader, arrImg, config_skins, arrFurniture, id_curent_user) {
            var _this = this;
            this.onBlock = function (event) {
                var block = event.target, posX, posY;
                if (_this.canvas != undefined) {
                    posX = Math.abs(parseInt(_this.canvas.style.left.split("px")[0]) - _this.getCoordFromStyle(block.style.left));
                    posY = Math.abs(parseInt(_this.canvas.style.top.split("px")[0]) - _this.getCoordFromStyle(block.style.top));
                    block.classList.add("block__free");
                }
            };
            this.syncUnit = function (data) {
                _this.person_collection = data;
            };
            this.onOutBlock = function (event) {
                event.target.classList.remove("block__free");
                event.target.classList.remove("block__nonFree");
            };
            this.onMove = function (event) {
                var posX = event.target.style.left, posY = event.target.style.top;
                var curent_unit = _this.getActivePerson(_this.canvas)[0];
                if (curent_unit.person.id == _this.id_curent_user) {
                    _this.setCoord2Server(parseInt(posX.split("px")) / 100, parseInt(posY.split("px")) / 100, _this.id_curent_user);
                    curent_unit.stopAnimation("default_perosn1");
                    curent_unit.playAnimation("walking_perosn1");
                    setTimeout(function () {
                        curent_unit.stopAnimation("walking_perosn1");
                        curent_unit.playAnimation("default_perosn1");
                    }, 1500);
                    _this.movePersonByCoord(_this.canvas, posX, posY);
                }
                else {
                    alert("AnotherUser  " + curent_unit.person.id + "   " + _this.id_curent_user);
                }
            };
            this.onChangePerson = function (event) {
                var canvas = event.target;
                if (_this.canvas != undefined) {
                    _this.view.clearPrev(_this.canvas, _this.loader);
                }
                _this.chosePerson = true;
                _this.view.changePersonView(canvas, _this.loader);
                _this.canvas = canvas;
                _this.view.showAvailabeMovies(_this.canvas);
            };
            this.loader = loader;
            this.chosePerson = false;
            this.skins = {};
            this.config_skins = config_skins;
            this.person_collection = new person_collection_1.Collection(arrImg);
            this.furniture_collection = new person_collection_1.Collection(arrFurniture, "furniture");
            this.wall_blocks = [];
            this.id_curent_user = id_curent_user;
            this.view = new viewScene_1.ViewScene(this.person_collection, this.loader, this.furniture_collection);
            this.curentPerson = undefined;
            this.water_blocks = [];
            this.play();
        }
        Scene.prototype.updateScene = function (arr_obj, id_curent_user) {
            var _this = this;
            var person = {};
            this.id_curent_user = id_curent_user;
            arr_obj.forEach(function (element) {
                person = {};
                person = _this.person_collection.getPersonById(element.id)[0];
                if (person == undefined || typeof person == "undefined") {
                    _this.playNewPerson(new person_collection_1.Collection([new person_1.Person(element)]));
                    person = _this.person_collection.getPersonById(element.id)[0];
                }
                _this.movePersonByCoord(person.domPerson, element.x * 100 + "px", element.y * 100 + "px");
            });
            this.person_collection;
        };
        Scene.prototype.getCoordFromStyle = function (elem) {
            return parseInt(elem.split("px")[0]);
        };
        Scene.prototype.getPerson = function () {
            return this.person_collection;
        };
        Scene.prototype.setCoord2Server = function (x, y, id_user) {
            fetch("/?module=GeoPosition&action=SetUserCoord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ x: x, y: y, id_curent_user: id_user }),
            })
                .then(function (data) { return data.json(); })
                .then(function (result) {
                if (result.status == "ok") {
                }
                else {
                    alert("ERROR " + result.message);
                }
            });
        };
        Scene.prototype.getActivePerson = function (canvas) {
            return this.person_collection.getCollection().filter(function (elem) {
                if (elem.getId() == canvas.getAttribute("data-id")) {
                    return elem;
                }
            });
        };
        Scene.prototype.movePersonByCoord = function (canvas, posX, posY) {
            var activePerson = [];
            canvas.style.left = parseInt(posX.split("px")[0]) - 30 + "px";
            canvas.style.top = parseInt(posY.split("px")[0]) - 60 + "px";
            canvas.style.transition = "1.6s";
            activePerson = this.person_collection.getCollection().filter(function (elem) {
                if (elem.getId() == canvas.getAttribute("data-id")) {
                    elem.setCoord(parseInt(posX.split("px")) / 100, parseInt(posY.split("px")) / 100);
                }
                if (!elem.getMoveAction() && !elem.getKind()) {
                    return elem;
                }
            });
            if (activePerson.length == 0) {
                this.person_collection.getCollection().forEach(function (elem) {
                    if (!elem.getKind()) {
                        elem.setMoveAction(false);
                    }
                });
                setTimeout(function () {
                }, 200);
            }
        };
        Scene.prototype.renderElement = function (element) {
            this.view.renderElement(element);
        };
        Scene.prototype.get = function (name) {
            return this[name];
        };
        Scene.prototype.renderArena = function () {
            var _this = this;
            var scence = document.getElementById("scene"), block, posX = 0, posY = 0, position_block, num_rows = 14, is_furniture = false, curent_unit;
            var _loop_1 = function (j) {
                var _loop_2 = function (i) {
                    block = document.createElement("img");
                    block.addEventListener("mouseout", this_1.onOutBlock);
                    block.addEventListener("mouseover", this_1.onBlock);
                    this_1.furniture_collection.getCollection().forEach(function (element) {
                        if (element.x == i && element.y == j) {
                            is_furniture = true;
                            block.addEventListener("click", function () {
                                if (element.furniture.type == "table") {
                                    block.classList.add("sence__block-table");
                                    curent_unit = _this.getActivePerson(_this.canvas)[0];
                                    _this.workTableAction(curent_unit, element);
                                }
                                if (element.furniture.type == "kitchen") {
                                    curent_unit = _this.getActivePerson(_this.canvas)[0];
                                    _this.workKitchenAction(curent_unit, element);
                                }
                                if (element.furniture.type == "game") {
                                    curent_unit = _this.getActivePerson(_this.canvas)[0];
                                    _this.workGameAction(curent_unit, element);
                                }
                                if (element.furniture.type == "desck") {
                                    curent_unit = _this.getActivePerson(_this.canvas)[0];
                                    _this.getDesckInfo(curent_unit, element);
                                }
                            });
                        }
                    });
                    if (!is_furniture) {
                        block.addEventListener("click", this_1.onMove);
                    }
                    is_furniture = false;
                    if (j == 6) {
                        num_rows = 8;
                    }
                    block = this_1.view.renderBlockView(block, posX, posY, i, j);
                    if (block.src.indexOf("block1.png") != -1) {
                        position_block = block.getAttribute("data-coord").split(";");
                        this_1.wall_blocks.push({ x: position_block[0], y: position_block[1] });
                    }
                    if (block.src.indexOf("block4.png") != -1) {
                        position_block = block.getAttribute("data-coord").split(";");
                        this_1.water_blocks.push({ x: position_block[0], y: position_block[1] });
                    }
                    scence.appendChild(block);
                    posX += 100;
                };
                for (var i = 0; i < num_rows; i++) {
                    _loop_2(i);
                }
                posX = 0;
                posY += 100;
            };
            var this_1 = this;
            for (var j = 0; j < 10; j++) {
                _loop_1(j);
            }
        };
        Scene.prototype.getDesckInfo = function (curent_unit, table) {
            var desck = new deskBoard_1.DesckBoard({});
            if (curent_unit.person.id == this.id_curent_user) {
                this.setCoord2Server(table.x, table.y, this.id_curent_user);
                this.movePersonByCoord(curent_unit.domPerson, table.x * 100 + "px", (table.y + 1) * 100 + "px");
            }
        };
        Scene.prototype.workGameAction = function (curent_unit, table) {
            curent_unit.stopAnimation("default_perosn1");
            curent_unit.playAnimation("walking_perosn1");
            setTimeout(function () {
                curent_unit.stopAnimation("walking_perosn1");
                curent_unit.playAnimation("funny_perosn1");
            }, 2000);
            if (curent_unit.person.id == this.id_curent_user) {
                this.setCoord2Server(table.x, table.y, this.id_curent_user);
                var mini_game = new miniGame_1.MiniGame();
                this.movePersonByCoord(curent_unit.domPerson, table.x * 100 + "px", table.y * 100 + "px");
            }
        };
        Scene.prototype.workKitchenAction = function (curent_unit, table) {
            curent_unit.stopAnimation("default_perosn1");
            curent_unit.playAnimation("walking_perosn1");
            setTimeout(function () {
                curent_unit.stopAnimation("walking_perosn1");
                curent_unit.playAnimation("eating_perosn1");
            }, 2000);
            if (curent_unit.person.id == this.id_curent_user) {
                this.setCoord2Server(table.x, table.y, this.id_curent_user);
                this.movePersonByCoord(curent_unit.domPerson, table.x * 100 + "px", table.y * 100 + "px");
            }
        };
        Scene.prototype.workTableAction = function (curent_unit, table) {
            curent_unit.stopAnimation("default_perosn1");
            curent_unit.playAnimation("walking_perosn1");
            setTimeout(function () {
                curent_unit.stopAnimation("walking_perosn1");
                curent_unit.playAnimation("work_perosn1");
            }, 2000);
            var posX = table.x;
            if (curent_unit.person.id == this.id_curent_user) {
                this.setCoord2Server(table.x, table.y, this.id_curent_user);
                this.movePersonByCoord(curent_unit.domPerson, posX * 100 + "px", table.y * 100 - 20 + "px");
            }
        };
        Scene.prototype.setAIperson = function () { };
        Scene.prototype.loadDragon = function () {
            var _this = this;
            var obj = this, image_domcache = [];
            this.config_skins.forEach(function (skin) {
                image_domcache = [];
                skin.children.forEach(function (elem) {
                    _this.loader.loadJSON(elem.src_json);
                    elem.src_images.forEach(function (img) {
                        if (typeof obj.loader.get(img.path) == "undefined") {
                            obj.loader.loadElement(img.path);
                        }
                    });
                });
            });
        };
        Scene.prototype.play = function () {
            var _this = this;
            this.renderArena();
            var cache_skins = [], tmp = {};
            this.loader.load(this.person_collection);
            this.loadDragon();
            var load = false;
            this.loader.onReady(function () {
                if (!load) {
                    load = true;
                    _this.config_skins.forEach(function (skin) {
                        skin.children.forEach(function (elem) {
                            tmp.cahce_image = [];
                            tmp.name = elem.name;
                            tmp.src_json = elem.src_json;
                            tmp.class = elem.class;
                            elem.src_images.forEach(function (img) {
                                tmp.cahce_image[img.name] = { node: _this.loader.get(img.path) };
                            });
                            cache_skins.push(tmp);
                            tmp = {};
                        });
                    });
                    _this.person_collection.collection.forEach(function (elem) {
                        var img = _this.loader.get(elem.person.url);
                        var cnvsElem = document.createElement("canvas");
                        cnvsElem = _this.view.renderPlayer(cnvsElem, elem, img);
                        cnvsElem.onclick = _this.onChangePerson;
                        if (elem.person.id == _this.id_curent_user) {
                            cnvsElem.classList.add("curent_user");
                        }
                        elem.initDomPerson(cnvsElem);
                        cache_skins.forEach(function (skin) {
                            var dragon = new dragon_1.DragonAnimationUpdate(_this.loader.get(skin.src_json), skin.cahce_image, skin.name, elem);
                            dragon.updateCanvas(elem.domPerson);
                            if (skin.name == "default_perosn1") {
                                dragon.play();
                            }
                            elem.setAnimation(skin.name, dragon);
                        });
                        elem.initImage(img);
                        var scene = document.getElementById("scene");
                        scene.appendChild(cnvsElem);
                    });
                }
            });
        };
        Scene.prototype.playNewPerson = function (person_collection) {
            var _this = this;
            var cache_skins = [], tmp = {};
            var load = false;
            this.loader.load(person_collection);
            if (!load) {
                load = true;
                this.config_skins.forEach(function (skin) {
                    skin.children.forEach(function (elem) {
                        tmp.cahce_image = [];
                        tmp.name = elem.name;
                        tmp.src_json = elem.src_json;
                        tmp.class = elem.class;
                        elem.src_images.forEach(function (img) {
                            tmp.cahce_image[img.name] = { node: _this.loader.get(img.path) };
                        });
                        cache_skins.push(tmp);
                        tmp = {};
                    });
                });
                person_collection.getCollection().forEach(function (elem) {
                    var img = _this.loader.get(elem.person.url);
                    var cnvsElem = document.createElement("canvas");
                    cnvsElem = _this.view.renderPlayer(cnvsElem, elem, img);
                    cnvsElem.onclick = _this.onChangePerson;
                    elem.initDomPerson(cnvsElem);
                    if (elem.person.id == _this.id_curent_user) {
                        cnvsElem.classList.add("curent_user");
                    }
                    cache_skins.forEach(function (skin) {
                        var dragon = new dragon_1.DragonAnimationUpdate(_this.loader.get(skin.src_json), skin.cahce_image, skin.name, elem);
                        dragon.updateCanvas(elem.domPerson);
                        if (skin.name == "default_perosn1") {
                            dragon.play();
                        }
                        elem.setAnimation(skin.name, dragon);
                    });
                    elem.initImage(img);
                    var scene = document.getElementById("scene-game");
                    scene.appendChild(cnvsElem);
                    _this.person_collection.addPerson(elem);
                });
            }
        };
        Scene.prototype.renderAiPerson = function () { };
        return Scene;
    }());
    exports.Scene = Scene;
});
