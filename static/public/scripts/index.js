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
    var arrFurniture = [];
    var config_skins = [
        {
            class: "perosn1",
            skin: 1,
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
        },
        {
            class: "perosn2",
            skin: 2,
            children: [{
                    src_json: "/static/src/images/dragon/StoppingAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person2/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person2/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person2/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person2/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person2/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person2/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person2/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person2/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person2/right_leg_2.png" }
                    ],
                    name: "default_perosn1",
                    class: "man",
                    scale: 0.4
                },
                {
                    src_json: "/static/src/images/dragon/GameAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person2/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person2/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person2/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person2/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person2/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person2/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person2/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person2/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person2/right_leg_2.png" }
                    ],
                    name: "funny_perosn1",
                    class: "man",
                    scale: 0.4
                }, {
                    src_json: "/static/src/images/dragon/WalkedAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person2/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person2/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person2/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person2/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person2/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person2/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person2/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person2/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person2/right_leg_2.png" }
                    ],
                    name: "walking_perosn1",
                    class: "man",
                    scale: 0.4
                },
                {
                    src_json: "/static/src/images/dragon/EatingAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person2/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person2/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person2/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person2/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person2/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person2/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person2/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person2/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person2/right_leg_2.png" }
                    ],
                    name: "eating_perosn1",
                    class: "man",
                    scale: 0.4
                },
                {
                    src_json: "/static/src/images/dragon/WriteAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person2/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person2/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person2/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person2/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person2/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person2/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person2/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person2/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person2/right_leg_2.png" }
                    ],
                    name: "work_perosn1",
                    class: "man",
                    scale: 0.4
                }
            ]
        }, {
            class: "perosn2",
            skin: 3,
            children: [{
                    src_json: "/static/src/images/dragon/StoppingAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person3/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person3/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person3/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person3/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person3/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person3/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person3/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person3/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person3/right_leg_2.png" }
                    ],
                    name: "default_perosn1",
                    class: "man",
                    scale: 0.4
                },
                {
                    src_json: "/static/src/images/dragon/GameAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person3/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person3/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person3/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person3/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person3/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person3/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person3/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person3/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person3/right_leg_2.png" }
                    ],
                    name: "funny_perosn1",
                    class: "man",
                    scale: 0.4
                }, {
                    src_json: "/static/src/images/dragon/WalkedAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person3/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person3/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person3/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person3/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person3/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person3/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person3/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person3/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person3/right_leg_2.png" }
                    ],
                    name: "walking_perosn1",
                    class: "man",
                    scale: 0.4
                },
                {
                    src_json: "/static/src/images/dragon/EatingAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person3/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person3/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person3/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person3/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person3/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person3/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person3/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person3/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person3/right_leg_2.png" }
                    ],
                    name: "eating_perosn1",
                    class: "man",
                    scale: 0.4
                },
                {
                    src_json: "/static/src/images/dragon/WriteAnim_ske.json",
                    src_images: [
                        { name: "body", path: "../static/src/images/dragon/person3/body.png" },
                        { name: "left_arm_1", path: "../static/src/images/dragon/person3/left_arm_1.png" },
                        { name: "left_arm_2", path: "../static/src/images/dragon/person3/left_arm_2.png" },
                        { name: "left_leg_1", path: "../static/src/images/dragon/person3/left_leg_1.png" },
                        { name: "left_leg_2", path: "../static/src/images/dragon/person3/left_leg_2.png" },
                        { name: "right_arm_1", path: "../static/src/images/dragon/person3/right_arm_1.png" },
                        { name: "right_arm_2", path: "../static/src/images/dragon/person3/right_arm_2.png" },
                        { name: "right_leg_1", path: "../static/src/images/dragon/person3/right_leg_1.png" },
                        { name: "right_leg_2", path: "../static/src/images/dragon/person3/right_leg_2.png" }
                    ],
                    name: "work_perosn1",
                    class: "man",
                    scale: 0.4
                }
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
                    console.log(arrPersons);
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
