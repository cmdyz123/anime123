<template>
  <div class="anime-list">
    <div class="header-section">
      <h1>2025年10月新番</h1>
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

const router = useRouter()

const goToDetails = (anime) => {
  router.push({ name: 'AnimeDetails', params: { id: anime.id }, query: { anime: JSON.stringify(anime) } })
}

const goToCategoryManager = () => {
  router.push({ name: 'CategoryManager', params: { month: '2025.10' } })
}

const goToAnimeEditor = () => {
  router.push({ name: 'MonthEditor', params: { month: '2025.10' } })
}

// 从localStorage加载分类数据
const loadAnimeCategories = () => {
  const savedCategories = JSON.parse(localStorage.getItem('animeCategories2025.10'))
  if (savedCategories) {
    categories.value = savedCategories
  }
  
  const savedAnimeList = JSON.parse(localStorage.getItem('animeList2025.10')) || []
  
  

// 如果没有保存的数据，将默认数据保存到localStorage
if (!savedAnime) {
  localStorage.setItem('animeList2025.10', JSON.stringify(allAnime.value))
}

// 更新所有动漫的分类
const updateAnimeWithCategories = (animeList) => {
    return animeList.map(anime => {
      const savedAnime = savedAnimeList.find(s => s.id === anime.id)
      return { ...anime, category: savedAnime?.category || '' }
    })
  }
  
  allAnime.value = updateAnimeWithCategories(allAnime.value)
}

