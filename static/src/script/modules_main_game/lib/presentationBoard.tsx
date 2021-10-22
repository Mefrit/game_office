import React from 'react'
import ReactDOM from 'react-dom'
import * as io from 'socket.io-client';
class DesckBoardReact extends React.Component<any, any> {
    is_admin: boolean;
    socket: any
    constructor(props: any) {
        //FIX ME переписать на сокеты
        super(props);
        this.is_admin = true;
        // this.socket = null;
        // this.socket = io.connect('http://' + document.domain + ':' + location.port);
        this.socket = io.connect("http://localhost:5000");
        this.socket.on('after connect', function (data) {
            console.log("after connect", data);
        });
        this.socket.on('chat message', function (msg) {
            alert(msg)
        });

        this.socket.on('output', function (msg) {
            alert(msg)

        });
        this.socket.on('connect', function () {
            console.log("Connected to WS server");

            console.log(this.socket.connected);

        });
        this.socket.on('any event', function (msg) {
            console.log("any event", msg);
        });
        this.state = {
            list_presentations: [],
            curent_url: "",
            num_slide: 0,
            count_slides: 0,
            id_presentation: 1,
            presentation_title: 1
        }
    }
    close = () => {
        let modal: any = document.getElementById("openModal");
        modal.classList.remove("open_modal");
    }
    loadPresentation = (id_presentation: any, num_slide = this.state.num_slide) => {
        fetch("/?module=PresentationBoard&action=GetUrlByNum", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                id_presentation: id_presentation,
                num_slide: num_slide
            }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    //сообщение что успешно все отправлено

                    this.setState({ curent_url: result.curent_url, count_slides: result.count_slides, num_slide: num_slide });
                } else {
                    alert(result.message);
                }
            });
    }

    checkChangeSlide = (id_presentation: any, num_slide = this.state.num_slide) => {
        fetch("/?module=PresentationBoard&action=GetUrlByNum", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                id_presentation: id_presentation,
                num_slide: num_slide
            }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    //сообщение что успешно все отправлено
                    this.setState({ curent_url: result.curent_url, count_slides: result.count_slides, num_slide: num_slide });
                } else {
                    alert(result.message);
                }
            });
    }
    componentDidMount() {
        // запрос на все презентации в проекте
        this.setState({
            list_presentations: [{ id_presentation: 1, title: "Котики" }, { id_presentation: 1, title: "Котики 2" }]
        });
    }

    changeSlide = (num_slide: number) => {
        console.log("nnot socker((( ");
        this.socket.emit('send-msg', "123123");
        if (num_slide >= 0 && num_slide <= this.state.count_slides) {
            this.loadPresentation(this.state.id_presentation, num_slide);
        }
    }
    renderWindow() {
        return <div className="presentation">
            {this.state.curent_url == "" ?
                <h3>Выберите презентацию</h3>
                :
                <div className="presentation__interface" >
                    <input type="button" value="<" onClick={() => { this.changeSlide(this.state.num_slide - 1) }} />
                    <img src={this.state.curent_url} alt="Slide" />
                    <input type="button" value=">" onClick={() => { this.changeSlide(this.state.num_slide + 1) }} />
                </div >}

        </div >

    }
    chosePresentation = (ev: { target: { value: any; }; }) => {
        this.loadPresentation(ev.target.value, 0);
    }
    renderListPresentation() {
        return this.state.list_presentations.map((elem: { id_presentation: string | number | readonly string[] | undefined; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
            return <option value={elem.id_presentation}>{elem.title}</option>
        })
    }
    sokets = () => {
        // this.socket = io.connect('http://' + document.domain + ':' + location.port + "/chat");

        console.log(this.socket);
        this.socket.emit('chat message', '123123');
        // this.socket.on('connect', function (data) {
        //     console.log("connect", data);
        //     this.socket.emit('send_message', { message: "test1" });
        //     this.socket.emit('my event', { message: "test2" });
        //     this.socket.emit('new user', { message: "test3" });
        //     this.socket.emit('send message', { 'message': "message", 'channel': "channel" });
        //     this.socket.emit('send-msg', "123123");
        // });

        console.log("HEREEE1");
    }
    render() {
        return <div className="modal-content">
            <div className="modal-content__header">
                <h3>Список презентаций</h3>

                {/* <input type="button" value="sent" onClick={this.sokets} /> */}
                <input type="button" className="modal-content__cancel" onClick={this.close} value="x" />
                <select onChange={this.chosePresentation} name="" id="">
                    <option disabled selected value="#">Список презентаций</option>
                    {this.renderListPresentation()}

                </select>
            </div>
            {this.renderWindow()}
        </div >;
    }
}

export class Presentation {
    data: any;
    constructor() {

    }
    init() {

        let modal: any = document.getElementById("openModal");
        modal.classList.add("open_modal");
        let modal_content = document.getElementById("modal-content-id");
        // запрос на данные
        ReactDOM.render(<DesckBoardReact />, modal_content);
    }
}
