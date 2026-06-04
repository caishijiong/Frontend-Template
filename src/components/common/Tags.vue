<template>
    <div class="tags-wrap">
        <div class="tags-list">
            <el-tag v-for="tag in tags" size="small" :key="tag.fullPath" closable @click="handleTagClick(tag)"
                @close.stop="handleTagClose(tag)" class="tag-item" :effect="isActive(tag) ? 'dark' : 'light'">
                {{ tag.title }}
            </el-tag>
        </div>

        <div>
            <div class="custom-dropdown">
                <div class="tag-select" @click="toggleDropdown" @blur="hideDropdown" tabindex="0">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </div>

                <transition name="fade">
                    <ul v-show="showDropdown" class="custom-dropdown-menu" ref="dropdownMenu" @click="handleMenuClick">
                        <li class="context-menu-item" @click="closeCurrentTag">关闭所有</li>
                        <li class="context-menu-item" @click="closeOtherTags">关闭其他</li>
                    </ul>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
const HOME_PATH = '/home'

export default {
    name: 'TagsView',
    data() {
        return {
            tags: [],
            showDropdown: false
        }
    },

    watch: {
        $route: {
            immediate: true,
            handler(route) {
                this.addTag(route)
            },
        },
    },

    mounted() {
        document.addEventListener('click', this.handleOutsideClick)
    },

    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick)
    },

    methods: {
        // 判断标签是否为当前路由
        isActive(tag) {
            return tag.fullPath === this.$route.fullPath
        },

        // 将路由对象转换为标签对象
        normalizeTag(route) {
            if (!route) {
                return null
            }

            const fullPath = route.fullPath || route.path
            const path = route.path || fullPath

            return {
                title: route.meta && route.meta.title ? route.meta.title : route.name || path,
                path,
                fullPath,
                closable: fullPath !== HOME_PATH,
            }
        },

        // 安全地导航到指定路径，避免重复导航错误
        safePush(fullPath) {
            if (!fullPath || fullPath === this.$route.fullPath) {
                return
            }

            this.$router.push(fullPath).catch(err => {
                if (!err || err.name !== 'NavigationDuplicated') {
                    throw err
                }
            })
        },

        // 添加标签，如果标签已存在则不添加
        addTag(route) {
            const currentTag = this.normalizeTag(route)
            if (!currentTag || !currentTag.fullPath) {
                return
            }

            const exists = this.tags.some(item => item.fullPath === currentTag.fullPath)
            if (!exists) {
                this.tags.push(currentTag)
            }
        },

        // 处理标签点击事件，导航到对应路由
        handleTagClick(tag) {
            this.safePush(tag.fullPath)
        },

        // 根据索引关闭标签，并处理导航逻辑
        closeTagByIndex(index) {
            if (index < 0 || index >= this.tags.length) {
                return
            }

            const tag = this.tags[index]
            if (tag.closable === false) {
                return
            }

            const isCurrent = this.isActive(tag)
            this.tags.splice(index, 1)

            if (!isCurrent) {
                return
            }

            const fallbackTag = this.tags[index] || this.tags[index - 1] || this.tags[0]
            this.safePush(fallbackTag ? fallbackTag.fullPath : HOME_PATH)
        },

        // 处理标签关闭事件
        handleTagClose(tag) {
            const closedIndex = this.tags.findIndex(item => item.fullPath === tag.fullPath)
            this.closeTagByIndex(closedIndex)
        },

        // 切换下拉菜单显示状态
        toggleDropdown(event) {
            event.stopPropagation()
            this.showDropdown = !this.showDropdown
        },

        // 隐藏下拉菜单
        hideDropdown() {
            this.showDropdown = false
        },

        // 处理点击事件，判断是否点击在下拉菜单外部，如果是则关闭下拉菜单
        handleOutsideClick(event) {
            const dropdown = this.$el
            if (!dropdown.contains(event.target)) {
                this.hideDropdown()
            }
        },

        // 处理菜单项点击事件，关闭下拉菜单
        handleMenuClick() {
            this.hideDropdown()
        },

        // 关闭当前标签
        closeCurrentTag() {
            this.hideDropdown()

            const currentIndex = this.tags.findIndex(item => this.isActive(item))
            this.closeTagByIndex(currentIndex)
        },

        // 关闭其他标签
        closeOtherTags() {
            this.hideDropdown()

            const currentFullPath = this.$route.fullPath
            this.tags = this.tags.filter(item => {
                return item.fullPath === currentFullPath || item.closable === false
            })
        }
    },
}
</script>

<style scoped lang="scss">
.tags-wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 2px 4px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tags-list {
    display: flex;
    flex: 1;
    align-items: center;
    // overflow-x: auto;
    white-space: nowrap;
}

.tag-item {
    margin: 3px 5px 3px 3px;
    cursor: pointer;
    user-select: none;
}

.el-dropdown-link {
    cursor: pointer;
    user-select: none;
    margin-left: auto;
}

.custom-dropdown {
    position: relative;
    display: inline-block;
}

.tag-select {
    padding: 2px 8px;
    background: #f0f0f0;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;

    &:hover {
        background: #e0e0e0;
    }
}

.custom-dropdown-menu {
    position: absolute;
    top: 100%;
    left: -2px;
    z-index: 999;
    min-width: 83px;
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    list-style: none;
    margin: 2px 0 0;
    padding: 5px 0;
    box-sizing: border-box;

    li {
        padding: 5px 12px;
        font-size: 12px;
        line-height: normal;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #f5f7fa;
        }

    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>