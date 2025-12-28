<template>
  <div class="user-dropdown">
    <div class="user-info" @mouseenter="showDropdown = true">
      <div class="user-avatar">
        <span>{{ userInitial }}</span>
      </div>
      <span class="username">{{ username }}</span>
      <span class="role">{{ role }}</span>
    </div>
    
    <div class="dropdown-menu" v-show="showDropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
      <button class="dropdown-item" @click="goToWatchStatus">
        <span class="icon">👀</span>
        <span>追番情况</span>
      </button>
      <button class="dropdown-item logout-btn" @click="logout">
        <span class="icon">🚪</span>
        <span>退出登录</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showDropdown = ref(false)

const username = computed(() => localStorage.getItem('username') || '用户')
const role = computed(() => localStorage.getItem('userRole') || 'user')

const userInitial = computed(() => {
  if (username.value) {
    return username.value.charAt(0).toUpperCase()
  }
  return 'U'
})

const goToWatchStatus = () => {
  router.push('/watch-status')
  showDropdown.value = false
}

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('userRole')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped>
.user-dropdown {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  background: white;
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-info:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
}

.username {
  font-weight: 600;
  color: #333;
}

.role {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: #e0e7ff;
  color: #667eea;
}

.dropdown-menu {
  position: absolute;
  top: 60px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  padding: 8px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.icon {
  font-size: 16px;
}

.logout-btn {
  color: #ef4444;
}

.logout-btn:hover {
  background: #fee2e2;
}
</style>