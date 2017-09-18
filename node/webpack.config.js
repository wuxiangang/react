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
			// {test: /\.js[x]?$/, loader: 'babel-loader?presets[]=es2015&presets[]=react'},
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
    // plugins: [new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: 'o_index.html',// Load a custom template 
    // })]
};