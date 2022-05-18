const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            name: 'okadoc-libs',
            type: 'umd',
            umdNamedDefine: true,
        },
        globalObject: 'this',
    },
    target: ['node', 'es5'],
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                ecma: 5,
                compress: true,
                output: {
                    comments: false,
                    beautify: false
                }
            }
        })],
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}