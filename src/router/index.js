import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/auth/Index.vue'
import Register from '../views/auth/Register.vue'
import EmailVerification from '../views/email/EmailVerification.vue'
import Login from '../views/auth/Login.vue'
import Forgotpassword from '../views/auth/ForgotPassword.vue'
import Main from '../views/main/Index.vue'
import Chatlist from '../views/main/ChatList.vue'
// import Chat from '../components/module/Chat.vue'
import Profile from '../views/main/Profile.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: '/auth/login',
    children: [
      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: { requiresVisitor: true }
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { requiresVisitor: true }
      },
      {
        path: 'forgotpassword',
        name: 'Forgotpassword',
        component: Forgotpassword,
        meta: { requiresVisitor: true }
      }
    ]
  },
  {
    path: '/emailverification/:email',
    name: 'EmailVerification',
    component: EmailVerification,
    meta: { requiresVisitor: true }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: '/main/chatlist',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'chatlist',
        name: 'Chatlist',
        component: Chatlist,
        meta: { requiresAuth: true },
        children: [
          {
            path: ':id',
            name: 'Chatlist',
            component: Chatlist,
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({ path: '/auth/login' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({ path: '/main/chatlist' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