// 分类筛选
const categories = ref(JSON.parse(localStorage.getItem('animeCategories2025.10')) || [
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

onMounted(() => {
  loadAnimeCategories()
  filterAnime() // 初始化筛选
})

// 从localStorage加载动漫列表
const savedAnime = JSON.parse(localStorage.getItem('animeList2025.10'))
const allAnime = ref(savedAnime || [
  { id: 1, title: '欢迎来到笑容不断的职场', info: '(全12话) 大陆', image: '/images/2025.10/欢迎来到笑容不断的职场.jpg', category: '' },
  { id: 2, title: '胖子与爱情以及过错', info: '(全13话) 港台', image: '/images/2025.10/胖子与爱情以及过错.jpg', category: '' },
  { id: 3, title: '素材采集家的异世界旅行记', info: '(全12话) 港台', image: '/images/2025.10/素材采集家的异世界旅行记.jpg', category: '' },
    { id: 4, title: '银魂 3年Z班银八老师', info: '(全12话) 大陆/港台', image: '/images/2025.10/3年z班银八老师.jpg', category: '' },
  { id: 5, title: '身为暗杀者的我明显比勇者还强', info: '(全12话) 港台', image: '/images/2025.10/身为暗杀者的我明显比勇者还强.jpg', category: '' },
    { id: 6, title: '异世界四重奏 第3期', info: '(全10话)', image: '/images/2025.10/异世界三重奏第三期.jpg', category: '' },
  { id: 7, title: '矢野同学观察日记', info: '(全12话) 港台', image: '/images/2025.10/矢野同学的观察日记.jpg', category: '' },
    { id: 8, title: '弹珠汽水瓶里的千岁同学', info: 'P1-13话 港台', image: '/images/2025.10/弹珠汽水瓶里的千岁同学.jpg', category: '' },
  { id: 9, title: '怪物弹珠 Deadverse Reloaded', info: '(全10话)', image: '/images/2025.10/怪物弹珠.jpg', category: '' },
    { id: 10, title: '跨越种族与你相恋', info: '(全12话) 环大陆', image: '/images/2025.10/跨越种族与你相恋.jpg', category: '' },
  { id: 11, title: '网购技能开启异世界美食之旅第2期', info: '(全12话) 港台', image: '/images/2025.10/网购技能开启异世界美食家之旅第二期.jpg', category: '' },
  { id: 12, title: '忍者和极道', info: '(全12话) 环大陆', image: '/images/2025.10/忍者与极道.jpg', category: '' },
  { id: 13, title: '无职英雄', info: '(全12话) 港台', image: '/images/2025.10/无职英雄.jpg', category: '' },
  { id: 14, title: '妖怪旅馆营业中 第2期', info: '(全12话) 港台', image: '/images/2025.10/妖怪旅馆营业中第二期.jpg', category: '' },
  { id: 15, title: 'Let\'s Play 充满挑战的人生', info: '(全12话) 港台', image: '/images/2025.10/Let‘s play 充满挑战的人生.jpg', category: '' },
  { id: 16, title: '绝妙舞步', info: '(全12话) 环大陆', image: '/images/2025.10/绝妙舞步.jpg', category: '' },
  { id: 17, title: '转生恶女的黑历史', info: '(全12话) 港台', image: '/images/2025.10/转生恶女的黑历史.jpg', category: '' },
  { id: 18, title: '元祖小邦多利', info: '(泡面) 大陆', image: '/images/2025.10/元祖小邦多利.jpg', category: '' },
  { id: 19, title: '笨拙至极的前辈即将崩坏', info: '(全12话) 港台', image: '/images/2025.10/笨拙至极的前辈.jpg', category: '' },
  { id: 20, title: '星辰光辉更胜太阳', info: '(全12话) 环大陆', image: '/images/2025.10/星辰光辉更胜太阳.jpg', category: '' },
  { id: 21, title: '想吃掉我的非人少女', info: '(全13话) 大陆/港台', image: '/images/2025.10/想吃掉我的非人少女.jpg', category: '' },
  { id: 22, title: '永恒余晖', info: '(全13话) 港台', image: '/images/2025.10/永恒余晖.jpg', category: '' },
  { id: 23, title: '双人单身露营', info: '(全24话) 港台', image: '/images/2025.10/双人单身露营.jpg', category: '' },
  { id: 24, title: '恶食千金与狂犬公爵', info: '(全12话) 港台', image: '/images/2025.10/恶食千金与狂血公爵.jpg', category: '' },
  { id: 25, title: '魔法药水救救我', info: '(全12话) 港台', image: '/images/2025.10/魔法药水救救我.jpg', category: '' },
  { id: 26, title: '桃源暗鬼', info: '(全24话) 港台', image: '/images/2025.10/桃园暗鬼.jpg', category: '' },
  { id: 27, title: '凌君的XX即将崩坏', info: '(全26话) 环大陆', image: '/images/2025.10/渡君的xx即将崩坏.jpg', category: '' },
  { id: 28, title: '百姓贵族 第3期', info: '(泡面) 港台', image: '/images/2025.10/百姓贵族第三期.jpg', category: '' },
  { id: 29, title: '靠无限扭蛋复仇', info: '(全12话) 港台', image: '/images/2025.10/靠无限扭蛋复仇.jpg', category: '' },
  { id: 30, title: '野原广志午餐的流派', info: '(泡面) 港台', image: '/images/2025.10/野原广志的午餐流派.jpg', category: '' },
  { id: 31, title: '娑婆气', info: '(全13话) 大陆/港台', image: '/images/2025.10/婆娑气.jpg', category: '' },
  { id: 32, title: '最后再拜托您一件事可以吗', info: '(全13话) 大陆/港台', image: '/images/2025.10/最后再拜托你一件事可以吗.jpg', category: '' },
  { id: 33, title: 'SANDA', info: '(全12话) 环大陆', image: '/images/2025.10/SANDA.jpg', category: '' },
  { id: 34, title: 'GANGLION', info: '(泡面)', image: '/images/2025.10/GANGLION.jpg', category: '' },
  { id: 35, title: '野生的最终BOSS出现了', info: '(全12话) 大陆/港台', image: '/images/2025.10/野生的最终BOSS出现了.jpg', category: '' },
  { id: 36, title: '科学与冒险求生', info: '(全19话) 大陆', image: '/images/2025.10/科学x冒险求生第二期.jpg', category: '' },
  { id: 37, title: '无口的柏田小姐与元气的太田君', info: '(全12话) 港台', image: '/images/2025.10/无口的柏田同学和元气的太田君.jpg', category: '' },
  { id: 38, title: '婚戒物语 第2期', info: '(全13话) 港台', image: '/images/2025.10/婚戒物语第二期.jpg', category: '' },
  { id: 39, title: '叹息的亡灵好想隐退第2期', info: '(全12话) 港台', image: '/images/2025.10/叹息的亡灵好像隐退第二期.jpg', category: '' },
  { id: 40, title: '向往过家家的亡灵第3期', info: '(全13话) 港台', image: '/images/2025.10/贯彻辅助的宫廷魔法师惨遭流放.jpg', category: '' },
  { id: 41, title: '爱雨满开的庭院魔法师蕾蒂西亚', info: '(全12话) 港台', image: '/images/2025.10/致不灭的你第三期.jpg', category: '' },
  { id: 42, title: '王者天下 第6期', info: '(全13话) 港台', image: '/images/2025.10/王者天下第六期.jpg', category: '' },
  { id: 43, title: '弑父的你第3期', info: '(全22话) 大陆', image: '/images/2025.10/新乱马 第二期.jpg', category: '' },
  { id: 44, title: '新鸟与1/2 第2期', info: '(全12话) 环大陆', image: '/images/2025.10/一拳超人第三期.jpg', category: '' },
  { id: 45, title: '末世二轮之旅', info: '(全12话) 港台', image: '/images/2025.10/末世二轮之旅.jpg', category: '' },
  { id: 46, title: '古诺希亚', info: '(全21话) 港台', image: '/images/2025.10/古诺西亚.jpg', category: '' },
  { id: 47, title: '东岛月彦想要成为假面骑士', info: '(全24话) 大陆/港台', image: '/images/2025.10/东岛丹三郎想要成为假面骑士.jpg', category: '' },
  { id: 48, title: '朋友的妹妹只喜欢烦我', info: '(全12话) 港台', image: '/images/2025.10/朋友的妹妹只喜欢烦我.jpg', category: '' },
  { id: 49, title: '你与偶像光之美少女', info: '(年番) 环大陆', image: '/images/2025.10/少女型兵器想要成为家人.jpg', category: '' },
  { id: 50, title: '公主专场管弦乐', info: '(年番)', image: '/images/2025.10/蓝色管弦乐.jpg', category: '' },
  { id: 51, title: '轮椅的偶像公主 RING篇', info: '(长编)', image: '/images/2025.10/间谍过家家第三期.jpg', category: '' },
  { id: 52, title: '深渊战鬼', info: '(全24话) 大陆/港台', image: '/images/2025.10/不擅长吸血的吸血鬼.jpg', category: '' },
  { id: 53, title: '数码宝贝 BEATBREAK', info: '(全49话) 大陆/港台', image: '/images/2025.10/SI-VIS.jpg', category: '' },
  { id: 54, title: 'S/Vs', info: '(全24话) 大陆/港台', image: '/images/2025.10/转生成英雄爸爸和精灵妈妈的女儿.jpg', category: '' },
  { id: 55, title: '赛马娘 芦毛灰姑娘 Part.2', info: '(全10话) 港台', image: '/images/2025.10/赛马娘芦毛灰姑娘第二期.jpg', category: '' },
  { id: 56, title: '蓝色管弦乐第2期', info: '(全11话) 港台', image: '/images/2025.10/蓝色管弦乐.jpg', category: '' },
  { id: 57, title: '不能长期吸血的吸血鬼', info: '(全12话) 港台', image: '/images/2025.10/不擅长吸血的吸血鬼.jpg', category: '' },
  { id: 58, title: '机械女仆玛丽', info: '(全12话) 港台', image: '/images/2025.10/机械女仆玛丽.jpg', category: '' },
  { id: 59, title: '转生成了英雄爸爸和精灵妈妈的女儿', info: '(全12话) 大陆/港台', image: '/images/2025.10/转生成英雄爸爸和精灵妈妈的女儿.jpg', category: '' },
  { id: 60, title: '一笑悬命 第3期', info: '(全12话) 大陆/港台', image: '/images/2025.10/无口的柏田同学和元气的太田君.jpg', category: '' },
  { id: 61, title: '少女兵器想要成为家人', info: '(全12话) 环大陆', image: '/images/2025.10/少女型兵器想要成为家人.jpg', category: '' },
  { id: 62, title: '小手拒绝别碰我', info: '(全12话) 港台', image: '/images/2025.10/小手指君别碰我.jpg', category: '' }
])

const thursday = ref([
  { id: 18, title: '元祖小邦多利', info: '(泡面) 大陆', image: '/images/元祖小邦多利.jpg', category: '' },
  { id: 19, title: '笨拙至极的前辈即将崩坏', info: '(全12话) 港台', image: '/images/笨拙至极的前辈.jpg', category: '' },
  { id: 20, title: '星辰光辉更胜太阳', info: '(全12话) 环大陆', image: '/images/星辰光辉更胜太阳.jpg', category: '' },
  { id: 21, title: '想吃掉我的非人少女', info: '(全13话) 大陆/港台', image: '/images/想吃掉我的非人少女.jpg', category: '' },
  { id: 22, title: '永恒余晖', info: '(全13话) 港台', image: '/images/永恒余晖.jpg', category: '' },
  { id: 23, title: '双人单身露营', info: '(全24话) 港台', image: '/images/双人单身露营.jpg', category: '' },
  { id: 24, title: '恶食千金与狂犬公爵', info: '(全12话) 港台', image: '/images/恶食千金与狂血公爵.jpg', category: '' },
  { id: 25, title: '魔法药水救救我', info: '(全12话) 港台', image: '/images/魔法药水救救我.jpg', category: '' }
])

const friday = ref([
  { id: 26, title: '桃源暗鬼', info: '(全24话) 港台', image: '/images/桃园暗鬼.jpg', category: '' },
  { id: 27, title: '凌君的XX即将崩坏', info: '(全26话) 环大陆', image: '/images/渡君的xx即将崩坏.jpg', category: '' },
  { id: 28, title: '百姓贵族 第3期', info: '(泡面) 港台', image: '/images/百姓贵族第三期.jpg', category: '' },
  { id: 29, title: '靠无限扭蛋复仇', info: '(全12话) 港台', image: '/images/靠无限扭蛋复仇.jpg', category: '' },
  { id: 30, title: '野原广志午餐的流派', info: '(泡面) 港台', image: '/images/野原广志的午餐流派.jpg', category: '' },
  { id: 31, title: '娑婆气', info: '(全13话) 大陆/港台', image: '/images/婆娑气.jpg', category: '' },
  { id: 32, title: '最后再拜托您一件事可以吗', info: '(全13话) 大陆/港台', image: '/images/最后再拜托你一件事可以吗.jpg', category: '' },
  { id: 33, title: 'SANDA', info: '(全12话) 环大陆', image: '/images/SANDA.jpg', category: '' },
  { id: 34, title: 'GANGLION', info: '(泡面)', image: '/images/GANGLION.jpg', category: '' }
])

const saturday = ref([
  { id: 35, title: '野生的最终BOSS出现了', info: '(全12话) 大陆/港台', image: '/images/野生的最终BOSS出现了.jpg', category: '' },
  { id: 36, title: '科学与冒险求生', info: '(全19话) 大陆', image: '/images/科学x冒险求生第二期.jpg', category: '' },
  { id: 37, title: '无口的柏田小姐与元气的太田君', info: '(全12话) 港台', image: '/images/无口的柏田同学和元气的太田君.jpg', category: '' },
  { id: 38, title: '婚戒物语 第2期', info: '(全13话) 港台', image: '/images/婚戒物语第二期.jpg', category: '' },
  { id: 39, title: '叹息的亡灵好想隐退第2期', info: '(全12话) 港台', image: '/images/叹息的亡灵好像隐退第二期.jpg', category: '' },
  { id: 40, title: '向往过家家的亡灵第3期', info: '(全13话) 港台', image: '/images/贯彻辅助的宫廷魔法师惨遭流放.jpg', category: '' },
  { id: 41, title: '爱雨满开的庭院魔法师蕾蒂西亚', info: '(全12话) 港台', image: '/images/致不灭的你第三期.jpg', category: '' },
  { id: 42, title: '王者天下 第6期', info: '(全13话) 港台', image: '/images/王者天下第六期.jpg', category: '' },
  { id: 43, title: '弑父的你第3期', info: '(全22话) 大陆', image: '/images/新乱马 第二期.jpg', category: '' },
  { id: 44, title: '新鸟与1/2 第2期', info: '(全12话) 环大陆', image: '/images/一拳超人第三期.jpg', category: '' },
  { id: 45, title: '末世二轮之旅', info: '(全12话) 港台', image: '/images/末世二轮之旅.jpg', category: '' },
  { id: 46, title: '古诺希亚', info: '(全21话) 港台', image: '/images/古诺西亚.jpg', category: '' },
  { id: 47, title: '东岛月彦想要成为假面骑士', info: '(全24话) 大陆/港台', image: '/images/东岛丹三郎想要成为假面骑士.jpg', category: '' },
  { id: 48, title: '朋友的妹妹只喜欢烦我', info: '(全12话) 港台', image: '/images/朋友的妹妹只喜欢烦我.jpg', category: '' }
])

const sunday = ref([
  { id: 49, title: '你与偶像光之美少女', info: '(年番) 环大陆', image: '/images/少女型兵器想要成为家人.jpg', category: '' },
  { id: 50, title: '公主专场管弦乐', info: '(年番)', image: '/images/蓝色管弦乐.jpg', category: '' },
  { id: 51, title: '轮椅的偶像公主 RING篇', info: '(长编)', image: '/images/间谍过家家第三期.jpg', category: '' },
  { id: 52, title: '深渊战鬼', info: '(全24话) 大陆/港台', image: '/images/不擅长吸血的吸血鬼.jpg', category: '' },
  { id: 53, title: '数码宝贝 BEATBREAK', info: '(全49话) 大陆/港台', image: '/images/SI-VIS.jpg', category: '' },
  { id: 54, title: 'S/Vs', info: '(全24话) 大陆/港台', image: '/images/转生成英雄爸爸和精灵妈妈的女儿.jpg', category: '' },
  { id: 55, title: '赛马娘 芦毛灰姑娘 Part.2', info: '(全10话) 港台', image: '/images/赛马娘芦毛灰姑娘第二期.jpg', category: '' },
  { id: 56, title: '蓝色管弦乐第2期', info: '(全11话) 港台', image: '/images/蓝色管弦乐.jpg', category: '' },
  { id: 57, title: '不能长期吸血的吸血鬼', info: '(全12话) 港台', image: '/images/不擅长吸血的吸血鬼.jpg', category: '' },
  { id: 58, title: '机械女仆玛丽', info: '(全12话) 港台', image: '/images/机械女仆玛丽.jpg', category: '' },
  { id: 59, title: '转生成了英雄爸爸和精灵妈妈的女儿', info: '(全12话) 大陆/港台', image: '/images/转生成英雄爸爸和精灵妈妈的女儿.jpg', category: '' },
  { id: 60, title: '一笑悬命 第3期', info: '(全12话) 大陆/港台', image: '/images/无口的柏田同学和元气的太田君.jpg', category: '' },
  { id: 61, title: '少女兵器想要成为家人', info: '(全12话) 环大陆', image: '/images/少女型兵器想要成为家人.jpg', category: '' },
  { id: 62, title: '小手拒绝别碰我', info: '(全12话) 港台', image: '/images/小手指君别碰我.jpg', category: '' }
])
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

.day-section {
  margin-bottom: 40px;
}

.day-section h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.anime-card {
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.anime-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.anime-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  background-color: #f5f5f5;
}

.anime-title {
  padding: 10px;
  font-weight: bold;
  text-align: center;
  background-color: #f8f9fa;
}

.anime-info {
  padding: 5px 10px;
  font-size: 0.9em;
  color: #666;
  text-align: center;
  background-color: #ffffff;
}

.anime-category {
  font-size: 0.7rem;
  color: #3498db;
  margin-top: 5px;
  padding: 2px 6px;
  background-color: #eaf5ff;
  border-radius: 4px;
  display: inline-block;
  text-align: center;
  margin-left: 10px;
  margin-bottom: 5px;
}

.category-filter {
  margin-bottom: 20px;
}

.category-filter select {
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}
</style>