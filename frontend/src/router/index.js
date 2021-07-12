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
  },
  {
    path: '/editPost',
    name: 'EditPost',
    component: () => import('../views/EditPost.vue')
  },
  {
    path: '/createComment',
    name: 'CreateComment',
    component: () => import('../views/CreateComment.vue')
  },
  {
    path: '/editComment',
    name: 'EditComment',
    component: () => import('../views/EditComment.vue')
  },
  {
    path: '/editProfile',
    name: 'EditProfile',
    component: () => import('../views/EditProfile.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
