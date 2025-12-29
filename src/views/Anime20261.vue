<template>
  <div class="anime-list">
    <div class="header-section">
      <h1>2026年1月新番</h1>
      <div class="nav-buttons">
        <button class="nav-btn" @click="goToCategoryManager">设置分类</button>
        <button class="nav-btn" @click="goToAnimeEditor">动漫编辑</button>
      </div>
    </div>
    
    <div class="category-filter">
      <select v-model="selectedCategory" @change="filterAnime">
        <option value="">所有分类</option>
        <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
      </select>
    </div>
    
    <div class="anime-grid">
      <div v-for="anime in filteredAnime" :key="anime.id" class="anime-card" @click="goToDetails(anime)">
        <img :src="anime.image" :alt="anime.title" class="anime-image">
        <div class="anime-title">{{ anime.title }}</div>
        <div class="anime-info">{{ anime.info }}</div>
        <div v-if="anime.category" class="anime-category">{{ anime.category }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { fixAnimeImagePaths } from '../utils/imageMapper'

const router = useRouter()

const goToDetails = (anime) => {
  router.push({ name: 'AnimeDetails', params: { id: anime.id }, query: { anime: JSON.stringify(anime) } })
}

const goToCategoryManager = () => {
  router.push({ name: 'CategoryManager', params: { month: '2026.1' } })
}

const goToAnimeEditor = () => {
  router.push({ name: 'MonthEditor', params: { month: '2026.1' } })
}

// 从localStorage加载动漫列表并修复图片路径
const loadAnimeList = () => {
  let animeList = JSON.parse(localStorage.getItem('animeList20261')) || [
    { id: 1, title: '2026年1月新番1', info: '(全12话) 大陆', image: '/images/default.jpg', category: '' },
    { id: 2, title: '2026年1月新番2', info: '(全13话) 港台', image: '/images/default.jpg', category: '' }
  ]
  return fixAnimeImagePaths(animeList)
}

const allAnime = ref(loadAnimeList())

// 分类筛选
const categories = ref(JSON.parse(localStorage.getItem('animeCategories2026.1')) || [
  { name: '原创动画' },
  { name: '动画官网' },
  { name: 'PV' },
  { name: '先行画面' }
])

const selectedCategory = ref('')

const filteredAnime = ref([])

const filterAnime = () => {
  if (!selectedCategory.value) {
    filteredAnime.value = [...allAnime.value]
  } else {
    filteredAnime.value = allAnime.value.filter(anime => anime.category === selectedCategory.value)
  }
}

const loadAnimeCategories = () => {
  const savedCategories = JSON.parse(localStorage.getItem('animeCategories2026.1'))
  if (savedCategories) {
    categories.value = savedCategories
  }
}

onMounted(() => {
  loadAnimeCategories()
  filterAnime() // 初始化筛选
})
</script>

<style scoped>
.anime-list {
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

.category-filter {
  margin-bottom: 20px;
}

.category-filter select {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.anime-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
}

.anime-card:hover {
  transform: translateY(-5px);
}

.anime-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.anime-title {
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
}

.anime-info {
  padding: 0 10px 10px;
  font-size: 14px;
  color: #666;
}

.anime-category {
  padding: 5px 10px;
  font-size: 12px;
  color: #3498db;
  background: #e8f4f8;
  border-radius: 4px;
  margin: 0 10px 10px;
  display: inline-block;
}
</style>