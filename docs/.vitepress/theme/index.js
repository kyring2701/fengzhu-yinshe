// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MembersList from './components/MembersList.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件，这样在任意 .md 文件中都能直接使用
    app.component('MembersList', MembersList)
  }
}