import * as React from "react";
import { ElemOfCategory } from "./elem_of_category";
import { BuildArea } from "./build_area";
export class LevelEditorInterface extends React.Component<any, any>{
    categories: any[];
    size_w: number;
    size_h: number;
    constructor(props) {
        super(props);
        console.log(" LevelEditorInterface this.props", this.props);
        this.state = {
            chosen_element: false,
            // FIX ME не очень красиво называется
            cache_elements: this.props.design.design
        }
        this.size_w = this.props.design.size_w;
        this.size_h = this.props.design.size_h;
        // FIX ME убрать в файл настройки
        this.categories = [{
            name: "Интерьер",
            cache_elements: [
                {
                    type: "table",
                    title: "стол_оффисный_1",
                    src: "./static/src/images/table.png"
                }, {
                    type: "table",
                    title: "стол_оффисный_2",
                    src: "./static/src/images/table2.png"
                }, {
                    type: "kitchen",
                    title: "стол",
                    src: "./static/src/images/plita.png"
                }, {
                    type: "kitchen",
                    title: "элемент кухни",
                    src: "./static/src/images/wardrobe.png"
                }, {
                    type: "kitchen",
                    title: "холодильник_1",
                    src: "./static/src/images/icebox_2.png"
                }, {
                    type: "kitchen",
                    title: "холодильник_2",
                    src: "./static/src/images/icebox_1.png"
                }, {
                    type: "wall",
                    title: "Кресло 1",
                    src: "./static/src/images/divan1.png"
                }, {
                    type: "wall",
                    title: "Кресло 2",
                    src: "./static/src/images/divan-abort.png"
                }
            ]
        }, {
            name: "Стены",
            cache_elements: [
                {
                    type: "wall",
                    title: "стена горизонтальная",
                    src: "./static/src/images/walls_gor.png"
                },
                {
                    type: "wall",
                    title: "стена вертикальная",
                    src: "./static/src/images/walls.png"
                },
                {
                    type: "wall",
                    title: "угол",
                    src: "./static/src/images/walls-angle.png"
                },
                {
                    type: "wall",
                    title: "угол",
                    src: "./static/src/images/walls-angle2.png"
                },
                {
                    type: "wall",
                    title: "угол",
                    src: "./static/src/images/walls-angle3.png"
                },
                {
                    type: "wall",
                    title: "угол",
                    src: "./static/src/images/walls-angle4.png"
                },
                {
                    type: "wall",
                    title: "двойной угол",
                    src: "./static/src/images/walls-angle_tripple1.png"
                },
                {
                    type: "wall",
                    title: "двойной угол",
                    src: "./static/src/images/walls-angle_tripple2.png"
                },
                {
                    type: "wall",
                    title: "двойной угол",
                    src: "./static/src/images/walls-angle_tripple3.png"
                }, {
                    type: "wall",
                    title: "двойной угол",
                    src: "./static/src/images/walls-angle_tripple4.png"
                }
                // walls-angle_tripple4.png
            ]
        }, {
            name: "Функциональные элементы",
            cache_elements: [
                {
                    type: "desck",
                    title: "Task Boeard_1",
                    src: "./static/src/images/desck1.png"
                }, {
                    type: "desck",
                    title: "Task Boeard_2",
                    src: "./static/src/images/desck2.png"
                }, {
                    type: "desck",
                    title: "Task Boeard_3",
                    src: "./static/src/images/desck3.png"
                }, {
                    type: "desck",
                    title: "Task Boeard_4",
                    src: "./static/src/images/desck4.png"
                }
            ]
        }, {
            name: "Игры",
            cache_elements: [
                {
                    type: "game",
                    title: "Элемент от игры_1",
                    src: "./static/src/images/game_2.png"
                },
                {
                    type: "game",
                    title: "Элемент от игры_2",
                    src: "./static/src/images/game_1.png"
                },
                {
                    type: "game",
                    title: "Элемент от игры_1",
                    src: "./static/src/images/game_21.jpg"
                },
                {
                    type: "game",
                    title: "Элемент от игры_2",
                    src: "./static/src/images/game_22.jpg"
                }
            ]
        }, {
            name: "Пол",
            cache_elements: [
                {
                    type: "default",
                    title: "Пол",
                    src: "./static/src/images/block1.png"
                }
            ]
        }]
    }
    choseElement = (element) => {
        console.log("element", element);

        this.setState({
            chosen_element: element
        });
    }
    renderCategories() {
        return this.categories.map(elem => {
            return <li><ElemOfCategory elem={elem} chosen_src={this.state.chosen_element.src} choseElement={this.choseElement} /></li>
        });
    }
    setCacheElements = (cache_elements) => {
        this.setState({
            cache_elements: cache_elements
        });
    }
    saveВesign = () => {
        // console.log(this.state.cache_elements);

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
                <input type="button" value="x" onClick={this.props.changeStateInterface} />
            </div>
            <div className="interface__content">
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
            <input type="button" value="Сохранить дизайн" onClick={this.saveВesign} />
        </div>
    }
}

