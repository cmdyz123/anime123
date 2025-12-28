<template>
  <div class="anime-list">
    <div class="header-section">
      <h1>{{ currentMonthName }} 新番</h1>
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
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'

const router = useRouter()
const route = useRoute()

const currentMonth = ref(route.params.month || '2025.10')
const currentMonthName = ref(currentMonth.value.replace('.', '年') + '月')

const goToDetails = (anime) => {
  router.push({ name: 'AnimeDetails', params: { id: anime.id }, query: { anime: JSON.stringify(anime) } })
}

const goToCategoryManager = () => {
  router.push({ name: 'CategoryManager', params: { month: currentMonth.value } })
}

const goToAnimeEditor = () => {
  router.push({ name: 'MonthEditor', params: { month: currentMonth.value } })
}

// 分类筛选
const categories = ref(JSON.parse(localStorage.getItem(`animeCategories${currentMonth.value}`)) || [
  { name: '原创动画' },
  { name: '动画官网' },
  { name: 'PV' },
  { name: '先行画面' }
])

const selectedCategory = ref('')
const allAnime = ref([])
const filteredAnime = computed(() => {
  if (!selectedCategory.value) {
    return allAnime.value
  }
  return allAnime.value.filter(anime => anime.category === selectedCategory.value)
})

const filterAnime = () => {
  console.log(`筛选分类: ${selectedCategory.value}`)
}

// 从localStorage加载分类数据
const loadAnimeCategories = () => {
  const savedCategories = JSON.parse(localStorage.getItem(`animeCategories${currentMonth.value}`))
  if (savedCategories) {
    categories.value = savedCategories
  }
  
  const savedAnimeList = JSON.parse(localStorage.getItem(`animeList${currentMonth.value}`)) || []
  
  // 更新所有动漫的分类
  const updateAnimeWithCategories = (animeList) => {
      return animeList.map(anime => {
        const savedAnime = savedAnimeList.find(s => s.id === anime.id)
        return { ...anime, category: savedAnime?.category || '' }
      })
    }
    
    allAnime.value = updateAnimeWithCategories(savedAnimeList)
  }

onMounted(() => {
  loadAnimeCategories()
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
  margin-bottom: 30px;
}

.header-section h1 {
  font-size: 28px;
  color: #333;
  margin: 0;
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
  margin-bottom: 30px;
}

.category-filter select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  min-width: 200px;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.anime-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.anime-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.anime-title {
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.anime-info {
  padding: 0 15px 10px;
  color: #666;
  font-size: 14px;
}

.anime-category {
  padding: 5px 15px 15px;
  color: #3498db;
  font-size: 12px;
  font-weight: bold;
}

@media (max-width: 900px) {
  .anime-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .anime-grid {
    grid-template-columns: 1fr;
  }
}
</style>