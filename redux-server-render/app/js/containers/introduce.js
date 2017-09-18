import React from 'react';
import { createSelector } from 'reselect'
import { connect } from 'react-redux'

import mixins from '../modules/mixins';
import Introduce from '../components/introduce';
import {fetchList} from '../state/actions/index'
import Header from '../components/header'

const data = (state) => {
    return state;
};

const mapStateToProps= createSelector(
    [data],
    (data) => {
        return data;
    }
)

class Introducer extends React.Component { 
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this)
        this.mixins = mixins.bind(this)();
    }
    getData() {
        const path = location.href.replace(/\?.*$/, '').replace(/^\//, '').replace(/\/$/, '').split('/');
        let param = path[path.length - 1];
        this.props.dispatch(fetchList(param));
    }
    componentDidMount() {
       this.mixins.whetherFetch();
    }
    shouldComponentUpdate(nextProp, nextState) {
        return this.props.children !== nextProp.children
        || this.props[this.mixins.getProps()] !== nextProp[this.mixins.getProps()];
    }
    render() {
        let content;
        let data = this.props[this.mixins.getProps()];

        if (data) content = <Introduce data={data} />;

        return ( < div  className='g-body'>
             <Header title='书籍详情' route={this.props.route} />
            { content }
            { this.props.children } < /div>
        );
    }
}

export default connect(mapStateToProps)(Introducer)