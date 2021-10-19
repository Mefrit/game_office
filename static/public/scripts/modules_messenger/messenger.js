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
define(["require", "exports", "react", "./components/registration", "./components/scene"], function (require, exports, React, registration_1, scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            var _this = _super.call(this, props) || this;
            _this.setEnter = function (id_curent_user) {
                _this.setState({
                    enter: true,
                    id_curent_user: id_curent_user,
                });
            };
            _this.state = {
                enter: false,
                id_curent_user: -1,
            };
            _this.load_scene = false;
            return _this;
        }
        App.prototype.loadScene = function (update) {
            var _this = this;
            if (update === void 0) { update = false; }
            var url = "", tmp = {};
            fetch("/?module=GeoPosition&action=GetAllUsers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ data: { y: 5, x: 10, id_curent_user: this.state.id_curent_user } }),
            })
                .then(function (data) { return data.json(); })
                .then(function (result) {
                if (result.status == "ok") {
                    var arrPersons = result.online_users.map(function (elem) {
                        tmp = {};
                        tmp.url = './static/src/images/person1.png';
                        if (elem[3] != 1) {
                            tmp.url = './static/src/images/hola_1.png';
                        }
                        if (elem[2] == null) {
                            tmp.y = 4;
                        }
                        else {
                            tmp.y = elem[2];
                        }
                        if (elem[1] == null) {
                            tmp.x = 10;
                        }
                        else {
                            tmp.x = elem[1];
                        }
                        tmp.id = elem[0];
                        tmp.skin = elem[3];
                        tmp.nick = elem[4];
                        return tmp;
                    });
                    if (update) {
                        _this.props.updateScene(arrPersons, _this.state.id_curent_user);
                    }
                    else {
                        if (!_this.load_scene) {
                            _this.load_scene = true;
                            _this.props.loadScene(arrPersons, _this.state.id_curent_user);
                        }
                    }
                }
                else {
                    alert("ERROR " + result.message);
                }
            });
        };
        App.prototype.render = function () {
            var _this = this;
            if (this.state.enter) {
                this.loadScene(false);
                setInterval(function () {
                    _this.loadScene(true);
                }, 2000);
            }
            return (React.createElement("div", { className: "container" }, this.state.enter ? (React.createElement(scene_1.Scene, { id_curent_user: this.state.id_curent_user, updateDesign: this.props.updateDesign })) : (React.createElement(registration_1.RegistrationComponent, { setEnter: this.setEnter }))));
        };
        return App;
    }(React.Component));
    exports.App = App;
});
