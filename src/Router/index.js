import { TOKEN_NAME } from '@/configs'
import AuthView from '@/Pages/Auth/AuthView.vue'
import ForgetPasswordView from '@/Pages/Auth/ForgetPasswordView.vue'
import ResetPasswordView from '@/Pages/Auth/ResetPasswordView.vue'
import CoursesView from '@/Pages/Courses/CoursesView.vue'
import MySupportsView from '@/Pages/Supports/MySupportsView.vue'
import { useUserStore } from '@/store/users'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Pages/Home/HomeView.vue'
import ModulesAndLessonsView from '../Pages/Modules/ModulesAndLessonsView.vue'



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/campus',
            component: () => import('@/Layouts/DefaultTemplate.vue'),
            children: [
                {
                    path: 'modules/:slug',
                    name: 'campus.modules',
                    component: ModulesAndLessonsView
                },
                {
                    path: '/my-supports',
                    name: 'campus.my.supports',
                    component: MySupportsView
                },
                {
                    path: '/courses',
                    name: 'campus.home',
                    component: CoursesView
                }
            ]
        },
        {
            path: '/login',
            name: 'auth.login',
            component: AuthView
        },
        { 
            path: "/forget-password", 
            name: "forget.password",
            component: ForgetPasswordView
        },
        { 
            path: "/reset-password/:token", 
            name: "reset.password",
            component: ResetPasswordView,
            props: true
        },
        {   
            path: '/:pathMatch(.*)*',
            name: 'not.found',
            component: () => import('@/Pages/NotFound/NotFoundView.vue')
        }
    ]
})

router.beforeEach(async (to, _, next ) => {
    const userStore = useUserStore()
    const loggedIn = userStore.getLogged
    if (to.name !== 'reset.password' && !loggedIn) {
        const token = localStorage.getItem(TOKEN_NAME)
        if (!token && to.name != 'auth.login' && to.name !== 'forgot.password') {
            return router.push({ name: 'auth' })
        }

        await userStore.getMe().catch(() => {
            if (to.name !== 'auth.login') return router.push({ name: 'auth.login' })
        })
    }

    next()
})

export default router
