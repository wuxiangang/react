import React from 'react'

export default React.createClass({
	render:function(){
		return (
			<div>
				<span> home2222222 </span>
				{this.props.children}
			</div>
		);				
	}
});