﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="restricted-container">
    <div class="restricted-content">
      <h1>欢迎使用动漫管理系统</h1>
      <p class="restricted-message">您当前以普通用户身份登录，只能查看动漫列表，无法进行分类管理和动漫编辑。</p>
      
      <div class="anime-list-container">
        <h2>动漫列表</h2>
        <div class="category-filter">
          <select v-model="selectedCategory" @change="filterAnime">
            <option value="">所有分类</option>
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

// 修复图片路径
const fixImagePaths = (animeList) => {
  return animeList.map(anime => {
    let imagePath = anime.image
    if (imagePath && (imagePath.includes('/anime123/') || imagePath.includes('public/'))) {
      imagePath = imagePath.replace('/anime123/', '/').replace('public/', '/')
    }
    return { ...anime, image: imagePath }
  })
}

const loadAnimeData = () => {
  // 加载所有月份的动漫数据
  const allAnime = []
  const months = ['2025.10', '2026.1']
  
  months.forEach(month => {
    const monthData = localStorage.getItem(`animeList${month}`)
    if (monthData) {
      const monthAnime = JSON.parse(monthData)
      // 修复图片路径
      const fixedAnime = fixImagePaths(monthAnime)
      allAnime.push(...fixedAnime)
      // 更新localStorage中的数据
      localStorage.setItem(`animeList${month}`, JSON.stringify(fixedAnime))
    } else {
      // 如果没有保存的数据，添加默认动漫
      if (month === '2025.10') {
        // 使用2025.10目录下真实存在的图片
        allAnime.push(
          { id: 1, title: '欢迎来到笑容不断的职场', info: '(全12话) 日本', image: `/images/2025.10/欢迎来到笑容不断的职场.jpg` },
          { id: 2, title: '一拳超人第三期', info: '(全12话) 日本', image: `/images/2025.10/一拳超人第三期.jpg` }
        )
      } else if (month === '2026.1') {
        // 2026.1暂时使用2025.10的图片作为默认
        allAnime.push(
          { id: 3, title: '王者天下第六期', info: '(全24话) 日本', image: `/images/2025.10/王者天下第六期.jpg` },
          { id: 4, title: '致不灭的你第三期', info: '(全12话) 日本', image: `/images/2025.10/致不灭的你第三期.jpg` }
        )
      }
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
