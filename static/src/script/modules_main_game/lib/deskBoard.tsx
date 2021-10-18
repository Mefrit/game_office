// import * as React from "react";
// import * as ReactDOM from "react-dom";

import React = require('react');
import ReactDOM = require('react-dom');

class DesckBoardReact extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            task: [],
            owner: '',
            title: '',
            description: ''
        }
    }
    close = () => {
        let modal: any = document.getElementById("openModal");
        modal.classList.remove("open_modal");
    }
    componentDidMount() {
        fetch("/?module=DeskBoard&action=GetRecord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ title: this.state.title, description: this.state.description, owner: this.state.owner }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    //сообщение что успешно все отправлено
                    let tasks = result.tasks.map(elem => {
                        return {
                            id: elem[0],
                            owner: elem[1],
                            title: elem[2],
                            description: elem[3]
                        }
                    })
                    this.setState({ task: tasks });
                } else {
                    alert(result.message);
                }
            });

    }
    deleteTask = (id) => {
        fetch("/?module=DeskBoard&action=DeleteRecord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ id_record_delete: id }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    //сообщение что успешно все отправлено
                    let tasks = this.state.task.filter(elem => {
                        if (elem.id != id) {
                            return elem;
                        }
                    })
                    this.setState({ task: tasks });
                } else {
                    alert(result.message);
                }
            });

    }
    rendertask() {
        return this.state.task.map(elem => {

            return <div className="task">
                <div className="task__info">
                    <span className="modal-content__owner">Кому - {elem.owner}</span>
                    <span className="modal-content__title">Название -{elem.title}</span>
                    <input type="button" onClick={() => { this.deleteTask(elem.id) }} value="x" />
                </div>
                <span>Описание</span>
                <p className="task__description">

                    {elem.description}
                </p>

            </div>
        })
    }
    addTask = () => {
        let task = this.state.task;

        fetch("/?module=DeskBoard&action=AddRecord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ title: this.state.title, description: this.state.description, owner: this.state.owner }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    //сообщение что успешно все отправлено
                    task.push({ title: this.state.title, description: this.state.description, owner: this.state.owner, id: result.id_record });
                    this.setState({
                        task: task,
                        owner: '',
                        title: '',
                        description: ''
                    });
                } else {
                    alert(result.message);
                }
            });

    }
    changeOwner = (ev) => {
        this.setState({
            owner: ev.target.value
        });
    }
    changeTitle = (ev) => {
        this.setState({
            title: ev.target.value
        });
    }
    changeDescription = (ev) => {
        this.setState({
            description: ev.target.value
        });
    }
    renderInterface() {
        return <div className="interface">
            <div className="interface__taskInfo">
                <label>Предать задачу: <input type="text" value={this.state.owner} onChange={this.changeOwner} className="interface__owner" /></label>
                <label>Название задачи: <input type="text" value={this.state.title} onChange={this.changeTitle} className="interface__owner" /></label>

            </div>
            <label className="interface__description-container" >
                Описание  задачи
                <textarea value={this.state.description} className="interface__description" onChange={this.changeDescription} id="" ></textarea>
            </label>

            <input type="button" onClick={this.addTask} className="interface__btn-add" value="Добавить задачу" />
        </div>
    }
    render() {
        return <div className="modal-content">
            <div className="modal-content__header">
                <h3>Задачи</h3>
                <input type="button" className="modal-content__cancel" onClick={this.close} value="x" />
            </div>

            <div className="modal-content__task-container">{this.rendertask()}</div>
            <div className={"modal-content__interactive"}>
                {this.renderInterface()}
            </div>
        </div>;
    }
}

export class DesckBoard {
    data: any;
    constructor(props) {

        this.init();
    }
    init() {

        let modal: any = document.getElementById("openModal");
        modal.classList.add("open_modal");
        let modal_content = document.getElementById("modal-content-id");
        // запрос на данные
        ReactDOM.render(<DesckBoardReact />, modal_content);
    }
}
