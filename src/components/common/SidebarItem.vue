<template>
    <div class="sidebar" :class="{ 'sidebar-folded': folded }" :style="sidebarStyle">
        <el-menu :collapse="folded" :default-active="$route.path" :background-color="sidebarTheme.backgroundColor"
            :text-color="sidebarTheme.textColor" :active-text-color="sidebarTheme.activeTextColor" router>
            <template v-for="menu in visibleMenus">
                <el-submenu v-if="menu.children" :key="`group-${menu.name}`" :index="`group-${menu.name}`">
                    <template slot="title">
                        <i :class="menu.icon"></i>
                        <span>{{ menu.name }}</span>
                    </template>
                    <el-menu-item v-for="item in menu.children" :key="item.link" :index="item.link">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </el-submenu>

                <el-menu-item v-else :key="menu.link" :index="menu.link">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{ menu.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { appConfig, getSidebarMenus } from '@/config'

export default {
    props: {
        folded: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        visibleMenus() {
            return getSidebarMenus()
        },
        sidebarTheme() {
            return {
                backgroundColor: appConfig.sidebar.backgroundColor,
                textColor: appConfig.sidebar.textColor,
                activeTextColor: appConfig.sidebar.activeTextColor,
            }
        },
        sidebarStyle() {
            return {
                '--sidebar-width': `${appConfig.layout.sidebarWidth}px`,
                '--sidebar-fold-width': `${appConfig.layout.sidebarFoldWidth}px`,
                backgroundColor: appConfig.sidebar.backgroundColor,
            }
        },
    },
}
</script>

<style scoped lang="scss">
.sidebar {
    height: 100vh;
    transition: width 0.3s ease;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .el-menu {
        border-right: none;
        width: 100%;
    }

    &.sidebar-folded {
        width: var(--sidebar-fold-width, 64px);
    }

    &:not(.sidebar-folded) {
        width: var(--sidebar-width, 200px);
    }
}
</style>
