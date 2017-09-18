import React from 'react';

class Introduce extends React.Component { 
    render() {
        const { author, book_name, book_brief} = this.props.data;
        return ( < div>
           	  <div className='m-introduce-block'>
                     <p>书名: { book_name }</p>
                     <p>作者: { author }</p>
                     <p>简介: { book_brief }</p>
                </div>
        < /div>
        );
    }
}

export default Introduce;