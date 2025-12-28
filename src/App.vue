<script setup>
import Sidebar from './components/Sidebar.vue'
import UserDropdown from './components/UserDropdown.vue'
</script>

<template>
  <div id="app">
    <UserDropdown />
    <div class="app-container">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
