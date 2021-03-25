<template>
    <div class="layout-menu">
        <div class="menu-panel"></div>
    </div>
</template>

<script>
export default {
    name: 'LayoutMenu',
    data() {
        return {};
    }
};
</script>

<style lang="scss">
.layout-menu {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: $layout-menu-width;
    // border-right: 1px solid $layout-menu-border-color;
    // background-color: $layout-menu-background-color;

    .menu-panel {
        position: absolute;
        top: $layout-space;
        bottom: $layout-space;
        left: $layout-space;
        right: $layout-space;
        overflow: hidden;
        border-radius: $global-border-radius-width;
        .ivu-menu-light {
            height: 100%;
            width: 100%;
            border-right: 0;
            background-color: $layout-menu-background-color;
        }
    }
}
</style>
