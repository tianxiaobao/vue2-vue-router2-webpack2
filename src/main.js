import Vue from 'vue';
// 升级2后，vue-router 需用 import 引入，不能直接使用 require
import VueRouter from 'vue-router';
const App = require('./app.vue');
Vue.use(VueRouter);
const router = new VueRouter(require('./router'))
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)//es6箭头函数等价于 function(h){return h(App)}
});