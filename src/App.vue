<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {};
    },
    mounted() {},
    updated() {
        this.$nextTick(() => {
            document.getElementById('layout-content').scroll({
                top: 0,
                left: 0
            });
        });
    },
    methods: {}
};
</script>
<style lang="scss"></style>
