# 🍁 枫竹音社 | Sound of Maple & Bamboo

> 林间枫语，竹下清音 —— 用爱发电的线上乐团

[![Deploy Status](https://img.shields.io/badge/部署-Cloudflare%20Pages-orange)](https://pages.cloudflare.com/)
[![Built with VitePress](https://img.shields.io/badge/Built%20with-VitePress-brightgreen)](https://vitepress.dev/)

## 🎵 关于我们

枫竹音社是一个纯粹用爱发电的线上音乐社团。不论技术水平，专业与业余同台分享经验、传授技术。曲风覆盖 ACG、吹奏乐、管弦乐、摇滚与爵士，大编制项目与小合奏穿插进行。

## 🌐 访问官网

**[枫竹音社官方网站](https://fengzhu-yinshe.pages.dev/)**

## 📋 项目结构
fengzhu-yinshe/
├── docs/
│ ├── .vitepress/ # VitePress 配置
│ │ └── config.mjs
│ ├── public/ # 静态资源
│ │ └── logo.png
│ ├── index.md # 首页
│ ├── about/ # 关于社团
│ ├── guide/ # 云合奏指南
│ ├── contact/ # 联系我们
│ ├── members/ # 主要成员
│ ├── recommend/ # 曲目推荐
│ └── works/ # 作品欣赏
├── package.json
└── .gitignore


## 🔗 相关链接

| 平台 | 链接 |
|---|---|
| B站 | [@枫竹音社](https://space.bilibili.com/3546946262272192) |
| 抖音 | [@枫竹音社](https://www.douyin.com/user/MS4wLjABAAAAlTCCosiTssfJAV49WUrU0hOey8bxP3zzalUmVaMKkolQWyddezJ_BFO_r8mLRslF?from_tab_name=main) |
| 小红书 | [@枫竹音社](https://www.xiaohongshu.com/user/profile/6610998b00000000030303e7) |
| QQ群 | 1058698109 |

## 🚀 本地开发

```bash
# 克隆仓库
git clone https://github.com/kyring2701/fengzhu-yinshe.git
cd fengzhu-yinshe

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

📄 许可证
本项目为枫竹音社官方网站，内容版权归枫竹音社所有。


---

### 💡 注意

把里面的 `https://fengzhu-yinshe.pages.dev/` 替换成 Cloudflare 给你的实际域名。

如果本地创建，保存后推送：

```bash
git add README.md
git commit -m "添加 README"
git push
