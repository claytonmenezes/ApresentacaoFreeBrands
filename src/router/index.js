import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.VITE_BASE_URL),
  routes: []
})

const fetchDynamicRoutes = async () => {
  try {
    const childrens = []
    const listMenu = [
      { link: 'Inicio', titulo: 'Inicio', componente: 'Inicio' },
      { link: 'Dashboard', titulo: 'Dashboard', componente: 'Dashboard' }
    ]
    for (const menu of listMenu) {
      childrens.push({
        path: menu.link,
        name: menu.titulo,
        component: () => import(`@/pages/${menu.componente}.vue`)
      })
    }
    router.addRoute({ path: '/', component: () => import('@/layouts/MainLayout.vue'), meta: { requiresAuth: true }, children: childrens })
    router.addRoute({ name: 'login', path: '/login', component: () => import('@/pages/Login.vue') })
    router.addRoute({ name: 'erro', path: '/:catchAll()', component: () => import('@/pages/ErrorNotFound.vue') })
  } catch (error) {
    console.error('Erro ao buscar rotas dinâmicas:', error);
  }
}

export {
  router,
  fetchDynamicRoutes
}

