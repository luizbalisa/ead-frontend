import AuthService from '@/services/auth.service'
import ResetPasswordService from '@/services/password.reset.service'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useUserStore = defineStore('user', () => {
    const user = ref({})
    const logged = ref(false)
    const loadingStore = ref(false)

    const getUser = computed(() => user.value)
    const getLogged = computed(() => logged.value)
    const getLoadingStore = computed(() => loadingStore.value)

    async function auth(params) {
        setLoading(true)
        await AuthService.auth(params)
        setLoading(false)
        return await getMe()
        
    }

    function forgetPassword(email) {
        return ResetPasswordService.forgetPassword(email)
    }

    function resetPassword({ email, password, password_confirmation, token }) {
        return ResetPasswordService.resetPassword({ email, password, password_confirmation, token })
    }

    async function logout() {
        try {
            setLoading(true)
            await AuthService.logout()
            clearUserState() // Limpa o estado local
            setLoading(false)
        } catch (error) {
            console.error('Erro ao fazer logout:', error)
            clearUserState() // Mesmo em caso de erro, limpa o estado
            setLoading(false)
        }
    }

    async function getMe() {
        setLoading(true)
        const response = await AuthService.getMe()
        logged.value = true
        user.value = response.data
        setLoading(false)
    }

    function setLoading(type) {
        loadingStore.value = type
    }

    function clearUserState() {
        user.value = null
        logged.value = false
    }

    return {
        user,
        logged,
        getUser,
        getLogged,
        auth,
        forgetPassword,
        resetPassword,
        logout,
        getMe,
        getLoadingStore
    }
})
