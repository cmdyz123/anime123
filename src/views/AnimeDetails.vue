<template>
  <div class="anime-details">
    <div class="details-container">
      <div class="left-section">
        <div class="anime-poster" :style="{ backgroundImage: `url('${anime.image}')` }" :title="anime.title"></div>
        <div class="basic-info">
          <h2>{{ anime.title }}</h2>
          <p>{{ anime.info }}</p>
        </div>
        
        <div class="status-buttons">
          <button class="status-btn" :class="{ active: currentStatus === '未看' }" @click="setStatus('未看')">未看</button>
          <button class="status-btn" :class="{ active: currentStatus === '在看' }" @click="setStatus('在看')">在看</button>
          <button class="status-btn" :class="{ active: currentStatus === '看完' }" @click="setStatus('看完')">看完</button>
          <button class="status-btn" :class="{ active: currentStatus === '已弃' }" @click="setStatus('已弃')">已弃</button>
        </div>
      </div>
      
      <div class="right-section">
        <div class="description">
          <h3>简介</h3>
          <p>{{ getDescription(anime.id) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const anime = JSON.parse(route.query.anime)
const currentStatus = ref('未看')

const getDescription = (id) => {
  const descriptions = {
    4: 'このクラス、個性的すぎる！人気漫画『銀魂』番外編『銀魂3年Z組銀八先生』のスピンオフ小説をもとにアニメ化！「銀魂3年Z組銀八先生」として銀魂をまるごと一つのアニメとして展開する。銀魂学級3年Z組、このクラスに通うのは、ドルオタ、ゴロイン、スニーカー、マヨラー、ドSキャンキーなど、「銀魂」から飛び出したキャラクターたち。そして高校生とは思えない強烈な生徒たち、だらしない白衣と死んだ魚のような目をした担任教師・坂田銀八のもとに、一筋縄ではいかない事件がいつも発生！舞台は銀大！陰キャも陰キャも関係なく、銀魂流の青春がここにある！',
    1: '笑顔と感動がいっぱいのオフィスコメディ！新入社員の主人公が、個性的な上司や先輩たちと共に成長していく物語。毎日が笑いあり涙ありのオフィスライフを描く。',
    2: '太りすぎた青年が恋愛に悩み、過去の過ちと向き合う感動のラブストーリー。自己受け入れと成長をテーマにしたハートフルな作品。',
    3: '素材集めが趣味の主人公が異世界に転移し、様々な素材を集めながら冒険するファンタジーアドベンチャー。美しい世界観と魅力的なキャラクターが特徴。',
    5: '暗殺者として訓練された少年が、勇者として冒険することになるファンタジーアクション。圧倒的な実力で敵を制する爽快感が魅力。',
    6: '人気キャラクターたちが異世界で繰り広げるコメディー。シリーズ第3期として新たな冒険が始まる！'
  }
  return descriptions[id] || 'この作品の詳細は準備中です。'
}

const setStatus = (status) => {
  currentStatus.value = status
  // 保存到localStorage
  const statuses = JSON.parse(localStorage.getItem('animeStatuses')) || {}
  statuses[anime.id] = status
  localStorage.setItem('animeStatuses', JSON.stringify(statuses))
}

const loadStatus = () => {
  const statuses = JSON.parse(localStorage.getItem('animeStatuses')) || {}
  if (statuses[anime.id]) {
    currentStatus.value = statuses[anime.id]
  }
}

onMounted(() => {
  loadStatus()
})
</script>

<style scoped>
.anime-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.details-container {
  display: flex;
  gap: 40px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.left-section {
  flex: 1;
  max-width: 300px;
}

.anime-poster {
  width: 100%;
  height: 450px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.basic-info {
  margin-top: 20px;
  text-align: center;
}

.basic-info h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.basic-info p {
  color: #666;
  font-size: 0.9em;
}

.status-buttons {
  margin-top: 20px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.status-btn {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #ddd;
  background: white;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.3s;
}

.status-btn:hover {
  border-color: #3498db;
  color: #3498db;
}

.status-btn.active {
  border-color: #3498db;
  background: #3498db;
  color: white;
}

.right-section {
  flex: 2;
}

.description {
  margin-bottom: 30px;
}

.description h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
}

.description p {
  line-height: 1.8;
  color: #333;
  text-align: justify;
}

.additional-info h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
}

.info-grid {
  display: grid;
  gap: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #777;
}
</style>