const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: [
        '@babel/polyfill',
        './index.js'
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "webpackdesign",
            template: "./index.html"
        }),

    ],
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devtool: 'inline-source-map',
    performance: {
        assetFilter: function (assetFileName){
            return assetFileName.endsWith('.js')
        },
        maxAssetSize: 10000,
        maxEntrypointSize: 10000
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        }
    },



}
