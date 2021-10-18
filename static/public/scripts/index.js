define(["require", "exports", "react", "react-dom", "./modules_main_game/loader", "./modules_main_game/modules/scene", "./modules_messenger/messenger"], function (require, exports, React, ReactDOM, loader_1, scene_1, messenger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var loader = new loader_1.Downloader();
    var arrPersons = [
        {
            src: "./static/src/images/hola_1.png",
            x: 11,
            y: 3,
            id: 0,
        },
        {
            src: "./static/src/images/person1.png",
            x: 4,
            y: 3,
            id: 1,
        },
    ];
    var arrFurniture = [
        {
            src: "./static/src/images/table2.png",
            x: 11,
            y: 1,
            id: 0,
            type: "table",
        },
        {
            src: "./static/src/images/table.png",
            x: 0,
            y: 1,
            id: 46,
            type: "table",
        },
        {
            src: "./static/src/images/table.png",
            x: 2,
            y: 1,
            id: 44,
            type: "table",
        },
        {
            src: "./static/src/images/table.png",
            x: 0,
            y: 3,
            id: 41,
            type: "table",
        },
        {
            src: "./static/src/images/table2.png",
            x: 13,
            y: 1,
            id: 42,
            type: "table",
        },
        {
            src: "./static/src/images/table2.png",
            x: 0,
            y: 6,
            id: 5,
            type: "table",
        },
        {
            src: "./static/src/images/table2.png",
            x: 0,
            y: 9,
            id: 1,
            type: "table",
        },
        {
            src: "./static/src/images/table2.png",
            x: 2,
            y: 6,
            id: 5,
            type: "table",
        },
        {
            src: "./static/src/images/table2.png",
            x: 2,
            y: 9,
            id: 1,
            type: "table",
        },
        {
            src: "./static/src/images/divan-abort.png",
            x: 5,
            y: 5,
            id: 1,
            type: "table",
        },
        {
            src: "./static/src/images/divan.png",
            x: 5,
            y: 2,
            id: 1,
            type: "wall",
        },
        {
            src: "./static/src/images/divan.png",
            x: 6,
            y: 2,
            id: 1,
            type: "wall",
        },
        {
            src: "./static/src/images/divan-abort.png",
            x: 6,
            y: 5,
            id: 1,
            type: "table",
        },
        {
            src: "./static/src/images/plita.png",
            x: 6,
            y: 9,
            id: 2,
            type: "kitchen",
        },
        {
            src: "./static/src/images/wardrobe.png",
            x: 5,
            y: 9,
            id: 3,
            type: "kitchen",
        },
        {
            src: "./static/src/images/wardrobe.png",
            x: 4,
            y: 9,
            id: 3,
            type: "kitchen",
        },
        {
            src: "./static/src/images/icebox_2.png",
            x: 7,
            y: 9,
            id: 33,
            type: "kitchen",
        },
        {
            src: "./static/src/images/icebox_1.png",
            x: 7,
            y: 8,
            id: 32,
            type: "kitchen",
        },
        {
            src: "./static/src/images/icebox_1.png",
            x: 7,
            y: 8,
            id: 32,
            type: "kitchen",
        },
        {
            src: "./static/src/images/walls.png",
            x: 3,
            y: 9,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls.png",
            x: 3,
            y: 8,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls.png",
            x: 3,
            y: 6,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls.png",
            x: 3,
            y: 5,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls-angle.png",
            x: 3,
            y: 4,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls.png",
            x: 3,
            y: 2,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls.png",
            x: 3,
            y: 1,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls.png",
            x: 3,
            y: 0,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls.png",
            x: 8,
            y: 0,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls.png",
            x: 8,
            y: 1,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls.png",
            x: 8,
            y: 2,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls_gor.png",
            x: 0,
            y: 4,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls_gor.png",
            x: 1,
            y: 4,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls_gor.png",
            x: 2,
            y: 4,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls_gor.png",
            x: 11,
            y: 3,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls_gor.png",
            x: 12,
            y: 3,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/walls_gor.png",
            x: 13,
            y: 3,
            id: 3,
            type: "wall",
        },
        {
            src: "./static/src/images/game_1.png",
            x: 13,
            y: 5,
            id: 3,
            type: "game",
        },
        {
            src: "./static/src/images/game_2.png",
            x: 13,
            y: 4,
            id: 3,
            type: "game",
        },
        {
            src: "./static/src/images/game_22.jpg",
            x: 12,
            y: 5,
            id: 3,
            type: "game",
        },
        {
            src: "./static/src/images/game_21.jpg",
            x: 12,
            y: 4,
            id: 3,
            type: "game",
        },
        {
            src: "./static/src/images/desck1.png",
            x: 4,
            y: 0,
            id: 3,
            type: "desck",
        },
        {
            src: "./static/src/images/desck2.png",
            x: 5,
            y: 0,
            id: 3,
            type: "desck",
        },
        {
            src: "./static/src/images/desck3.png",
            x: 6,
            y: 0,
            id: 3,
            type: "desck",
        },
        {
            src: "./static/src/images/desck4.png",
            x: 7,
            y: 0,
            id: 3,
            type: "desck",
        },
    ];
    var config_skins = [
        {
            class: "perosn1",
            children: [{
                    src_json: "/static/src/images/dragon/StoppingAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person1/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person1/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person1/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person1/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person1/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person1/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person1/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person1/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person1/right_leg_2.png" }
                    ],
                    name: "default_perosn1",
                    class: "man",
                    scale: 0.4
                },
                {
                    src_json: "/static/src/images/dragon/GameAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person1/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person1/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person1/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person1/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person1/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person1/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person1/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person1/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person1/right_leg_2.png" }
                    ],
                    name: "funny_perosn1",
                    class: "man",
                    scale: 0.4
                }, {
                    src_json: "/static/src/images/dragon/WalkedAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person1/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person1/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person1/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person1/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person1/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person1/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person1/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person1/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person1/right_leg_2.png" }
                    ],
                    name: "walking_perosn1",
                    class: "man",
                    scale: 0.4
                },
                {
                    src_json: "/static/src/images/dragon/EatingAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person1/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person1/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person1/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person1/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person1/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person1/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person1/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person1/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person1/right_leg_2.png" }
                    ],
                    name: "eating_perosn1",
                    class: "man",
                    scale: 0.4
                },
                {
                    src_json: "/static/src/images/dragon/WriteAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person1/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person1/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person1/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person1/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person1/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person1/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person1/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person1/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person1/right_leg_2.png" }
                    ],
                    name: "work_perosn1",
                    class: "man",
                    scale: 0.4
                },
            ]
        }
    ];
    var Director = (function () {
        function Director(loader, arrPersons, arrFurniture, config_skins) {
            var _this = this;
            this.loadScene = function (arrPersons, id_curent_user) {
                if (!_this.load) {
                    var scene = document.getElementById('scene');
                    scene.style.opacity = "1";
                    _this.load = true;
                    console.log("id_curent_user", id_curent_user);
                    _this.scene = new scene_1.Scene(_this.loader, arrPersons, _this.config_skins, [], id_curent_user);
                    _this.loadDesign();
                    _this.scene.play();
                }
            };
            this.loadDesign = function () {
                fetch("/?module=office&action=Get", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                        id_office: 1
                    }),
                })
                    .then(function (data) { return data.json(); })
                    .then(function (result) {
                    var tmp = JSON.parse(result.design);
                    console.log('tmp', tmp);
                    if (result.status == "ok") {
                        _this.scene.updateDesign(tmp.design, tmp.size_w, tmp.size_h);
                    }
                    else {
                        alert("ERROR: " + result.message);
                    }
                });
            };
            this.updateScene = function (arrPersons, id_curent_user) {
                _this.scene.updateScene(arrPersons, id_curent_user);
            };
            this.updateDesign = function (design) {
                console.log("Director design", design);
                _this.scene.updateDesign(design.design, design.size_w, design.size_h);
            };
            this.startAI = function () {
                _this.ai.step();
            };
            this.load = false;
            this.loader = loader;
            this.arrPersons = arrPersons;
            this.arrFurniture = arrFurniture;
            this.config_skins = config_skins;
            this.start();
        }
        Director.prototype.start = function () {
            var ROOT = document.getElementById("root");
            ReactDOM.render(React.createElement(messenger_1.App, { loadScene: this.loadScene, updateScene: this.updateScene, updateDesign: this.updateDesign }), ROOT);
        };
        return Director;
    }());
    new Director(loader, arrPersons, arrFurniture, config_skins);
});
