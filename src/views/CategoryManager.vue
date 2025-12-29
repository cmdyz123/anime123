<template>
  <div class="category-manager">
    <div v-if="userRole === 'admin'">
      <div class="header-section">
        <h1>{{ currentMonth.value }} 分类管理</h1>
        <div class="nav-buttons">
          <button class="nav-btn" @click="goToAnimeList">主页面</button>
          <button class="nav-btn" @click="goToAnimeEditor">动漫编辑</button>
          <button class="nav-btn save-btn" @click="saveAllChanges">保存所有更改</button>
        </div>
      </div>
      
      <div class="category-form">
        <h2>添加新分类</h2>
        <input type="text" v-model="newCategory" placeholder="输入分类名称" @keyup.enter="addCategory">
        <button @click="addCategory">添加</button>
      </div>
      
      <div class="category-list">
        <h2>现有分类</h2>
        <div v-for="(category, index) in categories" :key="index" class="category-item">
          <input v-if="editingIndex === index" type="text" v-model="categories[index].name" @blur="saveEdit(index)" @keyup.enter="saveEdit(index)" class="edit-input">
          <span v-else @click="startEdit(index)">{{ category.name }}</span>
          <div class="category-actions">
            <button v-if="editingIndex === index" @click="cancelEdit(index)">取消</button>
            <button v-else @click="startEdit(index)">编辑</button>
            <button @click="deleteCategory(index)">删除</button>
          </div>
        </div>
      </div>
      
      <div class="batch-category">
        <h2>批量分类</h2>
        <select v-model="batchCategory">
          <option value="">选择分类</option>
          <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
        </select>
        <button @click="applyBatchCategory">应用到选中番剧</button>
      </div>

      <div class="anime-categories">
        <h2>番剧分类</h2>
        <div v-for="anime in allAnime" :key="anime.id" class="anime-category-item">
          <input type="checkbox" v-model="selectedAnimes" :value="anime.id">
          <span>{{ anime.title }}</span>
          <select v-model="anime.category" @change="updateCategory(anime)">
            <option value="">未分类</option>
            <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
          </select>
        </div>
      </div>
      
      <div class="save-section">
        <button class="save-btn" @click="saveAllChanges">保存所有更改</button>
      </div>
    </div>
    <div v-else>
      <div class="restricted-access">
        <h1>权限不足</h1>
        <p>您没有权限访问分类管理页面，请以管理员身份登录。</p>
        <button class="nav-btn" @click="goToRestricted">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { getCorrectImagePath, fixAnimeImagePaths } from '../utils/imageMapper' // 同时导入两个函数

const router = useRouter()
const route = useRoute()

// 从URL参数获取月份信息
const currentMonth = ref(route.params.month || '2025.10')

// 定义响应式数据
const categories = ref([])
const newCategoryName = ref('')
const allAnime = ref([])
const selectedAnime = ref([])
const savedAnime = ref([])

// 跳转到动漫详情页面
const goToDetails = (anime) => {
  router.push({ name: 'AnimeDetails', params: { id: anime.id }, query: { anime: JSON.stringify(anime) } })
}

// 跳转到动漫列表页面
const goToAnimeList = () => {
  if (currentMonth.value === '2026.1') {
    router.push({ name: 'Anime20261' })
  } else {
    router.push({ name: 'AnimeMonth', params: { month: currentMonth.value } })
  }
}

// 跳转到动漫编辑页面
const goToAnimeEditor = () => {
  router.push({ name: 'MonthEditor', params: { month: currentMonth.value } })
}

