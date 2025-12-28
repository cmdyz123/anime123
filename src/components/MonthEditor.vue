<template>
  <div class="month-editor">
    <div v-if="userRole === 'admin'">
      <div class="header-section">
        <h1>{{ currentMonthName }} 动漫编辑器</h1>
        <div class="nav-buttons">
          <button class="nav-btn" @click="goToMonthPage">返回月份页面</button>
          <button class="nav-btn" @click="goToCategoryManager">分类管理</button>
        </div>
      </div>
      
      <div class="add-anime-form">
        <h2>添加新动漫</h2>
        <div class="form-group">
          <label>标题:</label>
          <input type="text" v-model="newAnime.title" placeholder="输入动漫标题">
        </div>
        <div class="form-group">
          <label>信息:</label>
          <input type="text" v-model="newAnime.info" placeholder="输入动漫信息">
        </div>
        <div class="form-group">
          <label>图片路径:</label>
          <input type="text" v-model="newAnime.image" placeholder="输入图片路径">
        </div>
        <button class="add-btn" @click="addAnime">添加动漫</button>
      </div>
      
      <div class="anime-list-section">
        <h2>现有动漫</h2>
        <div v-for="(anime, index) in animeList" :key="anime.id" class="anime-item">
          <div v-if="editingIndex === index" class="anime-edit">
            <input type="text" v-model="animeList[index].title" class="edit-input">
            <input type="text" v-model="animeList[index].info" class="edit-input">
            <input type="text" v-model="animeList[index].image" class="edit-input">
            <div class="edit-actions">
              <button @click="saveEdit(index)">保存</button>
              <button @click="cancelEdit(index)">取消</button>
            </div>
          </div>
          <div v-else class="anime-display">
            <img :src="anime.image" :alt="anime.title" class="anime-thumbnail">
            <div class="anime-details">
              <h3>{{ anime.title }}</h3>
              <p>{{ anime.info }}</p>
            </div>
            <div class="anime-actions">
              <button @click="startEdit(index)">编辑</button>
              <button @click="deleteAnime(index)">删除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="restricted-access">
        <h1>权限不足</h1>
        <p>您没有权限访问动漫编辑页面，请以管理员身份登录。</p>
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
const currentMonthName = ref(currentMonth.value.replace('.', '年') + '月')

const goToMonthPage = () => {
  router.push({ path: `/anime/${currentMonth.value}` })
}

const goToRestricted = () => {
  router.push({ name: 'Restricted' })
}

const goToCategoryManager = () => {
  router.push({ name: 'CategoryManager' })
}

const animeList = ref([])
const newAnime = ref({ title: '', info: '', image: '' })
const editingIndex = ref(-1)
const originalAnime = ref({})

const loadAnimeList = () => {
  const savedAnime = JSON.parse(localStorage.getItem(`animeList${currentMonth.value}`)) || []
  if (savedAnime.length > 0) {
    animeList.value = savedAnime
  } else {
    // 如果没有保存的数据，加载默认数据
    animeList.value = [
      { id: 1, title: `${currentMonthName.value} 新番1`, info: '(全12话) 大陆', image: `/images/${currentMonth.value}/default.jpg` },
      { id: 2, title: `${currentMonthName.value} 新番2`, info: '(全13话) 港台', image: `/images/${currentMonth.value}/default.jpg` }
    ]
  }
}

const saveAnimeList = () => {
  localStorage.setItem(`animeList${currentMonth.value}`, JSON.stringify(animeList.value))
}

const addAnime = () => {
  if (newAnime.value.title && newAnime.value.image) {
    const newId = Math.max(...animeList.value.map(a => a.id), 0) + 1
    // 确保图片路径包含月份文件夹
    let imagePath = newAnime.value.image
    if (!imagePath.startsWith(`/images/${currentMonth.value}/`)) {
      imagePath = `/images/${currentMonth.value}/${imagePath}`
    }
    animeList.value.push({
      id: newId,
      title: newAnime.value.title,
      info: newAnime.value.info,
      image: imagePath
    })
    saveAnimeList()
    newAnime.value = { title: '', info: '', image: '' }
    console.log('动漫添加成功')
  } else {
    alert('请填写标题和图片路径')
  }
}

const startEdit = (index) => {
  editingIndex.value = index
  originalAnime.value = JSON.parse(JSON.stringify(animeList.value[index]))
}

const saveEdit = (index) => {
  if (animeList.value[index].title && animeList.value[index].image) {
    editingIndex.value = -1
    saveAnimeList()
    console.log('动漫信息更新成功')
  } else {
    alert('请填写标题和图片路径')
  }
}

const cancelEdit = (index) => {
  animeList.value[index] = originalAnime.value
  editingIndex.value = -1
}

const deleteAnime = (index) => {
  if (confirm('确定要删除这个动漫吗？')) {
    animeList.value.splice(index, 1)
    saveAnimeList()
    console.log('动漫删除成功')
  }
}

onMounted(() => {
  loadAnimeList()
})
</script>

<style scoped>
.month-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

.add-anime-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-btn {
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.add-btn:hover {
  background: #229954;
}

.anime-list-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.anime-item {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.anime-edit {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.edit-actions {
  display: flex;
  gap: 10px;
}

.edit-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.edit-actions button:first-child {
  background: #27ae60;
  color: white;
}

.edit-actions button:last-child {
  background: #e74c3c;
  color: white;
}

.anime-display {
  display: flex;
  align-items: center;
  gap: 20px;
}

.anime-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.anime-details {
  flex: 1;
}

.anime-details h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
}

.anime-details p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.anime-actions {
  display: flex;
  gap: 10px;
}

.anime-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.anime-actions button:first-child {
  background: #3498db;
  color: white;
}

.anime-actions button:last-child {
  background: #e74c3c;
  color: white;
}
</style>