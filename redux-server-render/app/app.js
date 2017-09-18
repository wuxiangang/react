import React from 'react'
import { render } from 'react-dom';
import { Router, Route, browserHistory} from 'react-router'
import routes from './js/router'
import './sass/common.scss'
import { Provider } from 'react-redux'
import configureStore from './js/state/store';

const store = configureStore(window.__PRELOADED_STATE__);

render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory}/>
	</Provider>, 
	document.getElementById('appContainer')
);