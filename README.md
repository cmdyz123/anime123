# 动漫管理系统

## 项目简介

这是一个基于 Vue 3 和 Vite 构建的动漫管理系统，用于管理和分类新番动漫。

## 功能特性

### 管理员功能
- 分类管理：可以创建、编辑和删除动漫分类
- 动漫编辑：可以添加、编辑和删除动漫条目
- 月份管理：可以添加新的月份分类
- 数据持久化：所有数据通过 localStorage 保存

### 普通用户功能
- 动漫浏览：可以查看所有动漫列表
- 分类筛选：可以按分类筛选动漫
- 详情查看：可以查看动漫详情
- 追番管理：可以标记动漫的观看状态

## 登录信息

### 管理员账号
- 用户名：cmdyz123
- 密码：135790aa

### 普通用户
- 可以使用任意用户名和密码登录
- 登录后只能查看动漫列表，无法进行编辑操作

## 技术栈

- Vue 3 + Vite
- Vue Router
- localStorage 数据持久化
- CSS Grid + Flexbox 布局

## 项目结构

```
├── src/
│   ├── components/          # 组件
│   ├── views/              # 页面
│   ├── router/             # 路由配置
│   └── main.js            # 入口文件
├── public/                 # 静态资源
│   └── images/            # 动漫图片
├── package.json           # 项目配置
└── vite.config.js         # Vite 配置
```

## 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署到 GitHub Pages

### 安装 gh-pages
```bash
npm install gh-pages --save-dev
```

### 修改 package.json
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
},
"homepage": "https://yourusername.github.io/your-repo-name"
```

### 配置 vite.config.js
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/your-repo-name/'
})
```

### 部署
```bash
npm run build
npm run deploy
```

## 数据结构

### 动漫数据
```javascript
{
  id: 1,
  title: '动漫标题',
  info: '(全12话) 大陆',
  image: '/images/2025.10/anime.jpg',
  category: '原创动画'
}
```

### 分类数据
```javascript
{
  name: '原创动画'
}
```

## 观看状态

- 未看：还未开始观看
- 在看：正在观看中
- 看完：已全部观看完毕
- 已弃：已放弃观看

## 注意事项

- 所有数据保存在浏览器 localStorage 中
- 清除浏览器数据会导致所有数据丢失
- 建议定期备份 localStorage 数据

## License

MIT