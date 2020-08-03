const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'src', 'app.tsx')
    ],
    output: {
        filename: '[name].[chunkhash:4].js',
        path: path.join(__dirname, 'build'),
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.scss$/, use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        }
                    }
                },
                "sass-loader" ]},
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    }
                }]
            },
            { test: /\.tsx?$/, loader: "babel-loader" },
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            title: 'Raisemana app'
        })
    ]
};