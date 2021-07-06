import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/connection',
    name: 'Connection',
    component: () => import('../views/Connection.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../views/Feed.vue')
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: () => import('../views/CreatePost.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
