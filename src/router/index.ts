import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/recipes'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/recipes'
      },
      {
        path: 'recipes',
        component: () => import('@/views/Recipes.vue')
      },
      {
        path: "recipe/:id",
        component: () => import('@/views/Recipe.vue'),
        props: (route) => {
          const id = Number.parseInt((route.params.id as string))
          if (Number.isNaN(id)) {
            return -1
          }
          return { id }
        }
      },
      {
        path: 'ingredients',
        component: () => import('@/views/Ingredients.vue')
      },
      {
        path: 'shoppinglist',
        component: () => import('@/views/ShoppingList.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router