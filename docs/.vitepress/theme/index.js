// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MembersList from './components/MembersList.vue'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
import { h, createApp } from 'vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MembersList', MembersList)
    app.component('GlobalMusicPlayer', GlobalMusicPlayer)
    
    // 在应用挂载后，把播放器插入到 body 中
    app.mixin({
      mounted() {
        if (!document.getElementById('global-music-player-wrapper')) {
          const wrapper = document.createElement('div')
          wrapper.id = 'global-music-player-wrapper'
          document.body.appendChild(wrapper)
          
          const playerApp = createApp({
            render() {
              return h(GlobalMusicPlayer)
            }
          })
          playerApp.mount('#global-music-player-wrapper')
        }
      }
    })
  }
}