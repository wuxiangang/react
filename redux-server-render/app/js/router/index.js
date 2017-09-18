import React from 'react'
import App from '../components/app'
import Mall from '../containers/mall'
import Introduce from '../containers/introduce'
import {Route, IndexRoute, WithRoute, IndexRedirect, RouterContext} from 'react-router';

module.exports = (
	<Route path="/" component={App}>
		<IndexRedirect to="/mall/page.65" />
		<Route path="/mall(/:page)" component={Mall}>
			<Route path="book/:introId" component={Introduce} />
		</Route>
		<Route path="/book/:introId" component={Introduce} />
	</Route>
)