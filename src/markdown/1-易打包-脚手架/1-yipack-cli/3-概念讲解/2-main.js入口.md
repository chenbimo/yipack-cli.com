## main.js 入口

main.js 文件，是我们再熟悉不过的文件，它和 App.vue 经常出现在一起。

同时，main.js 也是整个项目级别的入口文件，是整个项目进行打包构建的第一个入口。

传统的项目中，main.js 文件组织可能是这样的：

```javascript
import Vue from 'vue';

import Cookies from 'js-cookie';

import 'normalize.css/normalize.css';

import Element from 'element-ui';
import './styles/element-variables.scss';

import '@/styles/index.scss';

import App from './App';
import store from './store';
import router from './router';

import './icons';
import './permission';
import './utils/error-log';

import * as filters from './filters';

if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock');
    mockXHR();
}

Vue.use(Element, {
    size: Cookies.get('size') || 'medium'
});

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
});
```

但是，`yipack`创建的项目，可以做到这样：

```javascript
/**
 * 此文件为应用核心入口文件
 * 一般情况下，不需要动此文件
 * 如果需要添加第三方模块
 * 请到plugins目录下操作
 */
// 核心库
import Vue from 'vue';
// 全局路由
import router from '@src/router/index.js';
// 全局存储
import vuex from '@src/vuex/index.js';
// 全局组件
import '@src/comps/index.js';
// 全局混入
import '@src/mixin/index.js';
// 插件导入
import '@src/plugins/index.js';
// 异步请求
import '@src/request/index.js';
// 全局样式
import '@src/styles/index.scss';
// 应用模板
import App from '@src/App.vue';
// 实例化
let vm = new Vue({
    router: router,
    store: vuex,
    render: (h) => h(App)
}).$mount('#app');
```

不管你的项目多复杂，多庞大，main.js 入口文件，都能够做到如此简洁和轻盈。

因为，yipack 已经从项目组织架构上，将所有的第三方模块放到了 plugins 插件目录中。

每个第三方模块都是插件中的一个独立文件，让项目结构和组织，更加清晰易懂。
