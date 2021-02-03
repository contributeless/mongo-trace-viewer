const { merge } = require('webpack-merge')
const common = require('./webpack.base.config');

module.exports = merge(common, {
    mode: 'production',
});