
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
    constructor(loader, arrPersons, arrFurniture, config_skins = []) {
        this.load = false;
        this.loader = loader;
        this.arrPersons = arrPersons;
        this.arrFurniture = false;
        console.log(JSON.stringify(config_skins));
        this.config_skins = config_skins;
        this.start();
    }
    loadScene = (arrPersons, id_curent_user) => {
        // FIX ME убрать копипаст
        if (!this.load) {
            if (!this.arrFurniture) {
                fetch("/?module=office&action=GetAnimationConfig", {
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

                        if (result.status == "ok") {
                            let scene: any = document.getElementById('scene');
                            scene.style.opacity = "1";

                            this.load = true;
                            console.log("loadScene", result);
                            this.scene = new Scene(this.loader, arrPersons, result.config_skins, [], id_curent_user);
                            this.loadDesign();
                            this.scene.play();
                        } else {
                            alert("ERROR: " + result.message);
                        }
                    });

            } else {
                let scene: any = document.getElementById('scene');
                scene.style.opacity = "1";

                this.load = true;
                this.scene = new Scene(this.loader, arrPersons, this.config_skins, [], id_curent_user);
                this.loadDesign();
                this.scene.play();
            }


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
new Director(loader, arrPersons, arrFurniture);
