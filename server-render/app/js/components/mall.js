import React from 'react'

export default React.createClass({
	componentWillMount(){
		console.log(1)
		console.log(global.imdata)		
	},
	componentDidMount(){
		console.log(2)
	},
	render:function(){

		return (
			<div>
				<span> home2222222 </span>
				{this.props.children}
			</div>
		);				
	}
});