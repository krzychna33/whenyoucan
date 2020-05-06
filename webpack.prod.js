const merge = require('webpack-merge');
const webpack = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL),
            'process.env.APP_URL': JSON.stringify(process.env.APP_URL)
        })
    ]
});