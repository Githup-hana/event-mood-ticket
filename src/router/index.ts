import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

import EventDetailView from '@/views/EventDetailView.vue'
import EventsView from '@/views/EventsView.vue'
import ShoppingBag from '@/views/ShoppingBag.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingBag,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/events/:id',
      name: 'eventDetail',
      component: EventDetailView,
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
