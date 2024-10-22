import { createApp } from 'vue'
import App from '@/App.vue'
import { router, fetchDynamicRoutes } from '@/router'
import '@/assets/index.css'

async function initApp() {
  await fetchDynamicRoutes()
  createApp(App).use(router).mount('#app')
}

initApp()