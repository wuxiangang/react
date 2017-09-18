import React from 'react'
import Home from './js/components/component'
import Mall from './js/components/mall'
import {Route, IndexRoute, WithRoute, IndexRedirect, RouterContext} from 'react-router';

module.exports = (
	<Route path="/" component={Home}>
		<Route path="/mall" component={Mall}/>
	</Route>
)