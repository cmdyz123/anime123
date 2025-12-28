<script setup>
import Sidebar from './components/Sidebar.vue'
import UserDropdown from './components/UserDropdown.vue'
</script>

<template>
  <div id="app">
    <!-- 仅在非登录页面显示用户下拉菜单 -->
    <UserDropdown v-if="$route.path !== '/login'" />
    
    <!-- 仅在非登录页面显示侧边栏和主内容容器 -->
    <div class="app-container" v-if="$route.path !== '/login'">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
    
    <!-- 在登录页面仅显示路由视图 -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f5f7fa;
  font-family: inherit;
}

#app {
  min-height: 100vh;
}

.app-container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
