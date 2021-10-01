import * as React from "react";
import * as ReactDOM from "react-dom";
import { Downloader } from "./modules_main_game/loader";
import { Scene } from "./modules_main_game/modules/scene";
import { App } from "./modules_messenger/messenger";

let loader = new Downloader();


let arrPersons = [
    {
        url: "./static/src/images/hola_1.png",
        x: 11,
        y: 3,
        id: 0,
    },
    {
        url: "./static/src/images/person1.png",
        x: 4,
        y: 3,
        id: 1,
    },
];
let arrFurniture = [
    {
        url: "./static/src/images/table2.png",
        x: 11,
        y: 1,
        id: 0,
        type: "table",
    },
    {
        url: "./static/src/images/table.png",
        x: 0,
        y: 1,
        id: 46,
        type: "table",
    },
    {
        url: "./static/src/images/table.png",
        x: 2,
        y: 1,
        id: 44,
        type: "table",
    },
    {
        url: "./static/src/images/table.png",
        x: 0,
        y: 3,
        id: 41,
        type: "table",
    },
    {
        url: "./static/src/images/table2.png",
        x: 13,
        y: 1,
        id: 42,
        type: "table",
    },
    {
        url: "./static/src/images/table2.png",
        x: 0,
        y: 6,
        id: 5,
        type: "table",
    },
    {
        url: "./static/src/images/table2.png",
        x: 0,
        y: 9,
        id: 1,
        type: "table",
    },
    {
        url: "./static/src/images/table2.png",
        x: 2,
        y: 6,
        id: 5,
        type: "table",
    },
    {
        url: "./static/src/images/table2.png",
        x: 2,
        y: 9,
        id: 1,
        type: "table",
    },
    {
        url: "./static/src/images/divan-abort.png",
        x: 5,
        y: 5,
        id: 1,
        type: "table",
    },
    {
        url: "./static/src/images/divan.png",
        x: 5,
        y: 2,
        id: 1,
        type: "wall",
    },
    {
        url: "./static/src/images/divan.png",
        x: 6,
        y: 2,
        id: 1,
        type: "wall",
    },
    {
        url: "./static/src/images/divan-abort.png",
        x: 6,
        y: 5,
        id: 1,
        type: "table",
    },
    {
        url: "./static/src/images/plita.png",
        x: 6,
        y: 9,
        id: 2,
        type: "kitchen",
    },
    {
        url: "./static/src/images/wardrobe.png",
        x: 5,
        y: 9,
        id: 3,
        type: "kitchen",
    },
    {
        url: "./static/src/images/wardrobe.png",
        x: 4,
        y: 9,
        id: 3,
        type: "kitchen",
    },
    {
        url: "./static/src/images/icebox_2.png",
        x: 7,
        y: 9,
        id: 33,
        type: "kitchen",
    },
    {
        url: "./static/src/images/icebox_1.png",
        x: 7,
        y: 8,
        id: 32,
        type: "kitchen",
    },
    {
        url: "./static/src/images/icebox_1.png",
        x: 7,
        y: 8,
        id: 32,
        type: "kitchen",
    },
    {
        url: "./static/src/images/walls.png",
        x: 3,
        y: 9,
        id: 3,
        type: "wall",
    },

    {
        url: "./static/src/images/walls.png",
        x: 3,
        y: 8,
        id: 3,
        type: "wall",
    },

    {
        url: "./static/src/images/walls.png",
        x: 3,
        y: 6,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls.png",
        x: 3,
        y: 5,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls-angle.png",
        x: 3,
        y: 4,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls.png",
        x: 3,
        y: 2,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls.png",
        x: 3,
        y: 1,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls.png",
        x: 3,
        y: 0,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls.png",
        x: 8,
        y: 0,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls.png",
        x: 8,
        y: 1,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls.png",
        x: 8,
        y: 2,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls_gor.png",
        x: 0,
        y: 4,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls_gor.png",
        x: 1,
        y: 4,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls_gor.png",
        x: 2,
        y: 4,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls_gor.png",
        x: 11,
        y: 3,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls_gor.png",
        x: 12,
        y: 3,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/walls_gor.png",
        x: 13,
        y: 3,
        id: 3,
        type: "wall",
    },
    {
        url: "./static/src/images/game_1.png",
        x: 13,
        y: 5,
        id: 3,
        type: "game",
    },
    {
        url: "./static/src/images/game_2.png",
        x: 13,
        y: 4,
        id: 3,
        type: "game",
    },
    {
        url: "./static/src/images/game_22.jpg",
        x: 12,
        y: 5,
        id: 3,
        type: "game",
    },
    {
        url: "./static/src/images/game_21.jpg",
        x: 12,
        y: 4,
        id: 3,
        type: "game",
    },
    {
        url: "./static/src/images/desck1.png",
        x: 4,
        y: 0,
        id: 3,
        type: "desck",
    },
    {
        url: "./static/src/images/desck2.png",
        x: 5,
        y: 0,
        id: 3,
        type: "desck",
    },
    {
        url: "./static/src/images/desck3.png",
        x: 6,
        y: 0,
        id: 3,
        type: "desck",
    },
    {
        url: "./static/src/images/desck4.png",
        x: 7,
        y: 0,
        id: 3,
        type: "desck",
    },
];
let config_skins = [
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
            class: "woman",
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
            class: "woman",
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
            class: "woman",
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
            class: "woman",
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
            class: "woman",
            scale: 0.4
        },
        ]


    }
]
// wardrobe

let ROOT = document.getElementById("root");
ReactDOM.render(<App />, ROOT);
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
        this.arrFurniture = arrFurniture
        this.config_skins = config_skins;
        this.start();
    }
    loadScene = (arrPersons, id_curent_user) => {
        if (!this.load) {
            let scene: any = document.getElementById('scene');
            scene.style.opacity = "1";

            this.load = true;
            console.log("id_curent_user", id_curent_user);
            this.scene = new Scene(this.loader, arrPersons, this.config_skins, this.arrFurniture, id_curent_user);
        }

    }
    updateScene = (arrPersons, id_curent_user) => {
        this.scene.updateScene(arrPersons, id_curent_user);
    }
    start() {

        let ROOT = document.getElementById("root");

        ReactDOM.render(<App loadScene={this.loadScene} updateScene={this.updateScene} />, ROOT);
    }
    startAI = () => {
        this.ai.step();
    };
}
new Director(loader, arrPersons, arrFurniture, config_skins);
