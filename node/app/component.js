import React from 'react'

export default React.createClass({
	getInitialState: function(){
		return {
			aidou: 0,
			bind_phone: '',
			url: null,
			another: null
		}
	},
    componentDidMount: function() {
    	console.log('this is react server rendering')
    	setTimeout(function(){
    		console.log(111)
    		this.setState({aidou: 10000})
    	}.bind(this),1000)
    },
    shouldComponentUpdate: function(nextProp,nextState){
		return this.state.aidou !== nextState.aidou;
	},
    render: function() {
        return ( < div >
            < span > home{this.state.aidou} < /span> 
            { this.props.children } 
            < /div>
        );
    }
});