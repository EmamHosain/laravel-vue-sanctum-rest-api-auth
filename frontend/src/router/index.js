import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuestLayout from '../components/layouts/GuestLayout.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import AboutView from '../views/AboutView.vue'



// const store = useAuthStore();
const checkIfUserIsLoggedIn = () => {
  const store = useAuthStore();
  if (store.access_token) {
    return '/';
  }
}


const checkIfUserIsNotLoggedIn = () => {
  const store = useAuthStore();
  if (!store.access_token) {
    store.setClearResetPassPageSeeLogic();
    return '/login';
  }
}


const checkUserCanSeeEmailVerifyPage = () => {
  const store = useAuthStore();

  if (!store.canSeeEmailVerifyPage || store.canSeeEmailVerifyPage === 'false') {
    store.setClearResetPassPageSeeLogic();
    return '/login';
  }
}


const checkUserCanSeeResetPassPage = () => {
  const store = useAuthStore();

  if (!store.canSeeResetPassPage || store.canSeeResetPassPage === 'false') {
    store.setClearResetPassPageSeeLogic();
    return '/login';
  }
}

const logNavigationAttempt = (to, from, next) => {
  const store = useAuthStore();
  store.setClearResetPassPageSeeLogic();
  next();
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GuestLayout,
      children: [
        {
          path: '',
          name: 'home-page',
          component: HomeView,
          beforeEnter: [checkIfUserIsNotLoggedIn]
        },
        {
          path: '/about',
          name: 'about-page',
          component: AboutView,
          beforeEnter: [checkIfUserIsNotLoggedIn]
        },
        {
          path: '/login',
          name: 'login-page',
          component: () => import('../views/auth/LoginView.vue'),
          beforeEnter: [checkIfUserIsLoggedIn, logNavigationAttempt],
        },
        {
          path: '/register',
          name: 'register-page',
          component: () => import('../views/auth/RegisterView.vue'),
          beforeEnter: [checkIfUserIsLoggedIn],

        },
        {
          path: '/forget-password',
          name: 'forget-password-page',
          component: () => import('../views/auth/ForgetPasswordView.vue'),
          beforeEnter: [checkIfUserIsLoggedIn],

        },
        {
          path: '/otp-verify',
          name: 'otp-verify-page',
          component: () => import('../views/auth/OTPVerificationView.vue'),
          beforeEnter: [checkIfUserIsLoggedIn, checkUserCanSeeEmailVerifyPage],

        },
        {
          path: '/reset-password',
          name: 'reset-password-page',
          component: () => import('../views/auth/ResetPasswordView.vue'),
          beforeEnter: [checkIfUserIsLoggedIn, checkUserCanSeeResetPassPage],

        },



      ],

    },

  ]
})

export default router
