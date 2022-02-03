import React from 'react'
import ReactDOM from 'react-dom'
import { io } from 'socket.io-client'
// const io = require("socket.io")({
//     serveClient: false
// });


class PresentationReact extends React.Component<any, any> {
    is_admin: boolean;
    socket: any
    constructor(props: any) {
        //FIX ME переписать на сокеты
        super(props);
        this.is_admin = true;
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
        // this.socket.emit('send-msg', "123123");
        if (num_slide >= 0 && num_slide <= this.state.count_slides) {
            this.loadPresentation(this.state.id_presentation, num_slide);
        }
    }
    renderWindow() {
        return <div className="presentation">
            {this.state.curent_url == "" ?
                <h4>Выберите презентацию</h4>
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
        this.socket.emit('chat message', '123123');
    }
    render() {
        return <div className="modal-content  modal-content-presentation">
            <div className="modal-content__header">
                <div className='presentation-header'>
                    <h3>Список презентаций</h3>
                    {/* <input type="button" value="sent" onClick={this.sokets} /> */}
                    <input type="button" className="modal-content__cancel" onClick={this.close} value="x" />
                </div>
                <select className='presentation-list' onChange={this.chosePresentation} name="" id="">
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
        // let socket = io({ autoConnect: false });

        // var socket_io = io.connect('http://localhost:5000');
        // var socket_io = io();
        // // console.log("connection !!!!!! ", socket);
        // console.log('init1!!!!!!!!!!! ', socket_io);
        // socket_io.on('connect', function () {
        //     console.log('iconnexct !!!!!!!!! ', socket_io);
        //     socket_io.emit('test', { data: 'connected to the SocketServer...' });
        // });
        // socket_io.emit('test', { data: 'connected to the SocketServer...' });
        // socket_io.on('connection', (socket) => {
        //     console.log('a user connected !!!!!!!');
        //     socket.on('disconnect', () => {
        //         console.log('user disconnected');

        //     });
        //     socket.emit('test', { test: "Hello" }); // emit an event to all connected sockets
        //     socket.on('test_client', (socket) => {
        //         console.log('test_client 1');
        //         // socket.emit('test', /* … */); // emit an event to all connected sockets
        //     });
        // });
        // socket_io.on('test_client', (socket) => {
        //     console.log('test_client 2');
        //     // socket.emit('test', /* … */); // emit an event to all connected sockets
        // });
        // socket_io.on('test', (socket) => {
        //     console.log("Test");
        // });
        // socket_io.on('test', (socket) => {
        //     console.log("Test");
        // });
        // socket_io.emit('test', { test: "Hello" });
        // io.on('connection', socket => {
        //     socket.emit('request', /* … */); // emit an event to the socket
        //     io.emit('broadcast', /* … */); // emit an event to all connected sockets
        //     socket.on('reply', () => { /* … */ }); // listen to the event
        // });


        let modal: any = document.getElementById("openModal");
        modal.classList.add("open_modal");
        let modal_content = document.getElementById("modal-content-id");
        // запрос на данные
        ReactDOM.render(<PresentationReact />, modal_content);
    }
}
