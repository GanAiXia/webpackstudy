const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack')

var website = {
    publicPath: "http://127.0.0.1:1717/"
}

module.exports = {
    
    //入口文件的配置项
    entry: {
        entry: './src/js/entry.js',
        // entry2: './src/js/entry2.js'
    },
    //出口文件的配置项
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].js',
        publicPath: website.publicPath
    },
    //模块： 例如解读css
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader", options: {importLoaders: 1}
                        },
                        'postcss-loader'
                    ]
                })
            },{
                test: /\.(jpg|png|gif)/ ,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        outputPath: 'images/'
                    }
                }]
            },{
                test: /\.(htm|thml)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use:  [{
                            loader: "css-loader"
                        },{
                            loader: "less-loader"
                        }],
                        fallback: "style-loader"
                })
                
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [
                       {
                            loader: "css-loader"
                        },{
                            loader: "sass-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            },{
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude:/node_modules/
            }
        ],
    },
    //插件
        // new uglify(),
    plugins: [
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new extractTextPlugin("/css/index.css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname,'src/*.html'))
        })
    ],
    //配置webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
}
       