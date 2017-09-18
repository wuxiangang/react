import React from 'react'
import { render } from 'react-dom';
import { Router, Route, browserHistory} from 'react-router'
import routes from './router'
import '../sass/common.scss'

render(
	<Router routes={routes} history={browserHistory}/>, 
	document.getElementById('appContainer')
);