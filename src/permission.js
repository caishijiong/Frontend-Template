// import router from '@/router'

// const WHITE_LIST = ['/login', '/403', '/404']

// function getToken() {
// 	return localStorage.getItem('token') || ''
// }

// function getUserRoles() {
// 	const rawRoles = localStorage.getItem('roles') || localStorage.getItem('role') || ''
// 	if (!rawRoles) return []

// 	try {
// 		const parsed = JSON.parse(rawRoles)
// 		if (Array.isArray(parsed)) return parsed
// 		if (typeof parsed === 'string') return [parsed]
// 		return []
// 	} catch (error) {
// 		return rawRoles
// 			.split(',')
// 			.map(role => role.trim())
// 			.filter(Boolean)
// 	}
// }

// router.beforeEach((to, from, next) => {
// 	const token = getToken()

// 	if (!token) {
// 		if (WHITE_LIST.includes(to.path)) {
// 			next()
// 			return
// 		}

// 		next({ path: '/login', query: { redirect: to.fullPath } })
// 		return
// 	}

// 	if (to.path === '/403' || to.path === '/404') {
// 		next()
// 		return
// 	}

// 	const requiredRoles = to.meta?.roles || []
// 	if (!requiredRoles.length) {
// 		next()
// 		return
// 	}

// 	const userRoles = getUserRoles()
// 	const hasAccess = userRoles.some(role => requiredRoles.includes(role))
// 	next(hasAccess ? undefined : '/403')
// })
