/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const uglify = require('uglify-js');

const babelConfig = require(path.resolve(__dirname, '../babel.config')); // eslint-disable-line import/no-dynamic-require

const PATHS = {
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../build'),
};

const config = {
    externals: {
        paths: PATHS,
        alias: {
            src: PATHS.src,
        },
    },
    context: PATHS.src,
    entry: './index.jsx',
    output: {
        filename: '[name].[chunkHash].js',
        path: PATHS.build,
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new TerserPlugin({
                minify: (file, sourceMap) => {
                    const uglifyJsOptions = {
                        // https://github.com/mishoo/UglifyJS2#minify-options
                    };
                    if (sourceMap) {
                        uglifyJsOptions.sourceMap = {
                            content: sourceMap,
                        };
                    }
                    return uglify.minify(file, uglifyJsOptions);
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: babelConfig
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
    ],
};

module.exports = config;
