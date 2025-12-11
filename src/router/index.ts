import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/ShoppingBag.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/EventsView.vue'),
    },
    {
      path: '/events/:id',
      name: 'eventDetail',
      component: () => import('@/views/EventDetailView.vue'),
      props: true,
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/components/paymentmethods/PaymentMethod .vue'),
    },
  ],
})

export default router
