import React from 'react';
import Link from 'react-router/lib/Link';

import GLOBAL from '../modules/global';

class List extends React.Component { 
	render(){
		const { image_url, name, brief, author, content_id } = this.props.data;
		return (	<Link to={GLOBAL.setHref("book/introduce."+content_id)} className = 'm-book-list'>
			         <img src ={ image_url } />
                                        <div className='f-detail'>
                                            <p>{ name }</p>
                                            <p>{ author }</p>
                                            <p>{ brief }</p>
                                        </div>
			</Link>
			)
	}
}

class Mall extends React.Component { 
    render() {
        return(
	<div>
	   {
	       this.props.data.blocklist[1].contentlist.map((v, i) => {
			return <List key={i} data = {v} />
	       })
	   }
	</div>
	)
    }
}


export default Mall