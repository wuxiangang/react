### 1. 安装 {#step1}

####   使用npm安装
>     "babel": "^6.5.2", （用于将es6进行编译）
>     "babel-cli": "^6.18.0",
>     "babel-core": "^6.18.2",
>     "babel-loader": "^6.2.7",
>     "babel-preset-es2015": "^6.18.0",
>     "babel-preset-react": "^6.16.0",
>     "babel-register": "^6.18.0",
>     "html-webpack-plugin": "^2.24.1",（webpack包可不用，用于html模板）
>     "react": "^15.3.2",
>     "react-dom": "^15.3.2",
>     "react-router": "^3.0.0"


> > 注意：在使用babel编译时，在当前目录的.babelrc下加入{"presets": ["es2015","react"]}。

### 2. 使用webpack	 {#step2}

####   新建webpack.config.js 
		var path = require('path');
		var HtmlWebpackPlugin = require('html-webpack-plugin');
		module.exports = {
		    entry: path.resolve(__dirname, 'app/app.js'),
		    output: {
		        path: path.resolve(__dirname, 'build'),
		       filename: 'bundle.js',

		    },
		 module: {
				loaders:[
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'babel',
						query:{
						    presets: ['react', 'es2015']
						 }				
					}
				]
			},
		};

### 3.使用react-router {#step3}

#### 新建入口文件

> [阮一峰react-router教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)

* app.js （入口）

        import React from 'react'
	    import { render } from 'react-dom';
		import { Router, Route, browserHistory} from 'react-router'
		import routes from './router'

		render(
			<Router routes={routes} history={browserHistory}/>, 
			document.getElementById('appContainer')
		);


* router.js（路由文件）

		import React from 'react'
		import Home from './component'
		import Mall from './mall'
		import {Route, IndexRoute, WithRoute, IndexRedirect, RouterContext} from 'react-router';

		module.exports = (
			<Route path="/" component={Home}>
				<Route path="/mall" component={Mall}/>
			</Route>
		)


* component.js （组件）

		import React from 'react'
		export default React.createClass({
			getInitialState: function(){
				return {
					aidou: 0
				}
			},
		    componentDidMount: function() {
		    	setTimeout(function(){
		    		this.setState({aidou: 10000})
		    	}.bind(this),1000)
		    },
		    shouldComponentUpdate: function(nextProp,nextState){
				return this.state.aidou !== nextState.aidou;
			},
		    render: function() {
		        return ( < div >
		            < span > home{this.state.aidou} < /span> 
		            { this.props.children } 
		            < /div>
		        );
		    }
		});

* mall.js （组件）

		import React from 'react'
		export default React.createClass({
			render:function(){
				return (
					<div>
						<span> home2222222 </span>
						{this.props.children}
					</div>
				);				
			}
		});

###### 以上几步已经完成了一个客户端的工作，你打包生成的bundle.js引入一个html文件就可以看到一个客户端渲染出来的项目。

### 4.服务端渲染 {#step4}

*  引入文件
		import express from 'express'
		import path from 'path'
		import React from 'react'
		import { match, RouterContext } from 'react-router'
		import { renderToString } from 'react-dom/server'
		import routes from './app/router' （路由文件）

*  路径配置
		app.use(express.static(path.join(__dirname)))

*  路由使用
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
>  这里对各个参数进行了判断，原因在与当send一次字符串之后路由还会监听一次，但是此时进来的三个参数都是undefined，会出现警告，但不影响使用，此处处理为了避免告警。

* indexPage
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
>  嵌套完整页面。