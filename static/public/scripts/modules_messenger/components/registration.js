var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RegistrationComponent = void 0;
    var RegistrationComponent = (function (_super) {
        __extends(RegistrationComponent, _super);
        function RegistrationComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.showEnter = function (event) {
                event.preventDefault();
                _this.setState({ register: false });
            };
            _this.showReg = function (event) {
                event.preventDefault();
                _this.setState({ register: true });
            };
            _this.onReg = function (event) {
                event.preventDefault();
                console.log("this.state", _this.state);
                if (_this.state.password == _this.state.password_repeat) {
                    fetch("/?module=registration&action=Reg", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify({
                            login: _this.state.login,
                            nick: _this.state.nick,
                            password: _this.state.password,
                            skin: _this.state.type_skin
                        }),
                    })
                        .then(function (data) { return data.json(); })
                        .then(function (result) {
                        console.log("result from server onReg", result);
                        if (result.status == "ok") {
                            _this.props.setEnter(result.id_curent_user);
                        }
                        else {
                            alert(result.message);
                        }
                    });
                }
                else {
                    alert("Пароли не совпадают");
                }
            };
            _this.onEnter = function (event) {
                event.preventDefault();
                fetch("/?module=registration&action=Enter", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ login: _this.state.login, password: _this.state.password }),
                })
                    .then(function (data) { return data.json(); })
                    .then(function (result) {
                    if (result.status == "ok") {
                        _this.props.setEnter(result.id_curent_user);
                    }
                    else {
                        alert(result.message);
                    }
                });
            };
            _this.changeLogin = function (event) {
                _this.setState({ login: event.target.value });
            };
            _this.changePassword = function (event) {
                _this.setState({ password: event.target.value });
            };
            _this.changePasswordRepeat = function (event) {
                _this.setState({ password_repeat: event.target.value });
            };
            _this.changeNickName = function (event) {
                _this.setState({ nick: event.target.value });
            };
            _this.changeSkin = function (ev) {
                _this.setState({
                    type_skin: ev.target.value
                });
            };
            _this.state = {
                login: "",
                nick: "",
                password: "",
                password_repeat: "",
                register: false,
                type_skin: 1
            };
            return _this;
        }
        RegistrationComponent.prototype.renderSkinsPerosn = function () {
            var src = "./static/src/images/dragon/person" + this.state.type_skin + "/body.png";
            return React.createElement("div", { className: "reg__skins" },
                React.createElement("div", { className: "reg__container_avatar" },
                    React.createElement("img", { src: src, alt: "Skin" })),
                React.createElement("select", { onChange: this.changeSkin },
                    React.createElement("option", { value: "1" }, "\u0410\u0432\u0430\u0442\u0430\u0440 1"),
                    React.createElement("option", { value: "2" }, "\u0410\u0432\u0430\u0442\u0430\u0440 2"),
                    React.createElement("option", { value: "3" }, "\u0410\u0432\u0430\u0442\u0430\u0440 3")));
        };
        RegistrationComponent.prototype.render = function () {
            return (React.createElement("div", { className: "container-registration" },
                React.createElement("div", { className: "reg" },
                    React.createElement("div", { className: "reg__mode" },
                        React.createElement("a", { className: this.state.register ? "reg__showEnter " : "reg__showEnter reg__activeMode", onClick: this.showEnter }, "\u0412\u0445\u043E\u0434"),
                        React.createElement("a", { className: this.state.register ? "reg__showReg reg__activeMode" : "reg__showReg ", onClick: this.showReg }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")),
                    this.state.register ? (React.createElement("div", { className: "reg__inf" },
                        React.createElement("form", { className: "inputs" },
                            React.createElement("label", null,
                                React.createElement("span", { className: "inputs__label" }, " \u041D\u0438\u043A\u043D\u0435\u0439\u043C"),
                                " ",
                                React.createElement("input", { className: "btn_chat btn_chat-text", onChange: this.changeNickName, type: "text" })),
                            React.createElement("label", null,
                                React.createElement("span", { className: "inputs__label" }, "\u041B\u043E\u0433\u0438\u043D"),
                                " ",
                                React.createElement("input", { className: "btn_chat btn_chat-text", onChange: this.changeLogin, type: "text" })),
                            React.createElement("label", null,
                                React.createElement("span", { className: "inputs__label" }, "\u041F\u0430\u0440\u043E\u043B\u044C"),
                                " ",
                                React.createElement("input", { className: "btn_chat btn_chat-text", onChange: this.changePassword, type: "password" })),
                            React.createElement("label", null,
                                React.createElement("span", { className: "inputs__label" }, "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C"),
                                " ",
                                React.createElement("input", { className: "btn_chat btn_chat-text", onChange: this.changePasswordRepeat, type: "password" })),
                            React.createElement("input", { type: "button", className: "inputs__reg-btn btn_chat btn_chat-primal   ", onClick: this.onReg, value: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" })),
                        this.renderSkinsPerosn())) : (React.createElement("div", { className: "reg__inf" },
                        React.createElement("form", { className: "inputs" },
                            React.createElement("label", null,
                                React.createElement("span", { className: "inputs__label" }, "\u041B\u043E\u0433\u0438\u043D"),
                                " ",
                                React.createElement("input", { className: "btn_chat btn_chat-text", onChange: this.changeLogin, type: "text" })),
                            React.createElement("label", null,
                                React.createElement("span", { className: "inputs__label" }, "\u041F\u0430\u0440\u043E\u043B\u044C"),
                                " ",
                                React.createElement("input", { className: "btn_chat btn_chat-text", onChange: this.changePassword, type: "password" })),
                            React.createElement("input", { type: "button", className: "inputs__reg-btn btn_chat btn_chat-primal", onClick: this.onEnter, value: "\u0412\u043E\u0439\u0442\u0438" })))))));
        };
        return RegistrationComponent;
    }(React.Component));
    exports.RegistrationComponent = RegistrationComponent;
});
