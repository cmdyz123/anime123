<template>
  <div class="anime-editor">
    <div class="header-section">
      <h1>动漫编辑器</h1>
      <div class="nav-buttons">
        <button class="nav-btn" @click="goToAnimeList">主页面</button>
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
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()

const goToAnimeList = () => {
  router.push({ name: 'AnimeList' })
}

const goToCategoryManager = () => {
  router.push({ name: 'CategoryManager' })
}

const animeList = ref([])
const newAnime = ref({ title: '', info: '', image: '' })
const editingIndex = ref(-1)
const originalAnime = ref({})

const loadAnimeList = () => {
  const savedAnime = JSON.parse(localStorage.getItem('animeList')) || []
  if (savedAnime.length > 0) {
    animeList.value = savedAnime
  } else {
    // 如果没有保存的数据，加载默认数据
    animeList.value = [
      { id: 1, title: '欢迎来到笑容不断的职场', info: '(全13话) 港台', image: '/anime123/images/欢迎来到笑容不断的职场.jpg' },
      { id: 2, title: '胖子与爱情以及过错', info: '(全12话) 港台', image: '/anime123/images/胖子与爱情以及过错.jpg' },
      { id: 3, title: '素材采集家的异世界旅行记', info: '(全12话) 港台', image: '/anime123/images/素材采集家的异世界旅行记.jpg' },
      { id: 4, title: '银魂 3年Z班银八老师', info: '(全12话) 大陆/港台', image: '/anime123/images/3年z班银八老师.jpg' },
      { id: 5, title: '身为暗杀者的我明显比勇者还强', info: '(全12话) 港台', image: '/anime123/images/身为暗杀者的我明显比勇者还强.jpg' },
      { id: 6, title: '异世界四重奏 第3期', info: '(全10话)', image: '/anime123/images/异世界三重奏第三期.jpg' },
      { id: 7, title: '矢野同学观察日记', info: '(全12话) 港台', image: '/anime123/images/矢野同学的观察日记.jpg' },
      { id: 8, title: '弹珠汽水瓶里的千岁同学', info: 'P1-13话 港台', image: '/anime123/images/弹珠汽水瓶里的千岁同学.jpg' },
      { id: 9, title: '怪物弹珠 Deadverse Reloaded', info: '(全10话)', image: '/anime123/images/怪物弹珠.jpg' },
      { id: 10, title: '跨越种族与你相恋', info: '(全12话) 环大陆', image: '/anime123/images/跨越种族与你相恋.jpg' },
      { id: 11, title: '网购技能开启异世界美食之旅第2期', info: '(全12话) 港台', image: '/anime123/images/网购技能开启异世界美食家之旅第二期.jpg' },
      { id: 12, title: '忍者和极道', info: '(全12话) 环大陆', image: '/anime123/images/忍者与极道.jpg' },
      { id: 13, title: '无职英雄', info: '(全12话) 港台', image: '/anime123/images/无职英雄.jpg' },
      { id: 14, title: '妖怪旅馆营业中 第2期', info: '(全12话) 港台', image: '/anime123/images/妖怪旅馆营业中第二期.jpg' },
      { id: 15, title: 'Let\'s Play 充满挑战的人生', info: '(全12话) 港台', image: '/anime123/images/Let‘s play 充满挑战的人生.jpg' },
      { id: 16, title: '绝妙舞步', info: '(全12话) 环大陆', image: '/anime123/images/绝妙舞步.jpg' },
      { id: 17, title: '转生恶女的黑历史', info: '(全12话) 港台', image: '/anime123/images/转生恶女的黑历史.jpg' },
      { id: 18, title: '元祖小邦多利', info: '(泡面) 大陆', image: '/anime123/images/元祖小邦多利.jpg' },
      { id: 19, title: '笨拙至极的前辈即将崩坏', info: '(全12话) 港台', image: '/anime123/images/笨拙至极的前辈.jpg' },
      { id: 20, title: '星辰光辉更胜太阳', info: '(全12话) 环大陆', image: '/anime123/images/星辰光辉更胜太阳.jpg' },
      { id: 21, title: '想吃掉我的非人少女', info: '(全13话) 大陆/港台', image: '/anime123/images/想吃掉我的非人少女.jpg' },
      { id: 22, title: '永恒余晖', info: '(全13话) 港台', image: '/anime123/images/永恒余晖.jpg' },
      { id: 23, title: '双人单身露营', info: '(全24话) 港台', image: '/anime123/images/双人单身露营.jpg' },
      { id: 24, title: '在无神的世界进行信仰传播', info: '(全12话) 港台', image: '/anime123/images/在无神的世界进行信仰传播.jpg' },
      { id: 25, title: '在无神的世界进行信仰传播 第2季', info: '(全12话) 港台', image: '/anime123/images/在无神的世界进行信仰传播第二季.jpg' },
      { id: 26, title: '魔法科高中的劣等生 第3季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第三季.jpg' },
      { id: 27, title: '魔法科高中的劣等生 第4季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第四季.jpg' },
      { id: 28, title: '魔法科高中的劣等生 第5季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第五季.jpg' },
      { id: 29, title: '魔法科高中的劣等生 第6季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第六季.jpg' },
      { id: 30, title: '魔法科高中的劣等生 第7季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第七季.jpg' },
      { id: 31, title: '魔法科高中的劣等生 第8季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第八季.jpg' },
      { id: 32, title: '魔法科高中的劣等生 第9季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第九季.jpg' },
      { id: 33, title: '魔法科高中的劣等生 第10季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十季.jpg' },
      { id: 34, title: '魔法科高中的劣等生 第11季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十一季.jpg' },
      { id: 35, title: '魔法科高中的劣等生 第12季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十二季.jpg' },
      { id: 36, title: '魔法科高中的劣等生 第13季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十三季.jpg' },
      { id: 37, title: '魔法科高中的劣等生 第14季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十四季.jpg' },
      { id: 38, title: '魔法科高中的劣等生 第15季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十五季.jpg' },
      { id: 39, title: '魔法科高中的劣等生 第16季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十六季.jpg' },
      { id: 40, title: '魔法科高中的劣等生 第17季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十七季.jpg' },
      { id: 41, title: '魔法科高中的劣等生 第18季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十八季.jpg' },
      { id: 42, title: '魔法科高中的劣等生 第19季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第十九季.jpg' },
      { id: 43, title: '魔法科高中的劣等生 第20季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第二十季.jpg' },
      { id: 44, title: '魔法科高中的劣等生 第21季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第二十一季.jpg' },
      { id: 45, title: '魔法科高中的劣等生 第22季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第二十二季.jpg' },
      { id: 46, title: '魔法科高中的劣等生 第23季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第二十三季.jpg' },
      { id: 47, title: '魔法科高中的劣等生 第24季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第二十四季.jpg' },
      { id: 48, title: '魔法科高中的劣等生 第25季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第二十五季.jpg' },
      { id: 49, title: '魔法科高中的劣等生 第26季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第二十六季.jpg' },
      { id: 50, title: '魔法科高中的劣等生 第27季', info: '(全12话) 大陆/港台', image: '/anime123/images/魔法科高中的劣等生第二十七季.jpg' },
      { id: 51, title: '轮椅的偶像公主 RING篇', info: '(长编)', image: '/anime123/images/间谍过家家第三期.jpg' },
      { id: 52, title: '深渊战鬼', info: '(全24话) 大陆/港台', image: '/anime123/images/不擅长吸血的吸血鬼.jpg' },
      { id: 53, title: '数码宝贝 BEATBREAK', info: '(全49话) 大陆/港台', image: '/anime123/images/SI-VIS.jpg' },
      { id: 54, title: 'S/Vs', info: '(全24话) 大陆/港台', image: '/anime123/images/转生成英雄爸爸和精灵妈妈的女儿.jpg' },
      { id: 55, title: '赛马娘 芦毛灰姑娘 Part.2', info: '(全10话) 港台', image: '/anime123/images/赛马娘芦毛灰姑娘第二期.jpg' },
      { id: 56, title: '蓝色管弦乐第2期', info: '(全11话) 港台', image: '/anime123/images/蓝色管弦乐.jpg' },
      { id: 57, title: '不能长期吸血的吸血鬼', info: '(全12话) 港台', image: '/anime123/images/不擅长吸血的吸血鬼.jpg' },
      { id: 58, title: '机械女仆玛丽', info: '(全12话) 港台', image: '/anime123/images/机械女仆玛丽.jpg' },
      { id: 59, title: '转生成了英雄爸爸和精灵妈妈的女儿', info: '(全12话) 大陆/港台', image: '/anime123/images/转生成英雄爸爸和精灵妈妈的女儿.jpg' },
      { id: 60, title: '一笑悬命 第3期', info: '(全12话) 大陆/港台', image: '/anime123/images/无口的柏田同学和元气的太田君.jpg' },
      { id: 61, title: '少女兵器想要成为家人', info: '(全12话) 环大陆', image: '/anime123/images/少女型兵器想要成为家人.jpg' },
      { id: 62, title: '小手拒绝别碰我', info: '(全12话) 港台', image: '/anime123/images/小手指君别碰我.jpg' }
    ]
  }
}

