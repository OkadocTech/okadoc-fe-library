const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        kong: path.join(__dirname, 'src', 'index.js'),
        // other libs goes here
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
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
}