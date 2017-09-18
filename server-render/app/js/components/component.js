import React from 'react'

export default React.createClass({
	getInitialState: function(){
		return {
			aidou: null,
			bind_phone: '',
			url: null,
			another: null
		}
	},
    componentWillMount(){
        console.log(1)
        console.log(global.imdata) 
        this.setState({aidou: 5554})     
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