<template>
    <div class="header" :style="headerStyle">
        <div class="header-content">
            <div v-if="showCollapse" class="collapse-btn" @click="$emit('collapse-change')">
                <i v-if="folded" class="el-icon-s-fold"></i>
                <i v-else class="el-icon-s-unfold"></i>
            </div>
            <h1>{{ title }}</h1>

            <div>
                <HeaderNav />

                <el-button type="primary" @click="logout">退出登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { appConfig } from '@/config'
import HeaderNav from './HeaderNav.vue'
export default {
    components: {
        HeaderNav,
    },
    props: {
        folded: Boolean,
        showCollapse: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        title() {
            return appConfig.header.title
        },
        headerStyle() {
            return {
                backgroundColor: appConfig.header.backgroundColor,
                color: appConfig.header.textColor,
            }
        }
    },
    methods: {
        logout() {
            this.$confirm('确定要退出登录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                localStorage.removeItem('roles')
                this.$router.push('/login')
                this.$message.success('已退出登录')
            })
        }
    }
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    flex-shrink: 0;
}

.header-content {
    display: flex;
    align-items: center;

    .collapse-btn {
        width: 24px;
        cursor: pointer;
        align-items: center;
        padding: 0 14px;
        font-size: 20px;
    }
}
</style>