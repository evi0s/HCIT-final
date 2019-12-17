const path = require('path');

module.exports = [{
    entry: './js/src/index/index.ts',
    mode: 'production',
    //devtool: 'inline-source-map',
    name: 'index',
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: __dirname,
                options: {
                    allowTsInNodeModules: true
                }
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'js/dist/index'),
    },
}, {
    entry: './js/src/cart/index.ts',
    mode: 'production',
    //devtool: 'inline-source-map',
    name: 'cart',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            include: __dirname,
            options: {
                allowTsInNodeModules: true
            }
        },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'js/dist/cart'),
    },
}, {
    entry: './js/src/statics/index.ts',
    mode: 'production',
    //devtool: 'inline-source-map',
    name: 'statics',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'js/dist/statics'),
    },
}];
