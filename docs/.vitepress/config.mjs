import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '枫竹音社',
  description: '林间枫语，竹下清音 —— 一个专注于自然与心灵之声的音乐社团',

  head: [['link', { rel: 'icon', href: '/logo.png' }]],

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