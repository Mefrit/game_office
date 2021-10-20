import React from 'react'
import { ElemOfCategory } from "./elem_of_category";
import { BuildArea } from "./build_area";
export class LevelEditorInterface extends React.Component<any, any>{
    categories: any[];
    size_w: number;
    size_h: number;
    constructor(props) {
        super(props);

        this.state = {
            chosen_element: false,
            // FIX ME не очень красиво называется
            categories: [],
            cache_elements: this.props.design.design
        }
        this.size_w = this.props.design.size_w;
        this.size_h = this.props.design.size_h;


    }
    componentDidMount() {
        fetch("/?module=office&action=GetLevelEditorCategories", {
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

                if (result.status == "ok") {
                    this.setState({ categories: result.categories });
                } else {
                    alert("ERROR: " + result.message);
                }
            });

    }
    choseElement = (element) => {
        console.log("element", element);

        this.setState({
            chosen_element: element
        });
    }
    renderCategories() {
        return this.state.categories.map(elem => {
            return <li><ElemOfCategory elem={elem} chosen_src={this.state.chosen_element.src} choseElement={this.choseElement} /></li>
        });
    }
    setCacheElements = (cache_elements) => {
        this.setState({
            cache_elements: cache_elements
        });
    }
    saveВesign = () => {
        this.props.saveВesign({ design: this.state.cache_elements, size_w: this.size_w, size_h: this.size_h });
    }
    updateSizeArea = (name, value) => {
        console.log("updateSizeArea", name, value);
        this[name] = value;
    }
    render() {
        return <div className="level_editor__interface">
            <div className="interface__header">

                <h1>Interface Level Bulding</h1>
                <input type="button" className="interface__btn" value="x" onClick={this.props.changeStateInterface} />
            </div>
            <div className="interface__content">
                <div className="interface__rings"></div>
                <ul className="interface__list_thinks"> {this.renderCategories()}</ul>

                <BuildArea
                    updateSizeArea={this.updateSizeArea}
                    chosen_element={this.state.chosen_element}
                    setCacheElements={this.setCacheElements}
                    cache_interface_elements={this.state.cache_elements}
                    size_w={this.size_w}
                    size_h={this.size_h}
                />
            </div>
            <input type="button" className="interface__btn" value="Сохранить дизайн" onClick={this.saveВesign} />
        </div>
    }
}

