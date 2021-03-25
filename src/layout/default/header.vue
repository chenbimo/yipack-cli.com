<template>
    <div class="layout-header">
        <div class="left">
            <div class="logo bg-contain"></div>
        </div>
        <div class="center flex-center">yipack-template</div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    name: 'LayoutHeader'
};
</script>

<style lang="scss">
.layout-header {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: $layout-header-height;
    border-bottom: 1px solid $layout-header-border-color;
    background-color: $layout-header-background-color;

    .left {
        flex: 0 0 $layout-header-height;
        padding: 5px;
        .logo {
            height: 100%;
        }
    }
    .center {
        flex: 1 1 100%;
        font-size: 18px;
    }
    .right {
        flex: 0 0 $layout-header-height;
    }
}
</style>
