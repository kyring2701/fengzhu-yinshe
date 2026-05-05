import { defineConfig } from 'vitepress'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径（替代 __dirname）
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 生成播放器挂载脚本
function generatePlayerMountScript() {
  const dir = resolve(__dirname, '../public')
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'mount-player.js'), `
    // 使用 VitePress 全局的 Vue 和组件注册表
    document.addEventListener('DOMContentLoaded', () => {
      const mountPoint = document.getElementById('global-music-player')
      if (mountPoint && window.__VP_HASH_MAP__) {
        // 从 VitePress 内部获取 app 实例比较困难，直接使用原始 DOM 方式
        // 创建一个隔离的 Vue 3 应用
        const { createApp, h } = window.Vue
        // 动态获取组件定义（通过 VitePress 全局组件名）
        const app = createApp({
          render() {
            // 直接在渲染函数中使用全局组件
            return h('global-music-player')
          }
        })
        app.mount('#global-music-player')
      }
    })
  `)
}

// Vite 插件：在页面中注入播放器挂载点
function injectMusicPlayerPlugin() {
  // 先执行生成脚本
  generatePlayerMountScript()
  
  return {
    name: 'inject-music-player',
    transformIndexHtml(html) {
      return html.replace(
        '</body>',
        '<div id="global-music-player"></div></body>'
      )
    }
  }
}

export default defineConfig({
  title: '枫竹音社',
  description: '林间枫语，竹下清音 —— 一个专注于自然与心灵之声的音乐社团',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    // 加载播放器挂载脚本
    ['script', { type: 'module', src: '/mount-player.js' }]
  ],

  vite: {
    plugins: [
      injectMusicPlayerPlugin()
    ]
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '枫竹音社',
      description: '林间枫语，竹下清音 —— 一个专注于自然与心灵之声的音乐社团',
      themeConfig: {
        siteTitle: '枫竹音社',
        nav: [
          { text: '首页', link: '/' },
          { text: '关于社团', link: '/about/' },
          { text: '活跃成员', link: '/members/' },
          { text: '云合奏指南', link: '/guide/' },
          { text: '联系我们', link: '/contact/' },
          { text: '曲目推荐', link: '/recommend/' },
          {
            text: '社交媒体',
            items: [
              { text: 'B站', link: 'https://space.bilibili.com/3546946262272192' },
              { text: '抖音', link: 'https://www.douyin.com/user/MS4wLjABAAAAlTCCosiTssfJAV49WUrU0hOey8bxP3zzalUmVaMKkolQWyddezJ_BFO_r8mLRslF?from_tab_name=main' },
              { text: '小红书', link: 'https://www.xiaohongshu.com/user/profile/6610998b00000000030303e7' }
            ]
          }
        ],
        footer: {
          message: '林间枫语，竹下清音',
          copyright: 'Copyright © 2026 枫竹音社 | Powered by 1996_麒麟'
        },
        search: { provider: 'local' }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Sound of Maple & Bamboo',
      description: 'Maple whispers, bamboo murmurs — an online music community dedicated to the sounds of nature and the heart',
      themeConfig: {
        siteTitle: 'SOMB',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'About', link: '/en/about/' },
          { text: 'Members', link: '/en/members/' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Contact', link: '/en/contact/' },
          { text: 'Recommend', link: '/en/recommend/' },
          {
            text: 'Social Media',
            items: [
              { text: 'Bilibili', link: 'https://space.bilibili.com/3546946262272192' },
              { text: 'Douyin', link: 'https://www.douyin.com/user/MS4wLjABAAAAlTCCosiTssfJAV49WUrU0hOey8bxP3zzalUmVaMKkolQWyddezJ_BFO_r8mLRslF?from_tab_name=main' },
              { text: 'Xiaohongshu', link: 'https://www.xiaohongshu.com/user/profile/6610998b00000000030303e7' }
            ]
          }
        ],
        footer: {
          message: 'Maple whispers, bamboo murmurs',
          copyright: 'Copyright © 2026 Sound of Maple & Bamboo | Powered by 1996_Kylin'
        },
        search: { provider: 'local' }
      }
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      title: '楓竹音社',
      description: '林間の楓のささやき、竹の下の清らかな音 —— 自然と心の音に焦点を当てた音楽コミュニティ',
      themeConfig: {
        siteTitle: '楓竹音社',
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: '社团概要', link: '/ja/about/' },
          { text: 'メンバー', link: '/ja/members/' },
          { text: '参加ガイド', link: '/ja/guide/' },
          { text: 'お問合せ', link: '/ja/contact/' },
          { text: '曲の推薦', link: '/ja/recommend/' },
          {
            text: 'SNS',
            items: [
              { text: 'Bilibili', link: 'https://space.bilibili.com/3546946262272192' },
              { text: 'Douyin', link: 'https://www.douyin.com/user/MS4wLjABAAAAlTCCosiTssfJAV49WUrU0hOey8bxP3zzalUmVaMKkolQWyddezJ_BFO_r8mLRslF?from_tab_name=main' },
              { text: 'Xiaohongshu', link: 'https://www.xiaohongshu.com/user/profile/6610998b00000000030303e7' }
            ]
          }
        ],
        footer: {
          message: '林間の楓のささやき、竹の下の清らかな音',
          copyright: 'Copyright © 2026 楓竹音社 | Powered by 1996_麒麟'
        },
        search: { provider: 'local' }
      }
    }
  }
})