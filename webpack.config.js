const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            name: 'okadoc-libs',
            type: 'umd'
        },
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: true,
        })],
    },
    target: ['es5', 'node'],
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv()
    ]
}