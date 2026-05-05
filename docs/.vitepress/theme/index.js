// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MembersList from './components/MembersList.vue'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
import { h, defineComponent } from 'vue'

// 定义一个包装布局组件
const CustomLayout = defineComponent({
  name: 'CustomLayout',
  setup() {
    return () => h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(GlobalMusicPlayer)
    })
  }
})

export default {
  extends: DefaultTheme,
  // 使用自定义包装布局
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.component('MembersList', MembersList)
    app.component('GlobalMusicPlayer', GlobalMusicPlayer)
  }
}