import React from 'react';
import Link from 'react-router/lib/Link';

class Nav extends React.Component { 
    render(){
        const { pagelist } = this.props.data;
        return (
                <section className="flex-box m-nav">
                    {
                        pagelist.map((v,i) => {
                            return (
                                <Link to={ `/mall/page.${v.pgid}` } key={i} className = 'flex' activeClassName="active">
                                    { v.name }
                                </Link>
                                )
                        })
                    }
                </section>
            )
    }
}

export default Nav;