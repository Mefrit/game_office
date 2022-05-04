
import React from 'react'
import ReactDOM from 'react-dom'
import { io } from 'socket.io-client'

import { Downloader } from "./modules_main_game/loader";
import { Scene } from "./modules_main_game/modules/scene";
import { App } from "./modules_messenger/messenger";

let loader = new Downloader();

let arrPersons = [

];
let arrFurniture = [];
// wardrobe
class Director extends React.Component<any, any> {
    scene: any;
    ai: any;
    load: boolean;
    persController: any;
    arrPersons: any;
    loader: any;
    arrFurniture: any;
    config_skins: any;
    constructor(props) {
        super(props);
        this.load = false;
        this.loader = props.loader;
        this.arrPersons = props.arrPersons;
        this.arrFurniture = false;
        this.config_skins = props.config_skins;
        this.state = {
            is_ready: false
        }
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

                            this.scenePlay(id_curent_user, arrPersons, result.config_skins)
                            this.setState({ is_ready: true });
                        } else {
                            alert("ERROR: " + result.message);
                        }
                    });

            } else {
                this.scenePlay(id_curent_user, arrPersons, this.config_skins)
            }
        }
    }
    scenePlay(id_curent_user, arrPersons, config_skins) {
        let scene: any = document.getElementById('scene');
        scene.style.opacity = "1";
        this.load = true;
        this.scene = new Scene(this.loader, arrPersons, config_skins, [], id_curent_user);
        this.loadDesign();
        this.scene.play();
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
                if (result.status == "ok") {
                    this.scene.updateDesign(tmp.design, tmp.size_w, tmp.size_h);
                } else {
                    alert("ERROR: " + result.message);
                }
            });

    }
    initChatAplication = (obj) => {
        this.scene.initChatAplication(obj);
    }
    updateScene = (arrPersons, id_curent_user) => {
        this.scene.updateScene(arrPersons, id_curent_user);
    }
    updateDesign = (design) => {
        this.scene.updateDesign(design.design, design.size_w, design.size_h);
    }

    render() {
        return <App is_ready={this.state.is_ready} initChatAplication={this.initChatAplication} loadScene={this.loadScene} updateScene={this.updateScene} updateDesign={this.updateDesign} />
    }
    startAI = () => {
        this.ai.step();
    };
}
let ROOT = document.getElementById("root");
ReactDOM.render(<Director loader={loader} arrPersons={arrPersons} config_skins={arrFurniture} />, ROOT);
