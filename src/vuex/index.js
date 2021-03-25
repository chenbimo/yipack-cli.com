import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        screenWidth: 1920,
        isShowMenu: 'no'
    },
    mutations: {
        // 通用保存
        YiMutation: (state, params) => {
            // 判断路径
            if (!params.path) return;
            // 判断数据
            if (!params.data) return;
            // 分割路径
            let keyPath = params.path.split('.');
            // 路径长度
            let keyLength = keyPath.length;
            // 状态别名
            let keySave = state;
            // 默认通过
            let isPass = true;
            // 循环赋值
            for (let i = 0; i < keyLength - 1; i++) {
                keySave = keySave[keyPath[i]];
                if (!keySave) {
                    isPass = false;
                    break;
                }
            }

            // 提前返回
            if (!isPass) return;
            let keyLast = keyPath[keyLength - 1];
            // 判断动作
            if (params.action) {
                if (params.action === '-') keySave[keyLast] = keySave[keyLast] - params.data;
                if (params.action === '+') keySave[keyLast] = keySave[keyLast] + params.data;
                if (params.action === '*') keySave[keyLast] = keySave[keyLast] * params.data;
                if (params.action === '/') keySave[keyLast] = keySave[keyLast] / params.data;
                return;
            } else {
                keySave[keyLast] = params.data;
            }
        }
    }
});

export default store;
