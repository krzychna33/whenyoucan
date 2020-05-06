const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
    watch: true,
    mode: 'development',
    devtool: "source-map",
    module: {
        rules: [
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
});