import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Pages/Home/HomeView.vue'
import ModulesAndLessonsView from '../Pages/Modules/ModulesAndLessonsView.vue'
import MySupportsView from '../Pages/Supports/MySupportsView.vue'
import AuthView from '@/Pages/Auth/AuthView.vue'
import ForgetPasswordView from '@/Pages/Auth/ForgetPasswordView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/campus',
            component: () => import('@/Layouts/DefaultTemplate.vue'),
            children: [
                {
                    path: 'modulos',
                    name: 'campus.modules',
                    component: ModulesAndLessonsView
                },
                {
                    path: 'minhas-duvidas',
                    name: 'campus.my.supports',
                    component: MySupportsView
                },
                {
                    path: '/',
                    name: 'campus.home',
                    component: HomeView
                }
            ]
        },
        {
            path: '/auth',
            name: 'auth.login',
            component: AuthView
        },
        { 
            path: "/forget-password", 
            name: "forget.password",
            component: ForgetPasswordView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not.found',
            component: () => import('@/Pages/NotFound/NotFoundView.vue')
        }
    ]
})

export default router
