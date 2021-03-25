// 自动导入开始（勿动）------------------------------------------------------
let R = {
    pages: [],
    views: [],
    pageImport: {},
    viewImport: {}
};
R.pageImport = require.context('@src/pages/index', true, /routePage\.js$/);
R.pageImport.keys().map((path) => {
    R.pages.push(R.pageImport(path).default || R.pageImport(path));
});
R.viewImport = require.context('@src/pages/index', true, /routeView\.js$/);
R.viewImport.keys().map((path) => {
    R.views.push(R.viewImport(path).default || R.viewImport(path));
});
// 自动导入结束（勿动）------------------------------------------------------
export default {
    path: '/',
    component: () => import('@src/pages/index/index.vue')
};
