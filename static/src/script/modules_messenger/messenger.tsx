import React from 'react'

import { RegistrationComponent } from "./components/registration";
import { Scene } from "./components/scene";

export class App extends React.Component<any, any> {
    load_scene: boolean;
    interval_load: any;
    init_chat_aplication: boolean;
    constructor(props) {
        super(props);
        this.state = {
            enter: false,
            id_curent_user: -1,
            id_user2chat: -1
        };
        this.init_chat_aplication = false;
        this.load_scene = false;


    }
    setEnter = (id_curent_user) => {
        this.setState({
            enter: true,
            id_curent_user: id_curent_user,
        });
    }
    openChat(id_user, nick = "user") {

        this.setState({ id_user2chat: id_user, nick_user2chat: nick })
    }
    chatIsOpen = () => {
        this.setState({ id_user2chat: -1 })
    }
    componentDidUpdate() {
        clearInterval(this.interval_load);
        this.interval_load = setInterval(() => {

            this.loadScene(true);
        }, 2000);
    }
    loadScene(update = false) {

        let url = "", tmp: any = {};
        fetch("/?module=GeoPosition&action=GetAllUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ data: { y: 5, x: 10, id_curent_user: this.state.id_curent_user } }),
        })
            .then((data) => data.json())
            .then((result) => {

                if (result.status == "ok") {
                    let arrPersons = result.online_users.map(elem => {
                        tmp = {};
                        tmp.url = './static/src/images/person1.png'
                        if (elem[3] != 1) {
                            tmp.url = './static/src/images/hola_1.png'
                        }
                        if (elem[2] == null) {
                            tmp.y = 4;
                        } else {
                            tmp.y = elem[2];
                        }
                        if (elem[1] == null) {
                            tmp.x = 10;
                        } else {
                            tmp.x = elem[1];
                        }
                        tmp.id = elem[0];
                        tmp.skin = elem[3];
                        tmp.nick = elem[4];

                        return tmp;
                    });

                    if (update) {

                        this.props.updateScene(arrPersons, this.state.id_curent_user);
                    } else {
                        if (!this.load_scene) {
                            this.load_scene = true;
                            this.props.loadScene(arrPersons, this.state.id_curent_user);

                        }

                    }

                } else {
                    alert("ERROR " + result.message);
                }
            });
    }
    render() {
        if (this.props.is_ready) {
            this.init_chat_aplication = true;
            this.props.initChatAplication(this);
        }
        if (this.state.enter) {
            if (!this.load_scene) {

                this.loadScene(false);
                clearInterval(this.interval_load);
                this.interval_load = setInterval(() => {

                    this.loadScene(true);
                }, 2000);
            }
        }
        return (
            <div className="container">
                {this.state.enter ? (
                    <Scene
                        chatIsOpen={this.chatIsOpen}
                        nick_user2chat={this.state.nick_user2chat}
                        id_user2chat={this.state.id_user2chat}
                        id_curent_user={this.state.id_curent_user}
                        updateDesign={this.props.updateDesign} />
                ) : (
                    <RegistrationComponent setEnter={this.setEnter} />
                )}
            </div>
        );
    }
}

