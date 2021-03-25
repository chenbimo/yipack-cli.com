/**
 * 全局接口导入入口
 * 此文件，不明白请不要改动
 * 此文件会默认导入 apis 目录和 pages 目录下的所有接口文件，无需手动导入
 * 如有问题或建议，请联系作者：chensuiyi.com
 */
import Vue from 'vue';
import flatten from 'flat';
import { getNames } from '@src/utils/index.js';
// 接口集合
let apis = {};

// 导入全局接口
let importAll = require.context('@src/apis', true, /\.js$/);
importAll.keys().map((path) => {
    let data = importAll(path).default || importAll(path);
    let route =
        'Global.' +
        path
            .replace('./', '')
            .replace('/index.js', '')
            .replace(/\/+/g, '.')
            .split('.')
            .map((name) => {
                return getNames(name).startCaseName;
            })
            .join('.');
    apis[route] = data;
});

// 导入页面方法
let importApi = require.context('@src/pages', true, /api\.js$/);
importApi.keys().map((path) => {
    let data = importApi(path).default || importApi(path);
    let route = path
        .replace('./', '')
        .replace('/api.js', '')
        .replace(/\/+/g, '.')
        .split('.')
        .map((name) => {
            return getNames(name).startCaseName;
        })
        .join('.');
    apis[route] = data;
});
apis = flatten.unflatten(apis);
Vue.prototype.$Apis = apis;
