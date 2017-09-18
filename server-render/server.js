import express from 'express'
import path from 'path'
import React from 'react'
import { match } from 'react-router'
import { renderToString } from 'react-dom/server'
import { RouterContext } from 'react-router'
import routes from './app/router'

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

app.use(express.static(path.join(__dirname)))

app.get('*', function (req, res) {	
      global.imdata = {name: 'wuxiangang'};
      console.log( 'node',global.imdata)
	match({ routes, location: req.url }, (err, redirect, props) => {

            if (err) {
              res.status(500).send(err.message);
            } else if (redirect) {
              res.redirect(redirect.pathname + redirect.search);
            } else if (props) {
              res.setHeader('Cache-Control', 'private,no-cache');
              var html = renderToString(<RouterContext {...props}  />)
              console.log(html)
                res.send( indexPage(html))
            } else {
              res.status(404).send('Not Found');
            }
    })
})

var indexPage = (html)=>{
    return `
    <!doctype html>
        <html lang="utf-8">
            <head>
            </head>
            <body>
                <section id="appContainer" >${html}</section>
                <script src="/build/bundle.js"></script>
            </body>
        </html>
    `
};


var PORT = process.argv[2] || 8001
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
