const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: {
        polyfill: '@babel/polyfill',
        index: './index.js',
        login: './src/login/login.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
            chunks: ['index'],
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: "./login.html",
            template: "./src/login/login.html",
            chunks: ['login'],
            inject: true
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
        },
        proxy: {
            '/': 'http://localhost:3000'
        }

    },



}
