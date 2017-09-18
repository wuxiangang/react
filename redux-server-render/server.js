import express from 'express'
import path from 'path'
import React from 'react'
import { match } from 'react-router'
import { renderToString } from 'react-dom/server'
import { RouterContext } from 'react-router'
import routes from './app/js/router'
import { Provider } from 'react-redux';

//for server rendering
import GLOBAL from './app/js/modules/global';
import configureStore from './app/js/state/store';
import {fetchList} from './app/js/state/actions/index'

//run dev
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import compression from 'compression';
import webpackConfig from './webpack.config';
//--------------


var app = express();
app.disable('x-powered-by');

//run dev
app.use(compression());
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
//---------------

app.use(express.static(path.join(__dirname, '/client')))

app.get('*', function (req, res) {	

	match({ routes, location: req.url }, (err, redirect, props) => {
            if (err) {
              res.status(500).send(err.message);
            } else if (redirect) {
              res.redirect(redirect.pathname + redirect.search);
            } else if (props) {
              res.setHeader('Cache-Control', 'private,no-cache');

              /*server*/
              global.cookie = GLOBAL.setCookie(req.headers.cookie);
              global.pathname = req.url.replace(/\?.*$/, ''); 

              const store = configureStore();
              const state = store.getState();

              const path = req.url.replace(/\?.*$/, '').replace(/^\//, '').replace(/\/$/, '').split('/');
              let param = path[path.length - 1];
              let queue = [store.dispatch(fetchList(param))];

              if(/(\/mall\/page\.(\d)+)$/.test(req.url))  queue.unshift(store.dispatch(fetchList('group.1.1')));

              Promise.all(queue).then((m)=>{
                const appHtml = renderToString(
                  <Provider store={store}>
                    <RouterContext {...props} />
                  </Provider>);
                res.send(renderFullPage(appHtml, store.getState()));
              });
            } else {
              res.status(404).send('Not Found');
            }
    })
})

var renderFullPage = (html, preloadedState)=>{
    return `
    <!doctype html>
        <html lang="utf-8">
            <head>
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta http-equiv="pragma" content="no-cache">   
                <meta http-equiv="cache-control" content="no-cache">   
                <meta http-equiv="expires" content="0">
                <link href="/p/style.css" rel="stylesheet" type="text/css"></link>
                <link href="//at.alicdn.com/t/font_wjt478fvzswf80k9.css" rel="stylesheet" type="text/css"></link>
            </head>
            <body>
                <section id="appContainer" >${html}</section>
                <script>
                  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
                </script>
                <script src="/p/bundle.js"></script>
            </body>
        </html>
    `
};


var PORT = process.argv[2] || 80
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
