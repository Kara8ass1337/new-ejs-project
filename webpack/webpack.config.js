const webpack = require('webpack');
const resolve = require('path').resolve;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pagesConfig = require('./pages.config');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css'
});

const rootPath = resolve(__dirname, '../');

const htmlWebpackPluginChunks = pagesConfig.map((obj) => {
    const {addScripts, title, context, htmlClasses, footer, header} = obj;

    return new HtmlWebpackPlugin({
        title,
        addScripts,
        context,
        htmlClasses,
        footer,
        header,
        template: `${rootPath}/src/htmlRoot.ejs`,
        filename: `${context }.html`,
        inject: 'body',
        path: 'landing',
        rootPath
    });
});

module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: `${rootPath}/src/index.js`
    },
    output: {
        path: `${rootPath}/build/`,
        filename: '[name].js',
    },
    plugins: [
        new CleanWebpackPlugin(`${rootPath}/build/*`, {
            root: `${rootPath}/build/`,
            exclude: ['.gitkeep'],
        }),
        extractSass,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        ...htmlWebpackPluginChunks,
        new CopyWebpackPlugin([{
            from: `${rootPath}/public/`,
            to: `${rootPath}/build/`
        }]),
    ],
    context: rootPath,
    resolve: {
        extensions: ['.js', '.css', '.json', '.md'],
        modules: ['src', 'node_modules'],
        alias: {
            jQuery: 'jquery'
        }
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 0,
                        modules: false
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        plugins: [require('autoprefixer')()]
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        includePaths: [`${rootPath}/src`],
                        outputStyle: 'collapsed'
                    }
                }],
                fallback: 'style-loader'
            })

        }, {
            test: /\.css$/,
            use: 'css-loader?sourceMap=true',
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf)$/,
            use: 'file-loader?name=[name].[ext]&outputPath=./assets/'
        }, {
            test: /\.ejs$/,
            use: ['ejs-loader']
        }, {
            test: /\.(graphql|graphqls|graphqle|graphqld|gql)$/,
            use: ['graphql-tag/loader']
        }]
    },
    devServer: {
        host: 'localhost',
        port: '8000',
        //public: '192.168.1.7:8081',
        contentBase: resolve(__dirname, '../public'),
        publicPath: '/',
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/err-404.html' }
            ]
        },
        //hot: true
    }
};