import AuthService from '@/services/auth.service'
import ResetPasswordService from '@/services/password.reset.service'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useUserStore = defineStore('user', () => {
    const user = ref({
        name: '',
        email: ''
    })
    
    const logged = ref(false)

    const getUser = computed(() => user.value)

    const getLogged = computed(() => logged.value)

    function auth(params) {
        return AuthService.auth(params)
    }

    function forgetPassword(email) {
        return ResetPasswordService.forgetPassword(email)
    }

    return { user, logged, getUser, getLogged, auth, forgetPassword }
})