// 加载动漫数据
const loadAnimeData = () => {
  try {
    // 从localStorage加载动漫列表
    const savedAnimeList = JSON.parse(localStorage.getItem(`animeList${currentMonth.value}`)) || []
    
    // 修复图片路径
    const fixedAnimeList = savedAnimeList.map(anime => ({
      ...anime,
      image: getCorrectImagePath(anime.image)
    }))
    
    // 如果有修复操作，更新localStorage
    if (JSON.stringify(fixedAnimeList) !== JSON.stringify(savedAnimeList)) {
      localStorage.setItem(`animeList${currentMonth.value}`, JSON.stringify(fixedAnimeList))
      savedAnime.value = fixedAnimeList
    } else {
      savedAnime.value = savedAnimeList
    }
    
    // 加载分类信息
    const savedCategories = JSON.parse(localStorage.getItem(`animeCategories${currentMonth.value}`)) || []
    categories.value = savedCategories
    
    // 修复所有动漫的图片路径
    allAnime.value = fixAnimeImagePaths(savedAnimeList)
  } catch (error) {
    console.error('加载动漫数据时出错:', error)
  }
}

// 添加新分类
const addCategory = () => {
  if (newCategoryName.value.trim() === '') return
  
  const newCategory = { name: newCategoryName.value.trim() }
  categories.value.push(newCategory)
  
  // 保存分类到localStorage
  localStorage.setItem(`animeCategories${currentMonth.value}`, JSON.stringify(categories.value))
  
  // 清空输入框
  newCategoryName.value = ''
}

// 删除分类
const deleteCategory = (categoryName) => {
  categories.value = categories.value.filter(category => category.name !== categoryName)
  
  // 更新所有使用该分类的动漫
  savedAnime.value.forEach(anime => {
    if (anime.category === categoryName) {
      anime.category = ''
    }
  })
  
  // 保存更新到localStorage
  localStorage.setItem(`animeCategories${currentMonth.value}`, JSON.stringify(categories.value))
  localStorage.setItem(`animeList${currentMonth.value}`, JSON.stringify(savedAnime.value))
}

// 批量应用分类
const selectedCategoryToApply = ref('')

const applyBatchCategory = () => {
  if (!selectedCategoryToApply.value) return
  
  selectedAnime.value.forEach(animeId => {
    const anime = savedAnime.value.find(a => a.id === animeId)
    if (anime) {
      anime.category = selectedCategoryToApply.value
    }
  })
  
  // 保存更新到localStorage
  localStorage.setItem(`animeList${currentMonth.value}`, JSON.stringify(savedAnime.value))
  
  // 清空选中的动漫和分类
  selectedAnime.value = []
  selectedCategoryToApply.value = ''
  
  // 跳转到列表页面
  goToAnimeList()
}

// 切换动漫选中状态
const toggleAnimeSelection = (animeId) => {
  const index = selectedAnime.value.indexOf(animeId)
  if (index !== -1) {
    selectedAnime.value.splice(index, 1)
  } else {
    selectedAnime.value.push(animeId)
  }
}

// 监听月份变化，重新加载数据
watch(() => route.params.month, (newMonth) => {
  currentMonth.value = newMonth || '2025.10'
  loadAnimeData()
})

// 组件挂载时加载数据
onMounted(() => {
  try {
    loadAnimeData()
  } catch (error) {
    console.error('加载数据出错:', error)
  }
})
</script>

<style scoped>
.category-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.nav-buttons {
  display: flex;
  gap: 10px;
}

.nav-btn {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background: #2980b9;
}

.category-form {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.category-form input {
  padding: 10px;
  width: 300px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.category-form button {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.category-list {
  margin-bottom: 30px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background: #f8f9fa;
  border-radius: 4px;
}

.category-item .edit-input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.category-actions {
  display: flex;
  gap: 5px;
}

.category-item button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.category-item button:nth-child(1) {
  background: #3498db;
  color: white;
}

.category-item button:nth-child(2) {
  background: #e74c3c;
  color: white;
}

.anime-categories {
  margin-top: 30px;
}

.anime-category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background: #f8f9fa;
  border-radius: 4px;
}

.anime-category-item input[type="checkbox"] {
  margin-right: 10px;
  transform: scale(1.2);
}

.anime-category-item select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.batch-category {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.batch-category select {
  padding: 10px;
  width: 300px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.batch-category button {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.category-manager h2 {
  margin-bottom: 15px;
  color: #333;
}

/* 已在上面定义过的样式，此处删除重复定义 */

.save-section {
  margin-top: 30px;
}

.save-btn {
  padding: 10px 20px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.save-btn:hover {
  background: #229954;
}
</style>