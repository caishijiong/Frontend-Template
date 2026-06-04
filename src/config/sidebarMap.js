/**
 * @description 侧边栏配置
 * @author 19
 * @date 2026/5/8 9:58
 * @version v1.0.0
 * 侧边栏
 */
export const sidebarMap = [
    {
        name: '工作台',
        icon: 'el-icon-menu',
        children: [
            {
                name: '首页',
                link: '/home',
                icon: 'el-icon-house',
            },
            {
                name: '管理员',
                link: '/admin',
                icon: 'el-icon-user',
                // roles: ['admin'],
            }
        ]
    },
    {
        name: '首页',
        link: '/home',
        icon: 'el-icon-house',
    }
]
