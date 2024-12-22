import BaseService from './base.service'
import { TokenService } from '@/services/token.service'

export default class AuthService extends BaseService {
    static async auth(params) {
        try {
            const response = await this.request()
                .post('/auth', params)
            TokenService.saveToken(response.data.token) 
            return response
        } catch (error) {
            throw error.response || error
        }
    }

    static async getMe() {
        const token = TokenService.getToken()

        if (!token) {
            return Promise.reject(new Error('Token not found'))
        }

        try {
            const response = await this.request({ auth: true })
                .get('/me')
            return response
        } catch (error) {
            TokenService.removeToken()
            throw error.response || error
        }
    }

    static async logout() {
        try {
            const response = await this.request({ auth: true }).post('/logout')
            TokenService.removeToken() // Remove o token do localStorage
            return response
        } catch (error) {
            TokenService.removeToken()
            throw error.response || error
        }
    }
}
