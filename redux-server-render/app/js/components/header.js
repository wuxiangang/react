import React from 'react';
import mixins from '../modules/mixins';

class Header extends React.Component { 
    static defaultProps={
        title: '艾美阅读'
    }
    constructor(props) {
        super(props);
        this.mixins = mixins.bind(this)();
        this.goBack = this.goBack.bind(this);
    }
    goBack() {
        this.mixins.goBack()
    }
    render() {
        return ( < header  className='m-header'>
            <span onClick={this.goBack}><a className="iconfont icon-left f-fl" /></span>
            <h1>{ this.props.title }</h1>
        < /header>
        );
    }
}

export default Header;