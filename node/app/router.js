import React from 'react'
import Home from './component'
import Mall from './mall'
import {Route, IndexRoute, WithRoute, IndexRedirect, RouterContext} from 'react-router';

module.exports = (
	<Route path="/" component={Home}>
		<Route path="/mall" component={Mall}/>
	</Route>
)