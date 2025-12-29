// 图片路径映射表 - 将可能的中文路径映射到实际的英文（拼音）路径
const imagePathMap = {
  // 2025.10新番图片映射
  '/images/2025.10/王者天下第六期.jpg': '/images/2025.10/wangzhe.jpg',
  '/images/2025.10/欢迎来到笑容不断的职场.jpg': '/images/2025.10/zhichang.jpg',
  '/images/2025.10/胖子与爱情以及过错.jpg': '/images/2025.10/pangzi.jpg',
  '/images/2025.10/素材采集家的异世界旅行记.jpg': '/images/2025.10/caijijia.jpg',
  '/images/2025.10/银魂 3年Z班银八老师.jpg': '/images/2025.10/sannianzban.jpg',
  '/images/2025.10/身为暗杀者的我明显比勇者还强.jpg': '/images/2025.10/renzhe.jpg',
  '/images/2025.10/异世界四重奏第三期.jpg': '/images/2025.10/sanchong.jpg',
  '/images/2025.10/矢野同学观察日记.jpg': '/images/2025.10/riji.jpg',
  '/images/2025.10/弹珠汽水瓶里的千岁同学.jpg': '/images/2025.10/qiansui.jpg',
  '/images/2025.10/怪物弹珠.jpg': '/images/2025.10/moshi.jpg',
  '/images/2025.10/跨越种族与你相恋.jpg': '/images/2025.10/zhongzu.jpg',
  '/images/2025.10/网购技能开启异世界美食家之旅第二期.jpg': '/images/2025.10/wanggou.jpg',
  '/images/2025.10/忍者与极道.jpg': '/images/2025.10/renzhe.jpg',
  '/images/2025.10/无职英雄.jpg': '/images/2025.10/wuzhi.jpg',
  '/images/2025.10/妖怪旅馆营业中第二期.jpg': '/images/2025.10/yaoguai.jpg',
  '/images/2025.10/Let\'s Play 充满挑战的人生.jpg': '/images/2025.10/Let`s play .jpg',
  '/images/2025.10/绝妙舞步.jpg': '/images/2025.10/jmwubu.jpg',
  '/images/2025.10/转生恶女的黑历史.jpg': '/images/2025.10/heilishi.jpg',
  '/images/2025.10/元祖小邦多利.jpg': '/images/2025.10/bangduoli.jpg',
  '/images/2025.10/笨拙至极的前辈.jpg': '/images/2025.10/benghuai.jpg',
  '/images/2025.10/星辰光辉更胜太阳.jpg': '/images/2025.10/xingchen.jpg',
  '/images/2025.10/想吃掉我的非人少女.jpg': '/images/2025.10/feiren.jpg',
  '/images/2025.10/永恒余晖.jpg': '/images/2025.10/yonghengyuhui.jpg',
  '/images/2025.10/双人单身露营.jpg': '/images/2025.10/luying.jpg',
  '/images/2025.10/恶食千金与狂血公爵.jpg': '/images/2025.10/gongjue.jpg',
  '/images/2025.10/魔法药水救救我.jpg': '/images/2025.10/yaoshui.jpg',
  '/images/2025.10/桃源暗鬼.jpg': '/images/2025.10/taoyuan.jpg',
  '/images/2025.10/凌君的XX即将崩坏.jpg': '/images/2025.10/benghuai.jpg',
  '/images/2025.10/百姓贵族第三期.jpg': '/images/2025.10/baixingguizu.jpg',
  '/images/2025.10/靠无限扭蛋复仇.jpg': '/images/2025.10/fuchou.jpg',
  '/images/2025.10/野原广志午餐的流派.jpg': '/images/2025.10/guanxianyue.jpg',
  '/images/2025.10/娑婆气.jpg': '/images/2025.10/anshaz.jpg',
  '/images/2025.10/最后再拜托您一件事可以吗.jpg': '/images/2025.10/qianbei.jpg',
  '/images/2025.10/SANDA.jpg': '/images/2025.10/SANDA.jpg',
  '/images/2025.10/GANGLION.jpg': '/images/2025.10/GANGLION.jpg',
  '/images/2025.10/野生的最终BOSS出现了.jpg': '/images/2025.10/boss.jpg',
  '/images/2025.10/科学与冒险求生.jpg': '/images/2025.10/maoxian.jpg',
  '/images/2025.10/无口的柏田小姐与元气的太田君.jpg': '/images/2025.10/wukou.jpg',
  '/images/2025.10/婚戒物语第二期.jpg': '/images/2025.10/hunjie.jpg',
  '/images/2025.10/叹息的亡灵好想隐退第二期.jpg': '/images/2025.10/yintui.jpg',
  '/images/2025.10/向往过家家的亡灵第三期.jpg': '/images/2025.10/liufang.jpg',
  '/images/2025.10/爱雨满开的庭院魔法师蕾蒂西亚.jpg': '/images/2025.10/bumie.jpg',
  '/images/2025.10/弑父的你第三期.jpg': '/images/2025.10/luanma.jpg',
  '/images/2025.10/新鸟与1/2 第二期.jpg': '/images/2025.10/chaoren.jpg',
  '/images/2025.10/末世二轮之旅.jpg': '/images/2025.10/moshi.jpg',
  '/images/2025.10/古诺希亚.jpg': '/images/2025.10/gnosia.jpg',
  '/images/2025.10/东岛月彦想要成为假面骑士.jpg': '/images/2025.10/dongdaodansanlang.jpg',
  '/images/2025.10/朋友的妹妹只喜欢烦我.jpg': '/images/2025.10/meimei.jpg',
  '/images/2025.10/你与偶像光之美少女.jpg': '/images/2025.10/nver.jpg',
  '/images/2025.10/公主专场管弦乐.jpg': '/images/2025.10/nvpu.jpg',
  '/images/2025.10/轮椅的偶像公主 RING篇.jpg': '/images/2025.10/spy family.jpg',
  '/images/2025.10/深渊战鬼.jpg': '/images/2025.10/xixuegui.jpg',
  '/images/2025.10/数码宝贝 BEATBREAK.jpg': '/images/2025.10/SI-VIS.jpg',
  '/images/2025.10/S/Vs.jpg': '/images/2025.10/SI-VIS.jpg',
  '/images/2025.10/赛马娘 芦毛灰姑娘 Part.2.jpg': '/images/2025.10/saimaniang.jpg',
  '/images/2025.10/蓝色管弦乐第二期.jpg': '/images/2025.10/nvpu.jpg',
  '/images/2025.10/不能长期吸血的吸血鬼.jpg': '/images/2025.10/xixuegui.jpg',
  '/images/2025.10/机械女仆玛丽.jpg': '/images/2025.10/bingqi.jpg',
  '/images/2025.10/转生成了英雄爸爸和精灵妈妈的女儿.jpg': '/images/2025.10/guanxianyue.jpg',
  '/images/2025.10/一笑悬命第三期.jpg': '/images/2025.10/wukou.jpg',
  '/images/2025.10/少女兵器想要成为家人.jpg': '/images/2025.10/nver.jpg',
  '/images/2025.10/小手拒绝别碰我.jpg': '/images/2025.10/shouzhi.jpg',
  '/images/2025.10/致不灭的你第三期.jpg': '/images/2025.10/bumie.jpg',
  '/images/2025.10/科学x冒险求生第二期.jpg': '/images/2025.10/maoxian.jpg',
  '/images/2025.10/笨拙至极的前辈即将崩坏.jpg': '/images/2025.10/benghuai.jpg',
  '/images/2025.10/王者天下 第6期.jpg': '/images/2025.10/wangzhe.jpg'
};

