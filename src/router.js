// vue-router实例化传入的参数提取到router.js形成路由配置文件
module.exports = {
    routes: [
        {
            path: '/about',
            component: require('./views/about.vue')
        }
    ]
}