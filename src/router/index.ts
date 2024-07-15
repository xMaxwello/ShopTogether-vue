import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginView from "@/views/LoginView.vue";
import TabsPage from "@/views/TabsPage.vue";
import GroupView from "@/views/GroupView.vue";
import ShoppinglistView from "@/views/ShoppinglistView.vue";
import SettingsView from "@/views/SettingsView.vue";
import AccountView from "@/views/AccountView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/shoppinglist',
    name: 'Shoppinglist',
    component: ShoppinglistView
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountView
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '/home',
        name: 'Group',
        component: GroupView
      },
      {
        path: '/settings',
        name: 'Settings',
        component: SettingsView
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
