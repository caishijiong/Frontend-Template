<template>
    <div class="wrapper">
        <v-Header :folded="folded" :show-collapse="layout.showSidebar" @collapse-change="collapseChange"></v-Header>
        <div class="content-container">
            <v-SidebarItem v-if="layout.showSidebar" :folded="folded"></v-SidebarItem>
            <div class="main-content">
                <v-Tags></v-Tags>
                <div class="view-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vTags from './Tags.vue'
import vHeader from './Header.vue'
import vSidebarItem from './SidebarItem.vue'
import { appConfig } from '@/config'

export default {
    name: 'HomePage',
    components: {
        vSidebarItem,
        vHeader,
        vTags,
    },
    data() {
        return {
            folded: false,
            layout: appConfig.layout,
        }
    },
    methods: {
        collapseChange() {
            this.folded = !this.folded
        },
    },
}
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
}

.content-container {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.main-content {
    flex: 1;
    box-sizing: border-box;
    width: 100%;
}

.view-content {
    padding: 20px;
    background-color: #f9f9f9;
    height: calc(100vh - 60px - 48px);
    /* 减去头部和标签栏的高度 */
    overflow-y: auto;
}
</style>
