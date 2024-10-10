import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'  // Página atual
import App2 from '@/App2.vue'  // Página antiga

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/app2',
    name: 'App2',
    component: App2
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
