const { merge } = require('webpack-merge')
const common = require('./webpack.base.config');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        // add the plugin to your plugins array
        new webpack.DefinePlugin({ "process.env.APP_ENV": JSON.stringify("production") })
    ]
});