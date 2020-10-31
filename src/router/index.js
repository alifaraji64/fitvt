import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{requiresAuth:false}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta:{requiresAuth:false}
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('../views/welcome.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/secret/profile',
    name: 'profile',
    component: () => import('../views/secret/profile.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/secret/profile/create-workout',
    name: 'create-workout',
    component: () => import('../views/secret/create-workout.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/secret/feedback',
    name: 'feedback',
    component: () => import('../views/secret/feedback.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/secret/all-users',
    name: 'all-users',
    component: () => import('../views/secret/all-users.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/secret/home',
    name: 'home',
    component: () => import('../views/secret/home.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/secret/chat',
    name: 'chat',
    component: () => import('../views/secret/chat.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/secret/chat/user/:id',
    name: 'chat-single',
    component: () => import('../views/secret/chat-single.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/secret/create-post',
    name: 'create-post',
    component: () => import('../views/secret/create-post.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/secret/profile/user/:id',
    name: 'other-profile',
    component: () => import('../views/secret/other-profile.vue'),
    meta:{requiresAuth:true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
