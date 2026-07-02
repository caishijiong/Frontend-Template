<template>
    <div class="sidebar" :class="{ 'sidebar-folded': folded }" :style="sidebarStyle">
        <el-menu :collapse="folded" :default-active="$route.path" :background-color="sidebarTheme.backgroundColor"
            :text-color="sidebarTheme.textColor" :active-text-color="sidebarTheme.activeTextColor" router>
            <template v-for="menu in visibleMenus">
                <el-submenu v-if="menu.children" :key="`group-${menu.name}`" :index="`group-${menu.name}`">
                    <template slot="title">
                        <i :class="menu.icon"></i>
                        <span class="menu-label">{{ menu.name }}</span>
                    </template>
                    <el-menu-item v-for="item in menu.children" :key="item.index" :index="item.index">
                        <i :class="item.icon"></i>
                        <span class="menu-label" slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </el-submenu>

                <el-menu-item v-else :key="menu.index" :index="menu.index">
                    <i :class="menu.icon"></i>
                    <span class="menu-label" slot="title">{{ menu.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { appConfig } from '@/config'

export default {
    props: {
        folded: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        visibleMenus() {
            return appConfig.navigation.sidebar
        },
        sidebarTheme() {
            return {
                backgroundColor: appConfig.theme.menuBg,
                textColor: appConfig.theme.menuText,
                activeTextColor: appConfig.theme.menuActiveText,
            }
        },
        sidebarStyle() {
            return {
                '--sidebar-width': '200px',
                '--sidebar-fold-width': '64px',
                backgroundColor: appConfig.theme.menuBg,
            }
        },
    },
}
</script>

<style scoped lang="scss">
.sidebar {
    display: flex;
    position: relative;
    width: 200px;
    flex: 0 0 200px;
    flex-direction: column;
    background-color: #fff;
    box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.1), 0 0 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    flex-shrink: 0;
    min-width: 200px;
    // overflow: hidden;
    transition: all 0.3s ease;
}

.sidebar ::v-deep(.el-menu-item > .menu-label),
.sidebar ::v-deep(.el-submenu__title > .menu-label) {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
    max-width: 200px;
    /* 展开时文字最大宽度（根据侧栏宽度调整） */
    opacity: 1;
    transform: translateX(0);
    transition: max-width 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
    margin-left: 8px;
    /* 图标与文字间距，根据需调整 */
}

/* 清除右边边框 */
.sidebar ::v-deep(.el-menu),
.sidebar ::v-deep(.el-menu-item),
.sidebar ::v-deep(.el-submenu__title) {
    border-right: none;
    outline: none;
}

/* 折叠时让文字渐隐并收缩宽度（与侧栏 width 过渡同步） */
.sidebar.sidebar-folded ::v-deep(.el-menu-item > .menu-label),
.sidebar.sidebar-folded ::v-deep(.el-submenu__title > .menu-label) {
    opacity: 0;
    transform: translateX(-6px);
    max-width: 0;
    pointer-events: none;
    /* 防止不可见文字触发 hover/click */
}

.sidebar.sidebar-folded {
    width: 64px;
    flex: 0 0 64px;
    min-width: 64px;
}

/* 折叠时强制调整 el-menu 宽度与内边距，避免子项撑开容器 */
.sidebar.sidebar-folded ::v-deep(.el-menu) {
    width: 64px;
}

.sidebar.sidebar-folded ::v-deep(.el-menu-item),
.sidebar.sidebar-folded ::v-deep(.el-submenu__title) {
    padding-left: 0;
}
</style>
