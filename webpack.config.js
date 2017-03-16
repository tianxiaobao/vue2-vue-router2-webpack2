const webpack = require('webpack');
var path = require('path');
//提取CSS
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 生成首页
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/main.js',//必须配置
    output: {
        path: __dirname + '/static',
        publicPath: '/static/',
        filename: 'build.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: "babel-loader",
                include: [path.resolve(__dirname, 'src')]
            },
            //不能提取vue文件中的style，需要设置vue-loader
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                use: ['css-loader', "postcss-loader"]
                            }),
                            stylus: ExtractTextPlugin.extract({
                                use: ["css-loader", "postcss-loader", "stylus-loader"]
                            })
                        }
                    }
                }
            },
            //提取style
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    //注意：postcss-loader要放在css-loader和style-loader之后，CSS预处理语言loader之前（stylus-loader）
                    use: ['css-loader', "postcss-loader"]
                })
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "postcss-loader", "stylus-loader"]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        //指定生产环境，以便在压缩时可以让 UglifyJS 自动删除代码块内的警告语句
        //这个插件直接做的文本替换，给定的值必须包含字符串本身内的实际引号。通常，
        //有两种方式来达到这个效果，使用 '"production"'， 或者使用 JSON.stringify('production')
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        //压缩js
        new webpack.optimize.UglifyJsPlugin(),
        //初始化插件，filename可以指定CSS文件的目录
        new ExtractTextPlugin({
            filename: "css/style.css?[contenthash:8]"
        }),
        new HtmlWebpackPlugin({
            // 相对于webpack配置项output.path（打包资源存储路径）
            filename: 'index.html',
            // template的路径是相对项目根目录
            template: 'index.tpl.html'
        })
    ]
}