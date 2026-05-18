import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/negocio'
  },
  {
    path: '/negocio',
    component: () => import ('../views/Negocio.vue')
  },
  {
    path: '/tecnico',
    component: () => import ('../views/Tecnico.vue')
  },
  {
    path: '/kpis',
    component: () => import ('../views/KPIs.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
