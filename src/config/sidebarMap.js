/**
 * @description 侧边栏配置
 * @author 19
 * @date 2026/5/8 9:58
 * @version v1.0.0
 * @param {Array} sidebarMap 侧边栏配置
 * @param {String} sidebarMap.name 菜单名称
 * @param {String} sidebarMap.index 菜单路由地址
 * @param {String} sidebarMap.icon 菜单图标
 * 侧边栏配置
 */
export const sidebarMap = [
    {
        name: '工作台',
        icon: 'el-icon-menu',
        children: [
            {
                name: '首页',
                index: '/home',
                icon: 'el-icon-house',
            },
            {
                name: '管理员',
                index: '/admin',
                icon: 'el-icon-user',
                // roles: ['admin'],
            }
        ]
    },
    {
        name: '首页',
        index: '/home',
        icon: 'el-icon-house',
    }
]
