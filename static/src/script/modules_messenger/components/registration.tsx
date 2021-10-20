
import React from 'react'


interface registrationProps {
    setEnter: (id: number) => void;

}
interface registrationState {
    login: string;
    nick: string;
    password: string;
    password_repeat: string;
    register: boolean;
    type_skin: number;
}
export class RegistrationComponent extends React.Component<registrationProps, registrationState> {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            nick: "",
            password: "",
            password_repeat: "",
            register: false,
            type_skin: 1
        };
    }
    showEnter = (event) => {
        event.preventDefault();
        this.setState({ register: false });
    };
    showReg = (event) => {
        event.preventDefault();
        this.setState({ register: true });
    };
    onReg = (event) => {
        event.preventDefault();
        console.log("this.state", this.state);
        if (this.state.password == this.state.password_repeat) {
            fetch("/?module=registration&action=Reg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    login: this.state.login,
                    nick: this.state.nick,
                    password: this.state.password,
                    skin: this.state.type_skin
                }),
            })
                .then((data) => data.json())
                .then((result) => {
                    console.log("result from server onReg", result);
                    if (result.status == "ok") {
                        this.props.setEnter(result.id_curent_user);
                    } else {
                        alert(result.message);
                    }
                });
        } else {
            alert("Пароли не совпадают");
        }
    };
    onEnter = (event) => {
        event.preventDefault();
        fetch("/?module=registration&action=Enter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ login: this.state.login, password: this.state.password }),
        })
            .then((data) => data.json())
            .then((result) => {

                if (result.status == "ok") {
                    this.props.setEnter(result.id_curent_user);
                } else {
                    alert(result.message);
                }
            });
    };
    changeLogin = (event) => {
        this.setState({ login: event.target.value });
    };
    changePassword = (event) => {
        this.setState({ password: event.target.value });
    };
    changePasswordRepeat = (event) => {
        this.setState({ password_repeat: event.target.value });
    };
    changeNickName = (event) => {
        this.setState({ nick: event.target.value });
    };
    changeSkin = (ev) => {

        this.setState({
            type_skin: ev.target.value
        });
    }
    renderSkinsPerosn() {
        let src = "./static/src/images/dragon/person" + this.state.type_skin + "/body.png";
        return <div className="reg__skins">
            <div className="reg__container_avatar"><img src={src} alt="Skin" /></div>
            <select onChange={this.changeSkin}>
                <option value="1">Аватар 1</option>
                <option value="2">Аватар 2</option>
                <option value="3">Аватар 3</option>
            </select></div>
    }
    render() {
        return (
            <div className="container-registration">
                <div className="reg">
                    <div className="reg__mode">
                        <a
                            className={this.state.register ? "reg__showEnter " : "reg__showEnter reg__activeMode"}
                            onClick={this.showEnter}
                        >
                            Вход
                        </a>
                        <a
                            className={this.state.register ? "reg__showReg reg__activeMode" : "reg__showReg "}
                            onClick={this.showReg}
                        >
                            Регистрация
                        </a>
                    </div>

                    {this.state.register ? (
                        <div className="reg__inf">
                            <form className="inputs">
                                <label>
                                    <span className="inputs__label"> Никнейм</span>{" "}
                                    <input className="btn_chat btn_chat-text" onChange={this.changeNickName} type="text" />
                                </label>
                                <label>
                                    <span className="inputs__label">Логин</span>{" "}
                                    <input className="btn_chat btn_chat-text" onChange={this.changeLogin} type="text" />
                                </label>
                                <label>
                                    <span className="inputs__label">Пароль</span>{" "}
                                    <input className="btn_chat btn_chat-text" onChange={this.changePassword} type="password" />
                                </label>
                                <label>
                                    <span className="inputs__label">Повторите пароль</span>{" "}
                                    <input
                                        className="btn_chat btn_chat-text"
                                        onChange={this.changePasswordRepeat}
                                        type="password"
                                    />
                                </label>
                                <input
                                    type="button"
                                    className="inputs__reg-btn btn_chat btn_chat-primal   "
                                    onClick={this.onReg}
                                    value="Зарегистрироваться"
                                />
                            </form>
                            {this.renderSkinsPerosn()}
                        </div>
                    ) : (
                        <div className="reg__inf">
                            <form className="inputs">
                                <label>
                                    <span className="inputs__label">Логин</span>{" "}
                                    <input className="btn_chat btn_chat-text" onChange={this.changeLogin} type="text" />
                                </label>
                                <label>
                                    <span className="inputs__label">Пароль</span>{" "}
                                    <input className="btn_chat btn_chat-text" onChange={this.changePassword} type="password" />
                                </label>
                                <input
                                    type="button"
                                    className="inputs__reg-btn btn_chat btn_chat-primal"
                                    onClick={this.onEnter}
                                    value="Войти"
                                />
                            </form>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
