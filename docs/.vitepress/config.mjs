import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '枫竹音社',
  description: '林间枫语，竹下清音 —— 一个专注于自然与心灵之声的音乐社团',
  lang: 'zh-CN',

  head: [['link', { rel: 'icon', href: '/logo.png' }]],

  themeConfig: {
    siteTitle: '枫竹音社',

    nav: [
      { text: '首页', link: '/' },
      { text: '关于社团', link: '/about/' },
      { text: '主要成员', link: '/members/' },
      { text: '云合奏指南', link: '/guide/' },
      { text: '联系我们', link: '/contact/' },
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

    search: {
      provider: 'local'
    }
  }
})
