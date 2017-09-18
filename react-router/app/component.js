import React from 'react'

export default React.createClass({
	render:function(){
		console.log(1)
		return (
			<div>
				<span> home </span>
				{this.props.children}
			</div>
		);				
	}
});