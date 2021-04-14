import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/app'
import store from '../store/index.js'

const KeywordSearch = () => import('@/views/SearchKeywords/Search-Keywords.vue');
const SearchChannel = () => import('@/views/SearchChannel/Search-Channel.vue');
const Profile = () => import('@/views/auth/UserProfileView.vue');
const Auth = () => import('@/views/auth/AuthView.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/auth',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/search-keywords',
        name: 'KeywordSearch',
        component: KeywordSearch,
        meta: {requiresAuth: true}
      },
      {
        path: '/search-channel',
        name: 'SearchChannel',
        component: SearchChannel,
        meta: {requiresAuth: true}
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {requiresAuth: true}
      },
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Requires auth & no user
  if (requiresAuth && !(await store.dispatch("auth/getCurrentUser"))) {
    next({ name: "Auth" });
    // No requires auth and user (auth)
  } else if (!requiresAuth && (await store.dispatch("auth/getCurrentUser"))) {
    next({ name: "Home" });
  } else {
    // Anything else
    next();
  }
});

export default router
