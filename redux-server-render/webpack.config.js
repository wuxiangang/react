var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/app.js'),
    output: {
    	 //node 设置当前路径为client
        path: path.resolve(__dirname, 'client/p'),
        publicPath: '/p/',
        filename: 'bundle.js',
    },
    module: {
		loaders:[
			// {test: /\.js[x]?$/, loader: 'babel-loader?presets[]=es2015&presets[]=react'},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query:{
				    presets: ['react', 'es2015','stage-0']
				    }				
			},
			{
	                test: /\.css$/,
	                loader: ExtractTextPlugin.extract("style", 'css')
	            },
	            //解析.vue文件
	            {
	                test: /\.vue$/,
	                loader: 'vue'
	            }, 
	            //解析.scss文件,对于用 import 或 require 引入的sass文件进行加载，以及<style lang="sass">...</style>声明的内部样式进行加载
	            {
	                test: /\.scss$/,
	                loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
	            }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
	      'process.env':{
	        'NODE_ENV': JSON.stringify('production')
	      }
	    }),
        new ExtractTextPlugin("style.css") //提取出来的样式放在style.css文件中
    ]
    // plugins: [new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: 'o_index.html',// Load a custom template 
    // })]
};