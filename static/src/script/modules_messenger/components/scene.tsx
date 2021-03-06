import React from 'react'


import { ToolsComponent } from "./tools";
import { ChatComponent } from "./chat";
import { LevelEditor } from "../../modules_level_editor/level_editor"
interface sceneProps {
    id_curent_user: number;
    updateDesign: any;
    id_user2chat: number
    chatIsOpen: any;
    nick_user2chat: string;
}
interface sceneState {
    friends_list: any[];
    id_sent: number;
    open_dialog: boolean;
    history_message: any[];
    nick: string;
    nick_interlocutor: string;
    users: any;
    is_admin: boolean;

}
export class Scene extends React.Component<sceneProps, sceneState> {
    interfal_dialog: any;
    constructor(props) {
        super(props);

        this.interfal_dialog;
        this.state = {
            friends_list: [],
            id_sent: -1,
            open_dialog: false,
            history_message: [],
            nick: "",
            nick_interlocutor: "",
            users: [],
            is_admin: true
        };
    }
    getHistory = () => {
        fetch("/?module=tools&action=GetHistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ count: 10, ref: 0, id_curent_user: this.props.id_curent_user }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {

                    this.setState({
                        friends_list: result.friends_list,
                    });
                } else {
                    alert(result.message);
                }
            });
    };
    getInf() {
        fetch("/?module=tools&action=GetInf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ id_curent_user: this.props.id_curent_user }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    this.setState({
                        nick: result.nick,
                        users: result.users,
                    });
                } else {
                    alert(result.message);
                }
            });
    }
    componentDidMount() {
        this.getInf();
        this.getHistory();

        setInterval(() => {
            this.getHistory();
        }, 5500);
        setInterval(() => {
            this.getInf();
        }, 2000);
    }
    openDialog = (id_sent, nick_interlocutor) => {
        fetch("/?module=dialog&action=Open", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ id_sent: id_sent, id_curent_user: this.props.id_curent_user }),
        })
            .then((data) => data.json())
            .then((result) => {

                if (result.status == "ok") {
                    if (result.history_message.length != this.state.history_message.length || id_sent != this.state.id_sent) {
                        this.setState({
                            open_dialog: true,
                            id_sent: id_sent,
                            history_message: result.history_message,
                            nick_interlocutor: nick_interlocutor,
                        });
                    }

                    clearInterval(this.interfal_dialog);
                    this.interfal_dialog = setInterval(() => {
                        this.openDialog(id_sent, nick_interlocutor);
                    }, 1000);
                } else {
                    alert(result.message);
                }
            });
    };
    sentMessage = (value) => {
        if (this.state.id_sent == -1) {
            alert("???????????????? ??????????????????????");
        } else {
            fetch("/?module=dialog&action=Sent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    id_sent: this.state.id_sent,
                    value: value,
                    id_curent_user: this.props.id_curent_user,
                }),
            })
                .then((data) => data.json())
                .then((result) => {

                    if (result.status == "ok") {
                        //?????????????????? ?????? ?????????????? ?????? ????????????????????
                        this.openDialog(this.state.id_sent, this.state.nick_interlocutor);
                    } else {
                        alert(result.message);
                    }
                });
        }
    };
    searchUser = (search_nick) => {
        if (search_nick != "") {
            fetch("/?module=tools&action=Search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    nick: search_nick,
                }),
            })
                .then((data) => data.json())
                .then((result) => {
                    if (result.status == "ok") {
                        this.setState({
                            users: result.users,
                        });
                    } else {
                        alert(result.message);
                    }
                });
        }
    }
    changeDialog = (value) => {
        clearInterval(this.interfal_dialog);
        this.props.chatIsOpen();
        this.setState({ open_dialog: value, id_sent: -1, nick: "" });
    }
    render() {

        if (this.props.id_user2chat != -1) {
            this.openDialog(this.props.id_user2chat, this.props.nick_user2chat);
            this.props.chatIsOpen();
        }

        return (
            <div className="container__chat" >
                <div className="container__name">
                    <div className="container__name-top"></div>
                    <img src="./static/src/images/chat/chat.png" alt="" />
                </div>
                {this.state.is_admin ? <LevelEditor updateDesign={this.props.updateDesign} /> : ""}
                <ToolsComponent
                    openDialog={this.openDialog}
                    searchUser={this.searchUser}
                    users={this.state.users}
                    nick={this.state.nick}
                    friends_list={this.state.friends_list}
                    id_sent={this.state.id_sent}
                    id_curent_user={this.props.id_curent_user}
                />
                {
                    <ChatComponent
                        history_message={this.state.open_dialog ? this.state.history_message : []}
                        sentMessage={this.sentMessage}
                        open_dialog={this.state.open_dialog}
                        changeDialog={this.changeDialog}
                        id_curent_user={this.props.id_curent_user}
                        nick_interlocutor={this.state.nick_interlocutor}
                    />
                }
            </div>
        );
    }
}
