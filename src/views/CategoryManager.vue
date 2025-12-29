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
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const userRole = ref(localStorage.getItem('userRole') || 'user')
const currentMonth = ref(route.params.month || '2025.10')

const categories = ref(JSON.parse(localStorage.getItem(`animeCategories${currentMonth.value}`)) || [
  { name: '原创动画' },
  { name: '动画官网' },
  { name: 'PV' },
  { name: '先行画面' }
])

const newCategory = ref('')
const allAnime = ref([])
const editingIndex = ref(-1)
const originalName = ref('')
const selectedAnimes = ref([])
const batchCategory = ref('')

// 修复图片路径函数
const fixImagePaths = (animeList) => {
  return animeList.map(anime => {
    let imagePath = anime.image
    // 修复错误的路径格式
    if (imagePath) {
      // 移除/anime123/前缀
      if (imagePath.startsWith('/anime123/')) {
        imagePath = imagePath.replace('/anime123/', '/')
      }
      // 移除public/前缀
      if (imagePath.startsWith('public/')) {
        imagePath = imagePath.replace('public/', '/')
      }
      // 确保路径以/开头
      if (!imagePath.startsWith('/')) {
        imagePath = '/' + imagePath
      }
    }
    return { ...anime, image: imagePath }
  })
}

const addCategory = () => {
  if (newCategory.value.trim()) {
    categories.value.push({ name: newCategory.value.trim() })
    newCategory.value = ''
    saveCategories()
  }
}

const deleteCategory = (index) => {
  categories.value.splice(index, 1)
  saveCategories()
}

const saveCategories = () => {
  localStorage.setItem(`animeCategories${currentMonth.value}`, JSON.stringify(categories.value))
}

const startEdit = (index) => {
  editingIndex.value = index
  originalName.value = categories.value[index].name
}

const saveEdit = (index) => {
  if (categories.value[index].name.trim()) {
    editingIndex.value = -1
    saveCategories()
  } else {
    categories.value[index].name = originalName.value
    editingIndex.value = -1
  }
}

const cancelEdit = (index) => {
  categories.value[index].name = originalName.value
  editingIndex.value = -1
}

const applyBatchCategory = () => {
  if (!batchCategory.value) {
    alert('请先选择分类')
    return
  }
  
  selectedAnimes.value.forEach(animeId => {
    const anime = allAnime.value.find(a => a.id === animeId)
    if (anime) {
      anime.category = batchCategory.value
    }
  })
  
  // 保存到localStorage
  localStorage.setItem(`animeList${currentMonth.value}`, JSON.stringify(allAnime.value))
  console.log(`批量分类完成，共更新 ${selectedAnimes.value.length} 部番剧`)
  
  // 清空选择
  selectedAnimes.value = []
  batchCategory.value = ''
}

const goToAnimeList = () => {
  if (currentMonth.value === '2026.1') {
    router.push({ name: 'Anime20261' })
  } else {
    router.push({ name: 'AnimeList' })
  }
}

const goToRestricted = () => {
  router.push({ name: 'Restricted' })
}

const goToAnimeEditor = () => {
  // 从URL参数获取当前月份
  router.push({ name: 'MonthEditor', params: { month: currentMonth.value } })
}

const updateCategory = (anime) => {
  try {
    // 保存所有动漫的分类到localStorage
    localStorage.setItem(`animeList${currentMonth.value}`, JSON.stringify(allAnime.value))
    console.log(`更新番剧 ${anime.title} 的分类为 ${anime.category}`)
  } catch (error) {
    console.error('保存番剧分类失败:', error)
    alert('保存分类失败，请检查浏览器存储设置')
  }
}

const saveAllChanges = () => {
  try {
    // 保存分类和动漫分类
    saveCategories()
    localStorage.setItem(`animeList${currentMonth.value}`, JSON.stringify(allAnime.value))
    alert('所有更改已保存')
    console.log('所有分类更改已保存')
  } catch (error) {
    console.error('保存所有更改失败:', error)
    alert('保存失败，请检查浏览器存储设置')
  }
}

onMounted(() => {
  try {
    // 从localStorage加载特定月份的番剧分类
    const savedAnime = JSON.parse(localStorage.getItem(`animeList${currentMonth.value}`))
    if (savedAnime) {
      // 修复图片路径
      const fixedAnime = fixImagePaths(savedAnime)
      allAnime.value = fixedAnime
      // 如果修复了路径，保存回localStorage
      if (JSON.stringify(fixedAnime) !== JSON.stringify(savedAnime)) {
        localStorage.setItem(`animeList${currentMonth.value}`, JSON.stringify(fixedAnime))
      }
    } else {
      // 只在没有保存数据时初始化空数组，不再加载默认的62部番剧
      allAnime.value = []
    }
  } catch (error) {
    console.error('加载番剧分类失败:', error)
    alert('加载分类失败，请检查浏览器存储设置')
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

.category-form {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.category-list {
  margin-bottom: 30px;
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

.anime-category-item select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

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