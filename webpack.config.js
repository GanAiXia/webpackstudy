const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');

module.exports = {
    
    //入口文件的配置项
    entry: {
        entry: './src/entry.js',
        // entry2: './src/js/entry2.js'
    },
    //出口文件的配置项
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: './js/[name].js'
    },
    //模块： 例如解读css
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },{
                        loader: "css-loader"
                    }
                ]
            },{
                test: /\.(jpg|png|gif)/ ,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 55000
                    }
                }]
            }
        ],
    },
    //插件
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
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
       