import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "/book", //打开系统后打开默认页面
    children:[
      {
        path: 'user',
        name: 'User',
        component: () =>import("@/views/User")
      },
      {
        path: '/book',
        name: 'Book',
        component: () =>import("@/views/Book")
      },
      {
        path: '/category',
        name: 'Category',
        component: () =>import("@/views/Category")
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>import("@/views/Login")
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>import("@/views/Register")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
