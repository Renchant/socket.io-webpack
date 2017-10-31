const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function genEntries(dir) {
    const names = fs.readdirSync(dir);
    const map = {};

    names.forEach(function(name) {
        var m = name.match(/(.+)\.js$/);
        var entry = m ? m[1] : '';
        var entryPath = entry ? path.resolve(dir, name) : '';

        if(entry) map[entry] = entryPath;
    });

    return map;
}

const entries = genEntries(path.resolve(__dirname, 'src/js'));

module.exports = {

    entry : entries,
    
    output: {
        path: '/',
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: /src\//,
            },

            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}  
                    }
                ]
            },

            {
                test: /\*\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[hash:10].[ext]'
                }
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [
                                            'Android >= 4',
                                            'Chrome >= 30',
                                            'iOS >= 6',
                                            'ie>=6',
                                            'Firefox >= 20',
                                            'Safari >= 5'
                                        ]
                                    })
                                ]
                            }
                        },
                        'sass-loader',
                    ]
                })
            },

            {
                test: /\.html$/,
                loader: 'html-loader',
            }
            
        ]
    },

    plugins: [
        new ExtractTextPlugin( '[name].css' ),
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"development"' } }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
}

