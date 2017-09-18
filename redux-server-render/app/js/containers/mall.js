import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import mixins from '../modules/mixins';
import {fetchList} from '../state/actions/index'
import Mall from '../components/mall';
import Nav from '../components/nav';

const data = (state) => {
    return state;
};

const mapStateToProps= createSelector(
    [data],
    (data) => {
        return data;
    }
)

class Maller extends React.Component { 
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this)
        this.mixins = mixins.bind(this)();
    }
    shouldComponentUpdate(nextProp, nextState) {
        return this.props.children !== nextProp.children
        || this.props[this.mixins.getProps()] !== nextProp[this.mixins.getProps()]
        || this.props.params.page !== nextProp.params.page;
    }
    getData() {
        const path = location.href.replace(/\?.*$/, '').replace(/^\//, '').replace(/\/$/, '').split('/');
        let param = path[path.length - 1];
        const queue = [this.props.dispatch(fetchList('group.1.1')),this.props.dispatch(fetchList(param))];
        Promise.all(queue);
    }
    componentDidUpdate() {
       this.mixins.whetherFetch();
    }
    render() {
        let content,data = this.props[this.mixins.getProps()],nav;

        if (this.mixins.isRouter() && data) {
            content = <Mall data={data} />
        }

        if (this.mixins.isRouter() && this.props['group.1.1']) {
            nav = <Nav data={ this.props['group.1.1'] } />
        }
        
        return ( < div className='g-body'>
              { nav }
              { content }
              { this.props.children } < /div>
        );
    }
}

// const Maller = React.createClass({
//     mixins: [mixins()],
//     shouldComponentUpdate(nextProp, nextState) {
//         return this.props.children !== nextProp.children
//         || this.props[this.getProps()] !== nextProp[this.getProps()]
//         || this.props.params.page !== nextProp.params.page;
//     },
//     getData() {
//         const path = location.href.replace(/\?.*$/, '').replace(/^\//, '').replace(/\/$/, '').split('/');
//         let param = path[path.length - 1];
//         const queue = [this.props.dispatch(fetchList('group.1.1')),this.props.dispatch(fetchList(param))];
//         Promise.all(queue);
//     },
//     componentDidUpdate() {
//        this.whetherFetch();
//     },
//     render() {
//         let content,data = this.props[this.getProps()],nav;

//         if (this.isRouter() && data) {
//             content = <Mall data={data} />
//         }

//         if (this.isRouter() && this.props['group.1.1']) {
//             nav = <Nav data={ this.props['group.1.1'] } />
//         }
        
//         return ( < div className='g-body'>
//               { nav }
//               { content }
//               { this.props.children } < /div>
//         );
//     }
// });


export default connect(mapStateToProps)(Maller)