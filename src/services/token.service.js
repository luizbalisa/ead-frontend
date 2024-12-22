import { TOKEN_NAME } from '@/configs'
export const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_NAME)
    },
    saveToken(token) {
        localStorage.setItem(TOKEN_NAME, token)
    },
    removeToken() {
        localStorage.removeItem(TOKEN_NAME)
    }
}
