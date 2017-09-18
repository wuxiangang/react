import express from 'express'
import path from 'path'
import React from 'react'
import { match } from 'react-router'
import { renderToString } from 'react-dom/server'
import { RouterContext } from 'react-router'
import routes from './app/router'

var app = express();

app.use(express.static(path.join(__dirname)))

app.get('*', function (req, res) {	
    match({ routes, location: req.url }, (err, redirect, props) => {
        if(err){
            res.status(500).send(err.message)
        } else if(props){
            var html = renderToString(<RouterContext {...props}  />)
            res.send( indexPage(html))
        } else if(redirect) {

        } else{
            res.status(404).send('Not Found')
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


var PORT = process.argv[2] || 8000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
