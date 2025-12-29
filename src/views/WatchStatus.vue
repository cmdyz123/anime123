<template>
  <div class="watch-status">
    <div class="header-section">
      <h1>我的追番情况</h1>
      <button class="nav-btn" @click="goBack">返回</button>
    </div>
    
    <div class="status-categories">
      <div class="status-category">
        <h2 class="status-title status-watching">
          <span class="icon">▶️</span>
          在看
        </h2>
        <div class="anime-grid">
          <div v-for="anime in watchingAnime" :key="anime.id" class="anime-item">
            <img :src="anime.image" :alt="anime.title" class="anime-image">
            <div class="anime-info">
              <div class="anime-title">{{ anime.title }}</div>
              <div class="anime-status">进度: {{ anime.progress || '0/12' }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="status-category">
        <h2 class="status-title status-completed">
          <span class="icon">✅</span>
          看完
        </h2>
        <div class="anime-grid">
          <div v-for="anime in completedAnime" :key="anime.id" class="anime-item">
            <img :src="anime.image" :alt="anime.title" class="anime-image">
            <div class="anime-info">
              <div class="anime-title">{{ anime.title }}</div>
              <div class="anime-status">已完成</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="status-category">
        <h2 class="status-title status-not-watched">
          <span class="icon">⏸️</span>
          未看
        </h2>
        <div class="anime-grid">
          <div v-for="anime in notWatchedAnime" :key="anime.id" class="anime-item">
            <img :src="anime.image" :alt="anime.title" class="anime-image">
            <div class="anime-info">
              <div class="anime-title">{{ anime.title }}</div>
              <div class="anime-status">未开始</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="status-category">
        <h2 class="status-title status-dropped">
          <span class="icon">❌</span>
          已弃
        </h2>
        <div class="anime-grid">
          <div v-for="anime in droppedAnime" :key="anime.id" class="anime-item">
            <img :src="anime.image" :alt="anime.title" class="anime-image">
            <div class="anime-info">
              <div class="anime-title">{{ anime.title }}</div>
              <div class="anime-status">已弃番</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fixAnimeImagePaths } from '../utils/imageMapper'

const router = useRouter()
const allAnime = ref([])

const watchingAnime = ref([])
const completedAnime = ref([])
const notWatchedAnime = ref([])
const droppedAnime = ref([])

const goBack = () => {
  router.back()
}

// 统一图片路径处理 - 使用工具函数
const fixImagePaths = fixAnimeImagePaths

const loadWatchStatus = () => {
  // 加载所有月份的动漫数据
  const months = ['2025.10', '2026.1']
  const allAnimeData = []
  
  months.forEach(month => {
    const monthData = localStorage.getItem(`animeList${month}`)
    if (monthData) {
      let monthAnime = JSON.parse(monthData)
      // 修复图片路径
      monthAnime = fixImagePaths(monthAnime)
      allAnimeData.push(...monthAnime)
    }
  })
  
  allAnime.value = allAnimeData
  
  // 根据观看状态分类
  watchingAnime.value = allAnimeData.filter(anime => anime.watchStatus === '在看')
  completedAnime.value = allAnimeData.filter(anime => anime.watchStatus === '看完')
  notWatchedAnime.value = allAnimeData.filter(anime => anime.watchStatus === '未看' || !anime.watchStatus)
  droppedAnime.value = allAnimeData.filter(anime => anime.watchStatus === '已弃')
}

onMounted(() => {
  loadWatchStatus()
})
</script>

<style scoped>
.watch-status {
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header-section h1 {
  color: #333;
  font-size: 2rem;
}

.nav-btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.nav-btn:hover {
  background: #5568d3;
}

.status-categories {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.status-category {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
}

.icon {
  font-size: 1.2rem;
}

.status-watching {
  color: #3b82f6;
}

.status-completed {
  color: #10b981;
}

.status-not-watched {
  color: #f59e0b;
}

.status-dropped {
  color: #ef4444;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.anime-item {
  background: #fafafa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.anime-item:hover {
  transform: translateY(-5px);
}

.anime-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.anime-info {
  padding: 10px;
}

.anime-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.anime-status {
  color: #666;
  font-size: 0.9rem;
}
</style>