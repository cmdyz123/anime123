<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="username" required placeholder="请输入用户名">
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" required placeholder="请输入密码">
        </div>
        <button type="submit" class="login-button">登录</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  // 验证管理员账号
  if (username.value === 'cmdyz123' && password.value === '135790aa') {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', 'admin')
    localStorage.setItem('username', username.value)
    router.push('/')
  } else {
    // 普通用户登录
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', 'user')
    localStorage.setItem('username', username.value)
    router.push('/restricted')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: #5568d3;
}
</style>