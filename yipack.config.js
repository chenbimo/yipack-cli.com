// 插件参数配置，用于控制
module.exports = {
    version: 2,
    type: 'init',
    /**
     * 描述：是否开启手机自适应模式
     * 默认值：false
     */
    px2viewport: {
        enable: false
    },
    providePlugin: {
        _: 'lodash-es'
    },
    // 开发配置
    devServer: {},
    // eslint实例化参数
    eslint: {}
};
