/**
 * 系统配置文件
 * @author 19
 * @date 2026/5/8 11:00
 * @version v1.0.0
 * 系统配置文件
 */
import { sidebarMap } from './sidebarMap'

const originConfig = {
	version: 'v1.0.0',
	header: {
		title: '测试项目',
		backgroundColor: '#f5f5f5',
		textColor: '#303133',
	},
	layout: {
		showSidebar: true,
		sidebarWidth: 200,
		sidebarFoldWidth: 64,
	},
	sidebar: {
		backgroundColor: '#ffffff',
		textColor: '#303133',
		activeTextColor: '#409eff',
		menu: sidebarMap,
	},
}

// 获取用户角色信息
function getUserRoles() {
	const rawRoles = localStorage.getItem('roles') || localStorage.getItem('role') || ''
	if (!rawRoles) return []

	try {
		const parsed = JSON.parse(rawRoles)
		if (Array.isArray(parsed)) return parsed
		if (typeof parsed === 'string') return [parsed]
		return []
	} catch (error) {
		return rawRoles
			.split(',')
			.map(role => role.trim())
			.filter(Boolean)
	}
}

// 权限检查函数
function hasPermission(roles, userRoles) {
	if (!roles || !roles.length) return true
	if (!userRoles.length) return false
	return userRoles.some(role => roles.includes(role))
}

// 递归过滤菜单项，根据用户角色返回可访问的菜单
function normalizeMenus(menus = [], userRoles = []) {
	return menus
		.map(menu => {
			if (!hasPermission(menu.roles, userRoles)) {
				return null
			}

			if (Array.isArray(menu.children)) {
				const children = normalizeMenus(menu.children, userRoles)
				if (!children.length) {
					return null
				}

				return {
					...menu,
					children,
				}
			}

			if (!menu.link) {
				return null
			}

			return {
				...menu,
			}
		})
		.filter(Boolean)
}

export const appConfig = Object.freeze(originConfig)

// 导出一个函数，获取当前用户可访问的侧边栏菜单
export function getSidebarMenus() {
	return normalizeMenus(appConfig.sidebar.menu, getUserRoles())
}

export default appConfig
