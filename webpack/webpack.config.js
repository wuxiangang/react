var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({
        filename: '../index.html',
        template: debug ? 'indexTemplate.html' : 'indexTemplate-p.html', // Load a custom template 
        inject: 'body', // Inject all scripts into the body 
        hash: !debug
    })]
};