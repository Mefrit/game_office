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
define(["require", "exports", "react", "react-dom"], function (require, exports, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DesckBoard = void 0;
    var DesckBoardReact = (function (_super) {
        __extends(DesckBoardReact, _super);
        function DesckBoardReact(props) {
            var _this = _super.call(this, props) || this;
            _this.close = function () {
                var modal = document.getElementById("openModal");
                modal.classList.remove("open_modal");
            };
            _this.deleteTask = function (id) {
                fetch("/?module=DeskBoard&action=DeleteRecord", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ id_record_delete: id }),
                })
                    .then(function (data) { return data.json(); })
                    .then(function (result) {
                    if (result.status == "ok") {
                        var tasks = _this.state.task.filter(function (elem) {
                            if (elem.id != id) {
                                return elem;
                            }
                        });
                        _this.setState({ task: tasks });
                    }
                    else {
                        alert(result.message);
                    }
                });
            };
            _this.addTask = function () {
                var task = _this.state.task;
                fetch("/?module=DeskBoard&action=AddRecord", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ title: _this.state.title, description: _this.state.description, owner: _this.state.owner }),
                })
                    .then(function (data) { return data.json(); })
                    .then(function (result) {
                    if (result.status == "ok") {
                        task.push({ title: _this.state.title, description: _this.state.description, owner: _this.state.owner, id: result.id_record });
                        _this.setState({
                            task: task,
                            owner: '',
                            title: '',
                            description: ''
                        });
                    }
                    else {
                        alert(result.message);
                    }
                });
            };
            _this.changeOwner = function (ev) {
                _this.setState({
                    owner: ev.target.value
                });
            };
            _this.changeTitle = function (ev) {
                _this.setState({
                    title: ev.target.value
                });
            };
            _this.changeDescription = function (ev) {
                _this.setState({
                    description: ev.target.value
                });
            };
            _this.state = {
                task: [],
                owner: '',
                title: '',
                description: ''
            };
            return _this;
        }
        DesckBoardReact.prototype.componentDidMount = function () {
            var _this = this;
            fetch("/?module=DeskBoard&action=GetRecord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ title: this.state.title, description: this.state.description, owner: this.state.owner }),
            })
                .then(function (data) { return data.json(); })
                .then(function (result) {
                if (result.status == "ok") {
                    var tasks = result.tasks.map(function (elem) {
                        return {
                            id: elem[0],
                            owner: elem[1],
                            title: elem[2],
                            description: elem[3]
                        };
                    });
                    _this.setState({ task: tasks });
                }
                else {
                    alert(result.message);
                }
            });
        };
        DesckBoardReact.prototype.rendertask = function () {
            var _this = this;
            return this.state.task.map(function (elem) {
                return React.createElement("div", { className: "task" },
                    React.createElement("div", { className: "task__info" },
                        React.createElement("span", { className: "modal-content__owner" },
                            "\u041A\u043E\u043C\u0443 - ",
                            elem.owner),
                        React.createElement("span", { className: "modal-content__title" },
                            "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 -",
                            elem.title),
                        React.createElement("input", { type: "button", onClick: function () { _this.deleteTask(elem.id); }, value: "x" })),
                    React.createElement("span", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
                    React.createElement("p", { className: "task__description" }, elem.description));
            });
        };
        DesckBoardReact.prototype.renderInterface = function () {
            return React.createElement("div", { className: "interface" },
                React.createElement("div", { className: "interface__taskInfo" },
                    React.createElement("label", null,
                        "\u041F\u0440\u0435\u0434\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443: ",
                        React.createElement("input", { type: "text", value: this.state.owner, onChange: this.changeOwner, className: "interface__owner" })),
                    React.createElement("label", null,
                        "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438: ",
                        React.createElement("input", { type: "text", value: this.state.title, onChange: this.changeTitle, className: "interface__owner" }))),
                React.createElement("label", { className: "interface__description-container" },
                    "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435  \u0437\u0430\u0434\u0430\u0447\u0438",
                    React.createElement("textarea", { value: this.state.description, className: "interface__description", onChange: this.changeDescription, id: "" })),
                React.createElement("input", { type: "button", onClick: this.addTask, className: "interface__btn-add", value: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443" }));
        };
        DesckBoardReact.prototype.render = function () {
            return React.createElement("div", { className: "modal-content" },
                React.createElement("div", { className: "modal-content__header" },
                    React.createElement("h3", null, "\u0417\u0430\u0434\u0430\u0447\u0438"),
                    React.createElement("input", { type: "button", className: "modal-content__cancel", onClick: this.close, value: "x" })),
                React.createElement("div", { className: "modal-content__task-container" }, this.rendertask()),
                React.createElement("div", { className: "modal-content__interactive" }, this.renderInterface()));
        };
        return DesckBoardReact;
    }(React.Component));
    var DesckBoard = (function () {
        function DesckBoard(props) {
            this.init();
        }
        DesckBoard.prototype.init = function () {
            var modal = document.getElementById("openModal");
            modal.classList.add("open_modal");
            var modal_content = document.getElementById("modal-content-id");
            ReactDOM.render(React.createElement(DesckBoardReact, null), modal_content);
        };
        return DesckBoard;
    }());
    exports.DesckBoard = DesckBoard;
});
