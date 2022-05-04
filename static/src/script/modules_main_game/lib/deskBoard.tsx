import React from 'react'
import ReactDOM from 'react-dom'

class DesckBoardReact extends React.Component<any, any> {
    id_customer: any;
    constructor(props) {
        super(props);
        this.id_customer = this.props.id_customer;
        this.state = {
            tasks: [],
            users: [],
            id_owner: -1,
            title: '',
            description: '',
            price: 0,
            time_end: ""
        }
    }
    close = () => {
        let modal: any = document.getElementById("openModal_deskBoard");
        modal.classList.remove("open_modal");
    }
    componentDidMount(): void {
        fetch("/?module=DeskBoard&action=GetInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ title: this.state.title, description: this.state.description, id_owner: this.state.id_owner }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    //сообщение что успешно все отправлено
                    let tasks = result.tasks.map(elem => {
                        return {
                            id: elem[0],
                            id_owner: elem[1],
                            title: elem[2],
                            description: elem[3],
                            id_customer: elem[4],
                            price: elem[5],
                            time_end: elem[6]
                        }
                    })
                    let users = result.users.map(elem => {
                        return {
                            id: elem[0],
                            nick: elem[1]
                        }
                    })
                    this.setState({ tasks: tasks, users: users, id_owner: users[0].id });
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
                    let tasks = this.state.tasks.filter(elem => {
                        if (elem.id != id) {
                            return elem;
                        }
                    })
                    this.setState({ tasks: tasks });
                } else {
                    alert(result.message);
                }
            });

    }
    getNickById(id_owner, users) {
        let user = users.filter(elem => {

            return elem.id == id_owner;
        });
        if (user[0]) {
            return user[0].nick;
        } else {
            return "Пользователь удален"
        }

    }
    rendertask() {
        return this.state.tasks.map(elem => {
            return <div className="task">
                <div className="task__name-top"></div>
                <div className="task__info">
                    <span className="modal-content__owner">Кому - {this.getNickById(elem.id_owner, this.state.users)}</span>
                    <span className="modal-content__title">Название -{elem.title}</span>
                </div>
                <label>Дедлайн: <input type="date" value={elem.time_end} /></label>
                <label>Оцениваемая сложность: <h5>{elem.price}</h5></label>
                {
                    this.id_customer == elem.id_customer ?
                        <input type="button" className="task__close_task" onClick={() => { this.deleteTask(elem.id) }} value="Закрыть задачу" /> : ""}
                <span>Описание</span>
                <p className="task__description">
                    {elem.description}
                </p>
            </div>
        })
    }
    addTask = () => {
        let tasks = this.state.tasks;

        let loaded_task = {
            id_customer: this.id_customer,
            title: this.state.title,
            description: this.state.description,
            id_owner: this.state.id_owner,
            time_end: this.state.time_end,
            price: this.state.price
        };
        fetch("/?module=DeskBoard&action=AddRecord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },

            body: JSON.stringify(loaded_task),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    //сообщение что успешно все отправлено
                    tasks.push(loaded_task);
                    this.setState({
                        tasks: tasks,
                        id_owner: '',
                        title: '',
                        description: '',
                        time_end: '',
                        price: 0
                    });
                } else {
                    alert(result.message);
                }
            });

    }
    changeOwner = (ev) => {
        this.setState({
            id_owner: ev.target.value
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
    renderUses(users) {
        return users.map(elem => {
            return <option value={elem.id}>{elem.nick}</option>
        });
    }
    changePrice = (ev) => {
        this.setState({
            price: ev.target.value
        });
    }
    changeData = (ev) => {
        this.setState({
            time_end: ev.target.value
        });
    }

    renderInterface() {
        return <div className="interface">
            <div className="interface__taskInfo">
                <label>Предать задачу:  <select className="interface__owner" onChange={this.changeOwner} >
                    {this.renderUses(this.state.users)}
                </select></label>
                <label>Название задачи: <input type="text" value={this.state.title} onChange={this.changeTitle} className="interface__owner" /></label>
            </div>
            <div className="interface__taskInfo">
                <label>Оценка сложности задачи: <input type="number" max="5" min="0" value={this.state.price} onChange={this.changePrice} className="interface__owner" /> XP</label>
                <label>Дедлайн для задачи: <input type="date" value={this.state.time_end} onChange={this.changeData} className="interface__owner" /></label>
            </div>
            <label className="interface__description-container" >
                Описание  задачи
                <textarea value={this.state.description} className="interface__description" onChange={this.changeDescription} id="" ></textarea>
            </label>

            <input type="button" onClick={this.addTask} className="interface__btn-add" value="Добавить задачу" />
        </div>
    }
    render() {
        return <div className="modal-content modal-content-deskboard">
            < div className="modal-content__header modal-content__header-tasks" >
                <h3>Задачи</h3>
                <input type="button" className="modal-content__cancel" onClick={this.close} value="x" />
            </div >

            <div className="modal-content__task-container">{this.rendertask()}</div>
            <div className={"modal-content__interactive"}>
                {this.renderInterface()}
            </div>
        </div >;
    }
}

export class DesckBoard {

    id_customer: number;
    constructor(id_customer) {
        this.id_customer = id_customer;
    }
    init() {

        let modal: any = document.getElementById("openModal_deskBoard");
        modal.classList.add("open_modal");
        let modal_content = document.getElementById("modal-content-id-openModal_deskBoard");
        console.log(modal_content);
        // запрос на данные
        ReactDOM.render(<DesckBoardReact id_customer={this.id_customer} />, modal_content);
    }
}
