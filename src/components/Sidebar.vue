<template>
  <div class="sidebar" v-if="isAuthenticated">
    <div class="sidebar-header">
      <h2>新番导航</h2>
      <button class="add-btn" @click="showAddForm = true">+ 添加月份</button>
    </div>
    
    <div class="month-list">
      <div 
        v-for="month in months" 
        :key="month.id" 
        class="month-item"
        :class="{ active: currentMonth === month.id }"
        @click="navigateToMonth(month)"
      >
        <span class="month-name">{{ month.name }}</span>
        <button class="edit-btn" @click.stop="editMonth(month)">✏️</button>
        <button class="delete-btn" @click.stop="deleteMonth(month)">🗑️</button>
      </div>
    </div>
    
    <div v-if="showAddForm" class="add-form">
      <input 
        type="text" 
        v-model="newMonthName" 
        placeholder="例如：2026.1"
        @keyup.enter="addMonth"
      >
      <button @click="addMonth">添加</button>
      <button @click="showAddForm = false">取消</button>
    </div>
    
    <div v-if="editingMonth" class="edit-form">
      <input 
        type="text" 
        v-model="editingMonthName" 
        @keyup.enter="saveEdit"
      >
      <button @click="saveEdit">保存</button>
      <button @click="cancelEdit">取消</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const months = ref([])
const currentMonth = ref('2025.10')
const showAddForm = ref(false)
const newMonthName = ref('')
const editingMonth = ref(null)
const editingMonthName = ref('')
const isAuthenticated = computed(() => localStorage.getItem('isAuthenticated') === 'true')

const loadMonths = () => {
  const savedMonths = JSON.parse(localStorage.getItem('animeMonths')) || [
    { id: '2025.10', name: '2025年10月', path: '/anime/2025.10' },
    { id: '2026.1', name: '2026年1月', path: '/anime/2026.1' }
  ]
  months.value = savedMonths
}

const saveMonths = () => {
  localStorage.setItem('animeMonths', JSON.stringify(months.value))
}

const navigateToMonth = (month) => {
  currentMonth.value = month.id
  router.push(month.path)
}

const addMonth = () => {
  if (newMonthName.value.trim()) {
    const id = newMonthName.value.trim().replace(/年|月/g, '.').replace(/\s/g, '')
    const name = newMonthName.value.trim()
    const path = `/anime/${id}`
    
    months.value.push({ id, name, path })
    saveMonths()
    showAddForm.value = false
    newMonthName.value = ''
  }
}

const editMonth = (month) => {
  editingMonth.value = month
  editingMonthName.value = month.name
}

const saveEdit = () => {
  if (editingMonth.value && editingMonthName.value.trim()) {
    editingMonth.value.name = editingMonthName.value.trim()
    saveMonths()
    editingMonth.value = null
  }
}

const cancelEdit = () => {
  editingMonth.value = null
}

const deleteMonth = (month) => {
  if (confirm(`确定要删除 ${month.name} 吗？`)) {
    const index = months.value.findIndex(m => m.id === month.id)
    if (index !== -1) {
      months.value.splice(index, 1)
      saveMonths()
    }
  }
}

onMounted(() => {
  loadMonths()
})
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ddd;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.add-btn {
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}

.month-list {
  margin-bottom: 20px;
}

.month-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.month-item:hover {
  background: #e8f4f8;
}

.month-item.active {
  background: #3498db;
  color: white;
}

.edit-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-left: 5px;
  padding: 2px 5px;
  border-radius: 3px;
}

.edit-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.delete-btn:hover {
  background: rgba(255, 0, 0, 0.2);
  color: #e74c3c;
}

.add-form, .edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 4px;
}

.add-form input, .edit-form input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-form button, .edit-form button {
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-form button:first-of-type, .edit-form button:first-of-type {
  background: #3498db;
  color: white;
}

.add-form button:last-of-type, .edit-form button:last-of-type {
  background: #95a5a6;
  color: white;
}
</style>