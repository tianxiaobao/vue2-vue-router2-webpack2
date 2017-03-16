//新增postcss.config.js来配置postcss插件,以免要给每个postcss-loader去配置
module.exports = {
	//注意插件配置的顺序，比如上面cssnano配置在前的话，autoprefixer会失效
    plugins: [
        require('autoprefixer'),
        require('cssnano')
    ]
}