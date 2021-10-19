
import React = require('react');
import ReactDOM = require('react-dom');
import { Downloader } from "./modules_main_game/loader";
import { Scene } from "./modules_main_game/modules/scene";
import { App } from "./modules_messenger/messenger";

let loader = new Downloader();


let arrPersons = [
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
let arrFurniture = [];
let config_skins = [
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
]
// wardrobe
class Director {
    scene: any;
    ai: any;
    load: boolean;
    persController: any;
    arrPersons: any;
    loader: any;
    arrFurniture: any;
    config_skins: any;
    constructor(loader, arrPersons, arrFurniture, config_skins) {
        this.load = false;
        this.loader = loader;
        this.arrPersons = arrPersons;
        this.arrFurniture = arrFurniture;

        this.config_skins = config_skins;
        this.start();
    }
    loadScene = (arrPersons, id_curent_user) => {
        if (!this.load) {
            let scene: any = document.getElementById('scene');
            scene.style.opacity = "1";

            this.load = true;
            console.log(arrPersons);
            this.scene = new Scene(this.loader, arrPersons, this.config_skins, [], id_curent_user);
            this.loadDesign();
            this.scene.play();
        }

    }
    loadDesign = () => {

        fetch("/?module=office&action=Get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                id_office: 1
            }),
        })
            .then((data) => data.json())
            .then((result) => {

                let tmp = JSON.parse(result.design);
                console.log('tmp', tmp);
                if (result.status == "ok") {
                    this.scene.updateDesign(tmp.design, tmp.size_w, tmp.size_h);
                } else {
                    alert("ERROR: " + result.message);
                }
            });

    }
    updateScene = (arrPersons, id_curent_user) => {
        this.scene.updateScene(arrPersons, id_curent_user);
    }

    updateDesign = (design) => {
        console.log("Director design", design);
        this.scene.updateDesign(design.design, design.size_w, design.size_h);
    }

    start() {
        let ROOT = document.getElementById("root");
        ReactDOM.render(<App loadScene={this.loadScene} updateScene={this.updateScene} updateDesign={this.updateDesign} />, ROOT);
    }
    startAI = () => {
        this.ai.step();
    };
}
new Director(loader, arrPersons, arrFurniture, config_skins);
