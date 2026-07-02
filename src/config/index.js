/**
 * 系统配置文件
 * @author 19
 * @date 2026/5/8 11:00
 * @version v1.0.0
 * 系统配置文件
 */
import { sidebarMap } from './sidebarMap'
// import { topNavMap } from './topNav' // 后续可以加
const originConfig = {
	// 当前框架版本
	version: 'v1.0.0',

	// 系统名称
	systemName: '后台管理系统',

	// 主题配置
	theme: {
		primaryColor: '#409EFF', // 主色
		menuBg: '#ffffff', // 菜单背景色
		menuText: '#303133', // 菜单文字颜色
		menuActiveText: '#409EFF' // 菜单选中文字颜色
	},
	
	// 导航
	navigation: {
		sidebar: sidebarMap,
		// header: topNavMap || []
	}
}

export const appConfig = Object.freeze(originConfig)

export default appConfig
