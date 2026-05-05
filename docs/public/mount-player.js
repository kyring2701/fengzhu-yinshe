
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
  