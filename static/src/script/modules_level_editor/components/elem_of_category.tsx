
import React from 'react'



export class ElemOfCategory extends React.Component<any, any>{
    categories: any[];
    constructor(props) {
        super(props);
        this.state = {
            show_elements: false
        }
    }
    renderAssets() {
        return this.props.elem.cache_elements.map(elem => {
            return <li key={elem.title + elem.src} onClick={() => { this.props.choseElement(elem) }} className={this.props.chosen_src == elem.src ? 'category_element category_element-chosen' : 'category_element'}>
                <h4>{elem.title}</h4>
                <img src={elem.src} className="category_element__image" alt={elem.title} />
            </li>
        });
    }
    changeStateInterface = () => {
        this.setState({
            show_elements: !this.state.show_elements
        });
    }
    render() {

        return <div className='category'>
            <span className="category__title" onClick={this.changeStateInterface}>{this.props.elem.name}</span>
            {this.state.show_elements ? <ul className="category__list">{this.renderAssets()}</ul> : ""}
        </div>;
    }
}