const saveAnimeList = () => {
  localStorage.setItem('animeList', JSON.stringify(animeList.value))
}

const addAnime = () => {
  if (newAnime.value.title && newAnime.value.image) {
    const newId = Math.max(...animeList.value.map(a => a.id), 0) + 1
    animeList.value.push({
      id: newId,
      title: newAnime.value.title,
      info: newAnime.value.info,
      image: newAnime.value.image
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
.anime-editor {
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
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
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
  margin-bottom: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.add-anime-form h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.add-btn {
  padding: 10px 20px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background: #229954;
}

.anime-list-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.anime-item {
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.anime-display {
  display: flex;
  align-items: center;
  gap: 20px;
}

.anime-thumbnail {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.anime-details h3 {
  margin-bottom: 5px;
  color: #333;
}

.anime-details p {
  color: #666;
  font-size: 14px;
}

.anime-actions {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.anime-actions button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.anime-actions button:nth-child(1) {
  background: #3498db;
  color: white;
}

.anime-actions button:nth-child(1):hover {
  background: #2980b9;
}

.anime-actions button:nth-child(2) {
  background: #e74c3c;
  color: white;
}

.anime-actions button:nth-child(2):hover {
  background: #c0392b;
}

.anime-edit {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.edit-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.edit-actions button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.edit-actions button:nth-child(1) {
  background: #27ae60;
  color: white;
}

.edit-actions button:nth-child(1):hover {
  background: #229954;
}

.edit-actions button:nth-child(2) {
  background: #e67e22;
  color: white;
}

.edit-actions button:nth-child(2):hover {
  background: #d35400;
}
</style>