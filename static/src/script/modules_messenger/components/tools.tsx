
import React from 'react'


interface toolsProps {
    openDialog: (id: number, nick: string) => void;
    searchUser: (nick: string) => void;
    users: any[];
    nick: string;
    friends_list: any[];
    id_sent: number | string;
    id_curent_user: number | string;
}
interface toolsState {
    search_nick: string;
}
export class ToolsComponent extends React.Component<toolsProps, toolsState> {
    constructor(props) {
        super(props);
        this.state = {
            search_nick: "",
        };
    }

    openDialog = (id_user, nick_interlocutor) => {
        this.props.openDialog(id_user, nick_interlocutor);
    };
    renderFriendsList(list, show_message_count) {
        return list.map((element) => {
            return (
                <li
                    key={element[0] + "list"}
                    onClick={(e) => {
                        this.openDialog(element[0], element[1]);
                    }}
                    className={element[0] == this.props.id_sent ? "dialog dialog_active" : "dialog "}
                >
                    <img className="dialog__image-profile" src="./static/src/images/profile.png" alt="profile" />
                    <span className="dialog__author">{element[1]} </span>
                    {show_message_count && !!element[2] ? (
                        <div className="dialog__numb-message"> {element[2]} </div>
                    ) : (
                        ""
                    )}
                </li>
            );
        });
    }
    changeSearchNick = (event) => {
        this.setState({
            search_nick: event.target.value,
        });
    };
    searchUser = (event) => {
        this.props.searchUser(this.state.search_nick);
    };
    render() {
        const users = this.props.users.filter((elem) => elem[0] != this.props.id_curent_user);
        return (
            <div className="container_tools">
                <div className="tools">
                    <h2 className="tools__nick">@{this.props.nick}</h2>
                    <h3 className="tools__label">Последние собеседники</h3>
                    <ul className="tools__history">{this.renderFriendsList(this.props.friends_list, true)}</ul>

                    <h3 className="tools__label">Список возможных собеседников</h3>
                    <div className="search-user">
                        <input
                            type="text"
                            className="btn_chat btn_chat-text"
                            placeholder="Введите никнейм "
                            onChange={this.changeSearchNick}
                        />
                        <input type="button" className="btn_chat btn_chat-primal" onClick={this.searchUser} value="Поиск" />
                    </div>
                    <ul className="dialog-container">{this.renderFriendsList(users, false)}</ul>
                </div>
            </div>
        );
    }
}
