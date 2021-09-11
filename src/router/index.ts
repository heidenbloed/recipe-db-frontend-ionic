import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '@/views/Tabs.vue'
import RecipesView from '@/views/RecipesView.vue'
import RecipeView from '@/views/RecipeView.vue'
import RecipeEditView from '@/views/RecipeEditView.vue'
import IngredientsView from '@/views/IngredientsView.vue'
import ShoppingListView from '@/views/ShoppingListView.vue'

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
        component: RecipesView,
      },
      {
        path: "recipe/:id",
        component: RecipeView,
      },
      {
        path: "recipe/:id/edit",
        component: RecipeEditView,
      },
      {
        path: 'ingredients',
        component: IngredientsView
      },
      {
        path: 'shoppinglist',
        component: ShoppingListView
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router