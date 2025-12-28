﻿﻿﻿﻿<template>
  <div class="restricted-container">
    <div class="restricted-content">
      <h1>娆㈣繋浣跨敤鍔ㄦ极绠＄悊绯荤粺</h1>
      <p class="restricted-message">鎮ㄥ綋鍓嶄互鏅€氱敤鎴疯韩浠界櫥褰曪紝鍙兘鏌ョ湅鍔ㄦ极鍒楄〃锛屾棤娉曡繘琛屽垎绫荤鐞嗗拰鍔ㄦ极缂栬緫銆?</p>
      
      <div class="anime-list-container">
        <h2>鍔ㄦ极鍒楄〃</h2>
        <div class="category-filter">
          <select v-model="selectedCategory" @change="filterAnime">
            <option value="">鎵€鏈夊垎绫?</option>
            <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
          </select>
        </div>
        <div class="anime-grid">
          <div v-for="anime in filteredAnime" :key="anime.id" class="anime-item" @click="goToDetails(anime)">
            <img :src="anime.image" :alt="anime.title" class="anime-image">
            <div class="anime-title">{{ anime.title }}</div>
            <div class="anime-info">{{ anime.info }}</div>
            <div class="anime-category" v-if="anime.category">{{ anime.category }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const animeList = ref([])
const filteredAnime = ref([])
const categories = ref([])
const selectedCategory = ref('')

const loadAnimeData = () => {
  // 鍔犺浇鎵€鏈夋湀浠界殑鍔ㄦ极鏁版嵁
  const allAnime = []
  const months = ['2025.10', '2026.1']
  
  months.forEach(month => {
    const monthData = localStorage.getItem(`animeList${month}`)
    if (monthData) {
      const monthAnime = JSON.parse(monthData)
      allAnime.push(...monthAnime)
    } else {
      // 濡傛灉娌℃湁淇濆瓨鐨勬暟鎹紝娣诲姞榛樿鍔ㄦ极
      allAnime.push(
        { id: 1, title: `${month} 新番1`, info: '(全12话) 大陆', image: `/images/${month}/default.jpg` },
        { id: 2, title: `${month} 新番2`, info: '(全13话) 港台', image: `/images/${month}/default.jpg` }
      )
    }
  })
  
  animeList.value = allAnime
}

const loadCategories = () => {
  // 鍔犺浇鎵€鏈夋湀浠界殑鍒嗙被鏁版嵁
  const allCategories = new Set()
  const months = ['2025.10', '2026.1']
  
  months.forEach(month => {
    const categoryData = localStorage.getItem(`animeCategories${month}`)
    if (categoryData) {
      const categories = JSON.parse(categoryData)
      categories.forEach(category => allCategories.add(category.name))
    }
  })
  
  categories.value = Array.from(allCategories).map(name => ({ name }))
}

const goToDetails = (anime) => {
  router.push({ name: 'AnimeDetails', params: { id: anime.id }, query: { anime: JSON.stringify(anime) } })
}

const filterAnime = () => {
  if (!selectedCategory.value) {
    filteredAnime.value = [...animeList.value]
  } else {
    filteredAnime.value = animeList.value.filter(anime => anime.category === selectedCategory.value)
  }
}

onMounted(() => {
  loadAnimeData()
  loadCategories()
  filterAnime()
})
</script>

<style scoped>
.restricted-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem;
}

.restricted-content {
  max-width: 1200px;
  margin: 0 auto;
}

.restricted-content h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

.restricted-message {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.anime-list-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.anime-list-container h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.anime-item {
  text-align: center;
  background: #fafafa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.anime-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.anime-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.anime-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
}

.anime-category {
  color: #666;
  font-size: 0.9rem;
}
</style>
