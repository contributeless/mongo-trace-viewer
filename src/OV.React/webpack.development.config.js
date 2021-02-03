const path = require('path');
const { merge } = require('webpack-merge')
const common = require('./webpack.base.config');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
});