// 获取正确的图片路径
export const getCorrectImagePath = (imagePath) => {
  if (!imagePath) return null;
  
  // 标准化路径格式
  let normalizedPath = imagePath;
  
  // 移除可能的public前缀
  normalizedPath = normalizedPath.replace(/^public\//, '/');
  
  // 确保路径以/开头
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }
  
  // 移除域名部分（如果有的话）
  normalizedPath = normalizedPath.replace(/^https?:\/\/[^\/]+/, '');
  
  // 移除basePath部分（如果有的话）
  normalizedPath = normalizedPath.replace(/^\/anime123/, '');
  
  // 修复日期格式：将2025.10改为2025.10（匹配实际文件系统结构）
  normalizedPath = normalizedPath.replace(/\/2025\.10\//g, '/2025.10/');
  
  // 尝试解码URL编码的路径
  let decodedPath = normalizedPath;
  try {
    decodedPath = decodeURIComponent(normalizedPath);
  } catch (e) {
    // 如果解码失败，使用原始路径
    console.error('URL解码失败:', e);
  }
  
  // 尝试从映射表获取正确路径（先尝试解码后的路径，再尝试原始路径）
  const mappedPath = imagePathMap[decodedPath] || imagePathMap[normalizedPath];
  let finalPath = mappedPath || decodedPath;
  
  // 最后尝试标准化Let's play文件名
  finalPath = finalPath.replace(/\/Let[\'\`]s\s+play\s*\.jpg$/i, '/Let`s play .jpg');
  
  // 确保路径以/开头
  if (!finalPath.startsWith('/')) {
    finalPath = '/' + finalPath;
  }
  
  // 根据环境决定是否添加basePath前缀
  // 在开发环境中不添加，在生产环境中添加
  if (import.meta.env.MODE === 'production') {
    if (!finalPath.startsWith('/anime123')) {
      finalPath = '/anime123' + finalPath;
    }
  }
  
  return finalPath;
};

// 批量修复动漫列表的图片路径
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