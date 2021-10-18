

import React = require('react');

import { LevelEditorInterface } from './components/main_interface'

export class LevelEditor extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.getDesign();
        this.state = {
            is_open: false,
            design: []
        }
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.design != this.state.design)
    //         
    // }
    changeStateInterface = (ev) => {

        this.setState({
            is_open: !this.state.is_open
        });
    }
    getDesign = () => {
        fetch("/?module=office&action=Get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                id_office: 1
            }),
        })
            .then((data) => data.json())
            .then((result) => {
                console.log("LevelEditor", result);
                if (result.status == "ok") {
                    // 
                    console.log("JSON.parse(result.design) level", JSON.parse(result.design));
                    this.setState({
                        design: JSON.parse(result.design)
                    });
                    console.log("OK");
                } else {
                    alert(result.message);
                }
            });
    }
    clearDefault = (obj) => {

        obj.design = obj.design.filter(elem => {
            return elem.type != "default";
        });
        return obj;
    }
    saveВesign = (design) => {
        design = this.clearDefault(design);
        this.props.updateDesign(design);
        fetch("/?module=office&action=Save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                design: design,
                id_office: 1
            }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    // 
                    this.setState({
                        design: design
                    });
                    console.log("OK");
                } else {
                    alert(result.message);
                }
            });
    }
    render() {
        return <div className="level_editor_container">
            {!this.state.is_open ?
                <img className="level_editor_container__image_build" src="./static/src/images/build.png" onClick={this.changeStateInterface} alt="" />
                :
                <LevelEditorInterface changeStateInterface={this.changeStateInterface} design={this.state.design} saveВesign={this.saveВesign} />}
        </div>
    }
}

