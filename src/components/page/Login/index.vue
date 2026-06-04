<template>
	<section class="login-page">
		<div class="ambient ambient-left"></div>
		<div class="ambient ambient-right"></div>

		<div class="login-card">
			<div class="brand-block">
				<h1>后台管理系统</h1>
				<p>欢迎回来，请使用账号登录</p>
			</div>

			<el-form ref="loginForm" :model="form" :rules="rules" label-position="top" class="login-form">
				<el-form-item label="账号" prop="username">
					<el-input v-model="form.username" placeholder="请输入账号" clearable />
				</el-form-item>

				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
				</el-form-item>

				<el-button type="primary" class="submit-btn" :loading="loading" @click="handleLogin">
					登录
				</el-button>
			</el-form>
		</div>
	</section>
</template>

<script>
export default {
	name: 'LoginPage',
	data() {
		return {
			loading: false,
			form: {
				username: '',
				password: '',
			},
			rules: {
				username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
			},
		}
	},
	methods: {
		async handleLogin() {
			this.$refs.loginForm.validate(async (valid) => {
				if (!valid) {
					return
				}
				try {
					this.loading = true
					const response = await this.$http.post('/api/login', {
						username: this.form.username,
						password: this.form.password
					})
					// 存储token和用户信息
					localStorage.setItem('token', response.token)
					localStorage.setItem('userInfo', JSON.stringify(response.userInfo))
					localStorage.setItem('roles', JSON.stringify(response.roles || []))

					// 跳转到首页
					this.$router.push('/home')
					this.$message.success('登录成功')

				} catch (error) {
					this.$message.error(error.message || '登录失败')
				} finally {
					this.loading = false
				}
			})
		},
	},
}
</script>

<style scoped lang="scss">
.login-page {
	--bg-1: #f6f8ff;
	--bg-2: #eef1f8;
	--ink-main: #1f2430;
	--ink-sub: #6b7280;
	--line: #d9dee8;
	--primary: #0e7490;
	--primary-hover: #0a6178;

	min-height: 100vh;
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24px;
	background: radial-gradient(1200px 600px at 10% -10%, #d9f0ff 0%, transparent 55%),
		radial-gradient(900px 500px at 110% 110%, #ffe9cf 0%, transparent 50%),
		linear-gradient(140deg, var(--bg-1) 0%, var(--bg-2) 100%);
}

.ambient {
	position: absolute;
	border-radius: 999px;
	filter: blur(3px);
	opacity: 0.5;
	pointer-events: none;
}

.ambient-left {
	width: 300px;
	height: 300px;
	left: -80px;
	top: -60px;
	background: linear-gradient(120deg, #9ed8ff, #d4f1ff);
}

.ambient-right {
	width: 360px;
	height: 360px;
	right: -120px;
	bottom: -120px;
	background: linear-gradient(120deg, #ffd5a8, #ffe8cc);
}

.login-card {
	position: relative;
	z-index: 2;
	width: 100%;
	max-width: 430px;
	border: 1px solid rgba(255, 255, 255, 0.7);
	border-radius: 20px;
	padding: 34px 30px 26px;
	backdrop-filter: blur(10px);
	background: rgba(255, 255, 255, 0.8);
	box-shadow: 0 24px 50px rgba(18, 39, 58, 0.12);
	animation: card-up 0.45s ease;
}

.brand-block {
	margin-bottom: 20px;

	h1 {
		margin: 0;
		font-size: 28px;
		color: var(--ink-main);
		letter-spacing: 1px;
		font-weight: 700;
	}

	p {
		margin: 10px 0 0;
		color: var(--ink-sub);
		font-size: 14px;
	}
}

.login-form {
	::v-deep .el-form-item__label {
		color: var(--ink-main);
		font-weight: 600;
		padding-bottom: 6px;
	}

	::v-deep .el-input__inner {
		height: 44px;
		border-radius: 10px;
		border-color: var(--line);
		transition: border-color 0.2s ease, box-shadow 0.2s ease;

		&:focus {
			border-color: #79bfd1;
			box-shadow: 0 0 0 3px rgba(14, 116, 144, 0.12);
		}
	}
}

.submit-btn {
	margin-top: 8px;
	width: 100%;
	height: 44px;
	border: none;
	border-radius: 10px;
	font-size: 15px;
	font-weight: 600;
	background: linear-gradient(120deg, var(--primary) 0%, #0f8aa9 100%);

	&:hover,
	&:focus {
		background: linear-gradient(120deg, var(--primary-hover) 0%, #0d728a 100%);
	}
}

@keyframes card-up {
	from {
		opacity: 0;
		transform: translateY(12px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (max-width: 640px) {
	.login-page {
		padding: 16px;
	}

	.login-card {
		border-radius: 16px;
		padding: 24px 18px 20px;
	}

	.brand-block h1 {
		font-size: 24px;
	}
}
</style>