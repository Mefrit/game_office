
import React from 'react'
export class BuildArea extends React.Component<any, any>{
    categories: any[];
    constructor(props) {
        super(props);
        this.state = {
            cache_interface_elements: this.props.cache_interface_elements,
            chosen_ceil: false,
            size_w: this.props.size_w,
            size_h: this.props.size_h,
            chose_ceil_x: -1,
            chose_ceil_y: -1
        }
    }
    addElelmentInterface2Cache = (chosen_element, cache_interface_elements) => {
        let add = true;

        cache_interface_elements.forEach((element, i, arr) => {
            if (element.x == chosen_element.x && element.y == chosen_element.y) {
                cache_interface_elements[i] = chosen_element;
                add = false;
            }
        });
        if (add) {
            cache_interface_elements.push(chosen_element);
        }
        return cache_interface_elements;
    }
    setChosenCeil = (x, y) => {
        let chosen_element_from_props = JSON.parse(JSON.stringify(this.props.chosen_element)), cache_interface_elements = this.state.cache_interface_elements;
        if (chosen_element_from_props) {
            chosen_element_from_props.x = x;
            chosen_element_from_props.y = y;
            chosen_element_from_props.id = x + "_" + y * 10;
            cache_interface_elements = this.addElelmentInterface2Cache(chosen_element_from_props, cache_interface_elements);
        }
        this.props.setCacheElements(cache_interface_elements);
        this.setState({
            chose_ceil_x: x,
            chose_ceil_y: y,
            cache_interface_elements: cache_interface_elements
        });
    }
    getSrcCeil(x, y, cache_elements) {
        let src = "./static/src/images/block1.png";
        cache_elements.forEach(element => {
            if (element.x == x && element.y == y) {
                src = element.src;
            }
        });
        return src;
    }
    getCeils(size_w, i) {
        let result: any[] = [];
        let is_chosen = false, src;
        for (let j = 0; j < size_w; j++) {
            is_chosen = this.state.chose_ceil_x == j && this.state.chose_ceil_y == i;
            src = this.getSrcCeil(j, i, this.state.cache_interface_elements);

            result.push(<td onClick={() => { this.setChosenCeil(j, i) }} className={is_chosen ? "area_table__ceils area_table__ceils-chosen" : "area_table__ceils"}><img src={src} /></td>);
        }
        return result;
    }
    renderArea() {
        let result: any = [];
        for (let i = 0; i < this.state.size_h; i++) {
            result.push(<tr>{this.getCeils(this.state.size_w, i)}</tr>);
        }
        return result;
    }
    deleteElements(cache_interface_elements, name_side, value) {
        return cache_interface_elements.filter(elem => {
            return elem[name_side] < value;
        })
    }
    changeTableSize = (name_param, value) => {
        let cache_interface_elements = this.state.cache_interface_elements;
        cache_interface_elements = this.deleteElements(cache_interface_elements, name_param == "size_w" ? "x" : "y", value);
        this.props.setCacheElements(cache_interface_elements);
        this.props.updateSizeArea(name_param, value);
        this.setState({
            [name_param]: value,
            chose_ceil_x: -1,
            chose_ceil_y: -1,
            cache_interface_elements: cache_interface_elements
        });
    }
    render() {
        return <div className="area">
            <div className='area-column'>
                <div className='area-row'>
                    <table> {this.renderArea()}</table>
                    <div>
                        <input type="button" className="interface__btn" value="+" onClick={() => {
                            this.changeTableSize("size_w", this.state.size_w + 1);
                        }} />
                        <input type="button" className="interface__btn" value="-" onClick={() => {
                            this.changeTableSize("size_w", this.state.size_w - 1);
                        }} />

                    </div>
                </div>
                <div>
                    <input type="button" className="interface__btn" value="+" onClick={() => {
                        this.changeTableSize("size_h", this.state.size_h + 1);
                    }} />
                    <input type="button" className="interface__btn" value="-" onClick={() => {
                        this.changeTableSize("size_h", this.state.size_h - 1);
                    }} />
                </div>
            </div>
        </div>
    }
}