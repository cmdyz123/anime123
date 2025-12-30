// 直接从images/2025_10文件夹导入所有图片
const imageModules = import.meta.glob('../../images/2025_10/*', { eager: true, import: 'default' });

// 构建简单的图片路径映射表（文件名 -> 图片路径）
const imageMap = {};
Object.keys(imageModules).forEach(key => {
  const fileName = key.split('/').pop();
  imageMap[fileName] = imageModules[key];
});

// 获取图片URL
export const getImageUrl = (fileName) => {
  if (!fileName) return null;
  return imageMap[fileName] || null;
};

// 获取所有图片文件名
export const getAllImageNames = () => {
  return Object.keys(imageMap);
};

// 保持向后兼容的函数：获取正确的图片路径
export const getCorrectImagePath = (imagePath) => {
  if (!imagePath) return null;
  
  // 从图片路径中提取文件名
  const fileName = imagePath.split('/').pop();
  
  // 直接返回导入的图片路径
  return imageMap[fileName] || null;
};

// 保持向后兼容的函数：批量修复动漫列表的图片路径
export const fixAnimeImagePaths = (animeList) => {
  if (!Array.isArray(animeList)) return animeList;
  
  return animeList.map(anime => {
    if (anime && anime.image) {
      return {
        ...anime,
        image: getCorrectImagePath(anime.image)
      };
    }
    return anime;
  });
};