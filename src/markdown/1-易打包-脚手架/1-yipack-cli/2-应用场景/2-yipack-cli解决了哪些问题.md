## yipack-cli 解决了哪些问题

大部分时候，我们使用一个新工具之前，最先需要考量的，就是这个工具解决了什么问题。

### 自动导入

【自动导入】是 yipack-cli 的核心特性之一。

路由、插件、api、样式、环境变量、全局组件、全局指令、全局过滤器等等，都是自动导入的。

举个例子，使用 yipack-cli，我们再也不用写下面这种路由文件了。

```js
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/documentation',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/documentation/index'),
                name: 'Documentation',
                meta: { title: 'Documentation', icon: 'documentation', affix: true }
            }
        ]
    },
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/guide/index'),
                name: 'Guide',
                meta: { title: 'Guide', icon: 'guide', noCache: true }
            }
        ]
    },
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('@/views/profile/index'),
                name: 'Profile',
                meta: { title: 'Profile', icon: 'user', noCache: true }
            }
        ]
    }
];
```

所有的路由，都是和我们的文件目录一一对应，而且不仅可以自动导入，还能跟随 yipack-cli 的页面创建命令，一键生成路由。

### 项目架构和维护

yipack-cli 解决的另一个非常重要的问题及时，项目的架构和维护。

在这一点上，yipack-cli 通过【约定大于配置】的核心思想，将项目的路由最大层级设置为两层。

也就是说，我们如果要访问新闻相关的数据，那么只能使用最多两层路由。

```bash
news/list
news/detail?newsId=1
```

而不能使用以下超过了两层路由的方式

```bash
news/detail/1
```

当然，框架由 yipack-cli 定，事在自己为。

同学们想要通过自己的聪明才智突破两层路由的约定，也非常简单。

但是，这是 yipack-cli 极力不推荐的。

因为，这样只会把事情搞复杂，要牢牢记住【约定大于配置】，这是不二法则。

通过这种两层路由的约定，yipack-cli 完全实现了【页面结构即路由】的规则。

也就是说，我们只需要查看 src/pages 下面的目录结构，就能清楚地知道页面的访问路径。

| 目录                                       | 路由           | 描述          |
| ------------------------------------------ | -------------- | ------------- |
| src/pages/news/index.vue                   | /news          | 新闻首页      |
| src/pages/news/subPages/detail/index.vue   | /news/detail   | 新闻详情页    |
| src/pages/news/subPages/list/index.vue     | /news/list     | 新闻列表页    |
| src/pages/about/subViews/company/index.vue | /about/company | 关于-公司介绍 |
| src/pages/about/subViews/contact/index.vue | /about/contact | 关于-联系我们 |

通过上面这个表格，相信同学们应该大致了解了 yipack-cli 的项目的页面结构和路由组织方式。

同时，对于 subPages 和 subViews 应该也比较疑惑，这里我简单介绍下，更详细的说明请看后面的概念讲解对应文章。

subPages 和 subViews 都是二级路由的页面存放目录。

所以，我们的整体项目结构，在 src/pages 目录下，只会看到一级路由的页面，其余的二级路由，都被隐藏在了 subPages 和 subViews 里面。

这样，更利于我们的项目组织和维护。

那么，subPages 和 subViews 的区别是什么呢？

我举个很简单的例子。

新闻首页，新闻列表，新闻详情这种不需要共用元素的属于【sub page （子页面）】。

关于我们，公司介绍，联系方式这种需要共用左侧 tab 切换进行数据展示的页面，属于【sub view（子视图）】。

这样，我们不仅能够明确地切割和管理页面，对于合作开发与后期维护，都是一目了然的。

关于【子页面】和【子视图】更详细的讲解，请看【概念讲解】卷的进阶说明。

### main.js 文件混乱

大部分 vue 项目，都存在一个普遍的问题，main.js 入口文件，极其混乱。

```js
import Vue from 'vue';

import Cookies from 'js-cookie';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets

import Element from 'element-ui';
import './styles/element-variables.scss';
import enLang from 'element-ui/lib/locale/lang/en'; // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import './icons'; // icon
import './permission'; // permission control
import './utils/error-log'; // error log

import * as filters from './filters'; // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock');
    mockXHR();
}

Vue.use(Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    locale: enLang // 如果使用中文，无需设置，请删除
});

// register global utility filters
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

各种模块、样式、第三方库、初始化等等都堆积在这个文件里面，让人看了直呼头疼。

yipack-cli 很好地解决了这个问题，main.js 文件内容如下。

```js
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
// 国际化
import i18n from '@src/lang/index.js';
// 插件导入
import '@src/plugins/index.js';
// 异步请求
import '@src/request/index.js';
// 接口方法
import '@src/apis/index.js';
// 全局混入
import '@src/mixin/index.js';
// 全局组件
import '@src/comps/index.js';
// 全局样式
import '@src/styles/index.scss';
// 应用模板
import App from '@src/App.vue';
// 实例化
let vm = new Vue({
    router: router,
    store: vuex,
    i18n: i18n,
    render: (h) => h(App)
}).$mount('#app');
```

如注释所示，yipack-cli 将各种模块、第三方框架、配置等等，都分散到了 plugins 目录里面。

那么，plugins 目录的结构，大致将会如下。

```bash
├─plusins
│  ├─basil.js 浏览器存储
│  ├─xlsx.js excel操作
│  ├─js-cookie.js cookie操作
│  └─element-ui.js ui框架
│  └─index.js 自动导入所有插件
```

通过【插件】的概念，很好地处理了 main.js 文件混乱的问题。

### 一键生成与重构

yipack-cli 的另一个强大之处就是，一键命令。
