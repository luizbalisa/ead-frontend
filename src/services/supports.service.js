import BaseService from "./base.service"

export default class SupportsService extends BaseService {

    /**
     * Fetch all supports filtered by lesson
     * @param {number} lesson_id - The lesson id
     * @returns {Promise<Object>} - The response data
     */
    static async getSupportsByLesson(lesson_id) {
        const params = { lesson: lesson_id }
        return new Promise((resolve, reject) => {
            this.request({ auth: true })
                .get('/supports', {
                    params
                })
                .then((response) => resolve(response.data))
                .catch((error) => reject(new Error(error.response)))
        })
    }

    static async storeSupport(params) {
        return new Promise((resolve, reject) => {
            this.request({ auth: true })
                .post('/supports', params)
                .then((response) => resolve(response))
                .catch((error) => reject(new Error(error.response)))
        })
    }

    static async storeReply(params) {
        return new Promise((resolve, reject) => {
            this.request({ auth: true })
                .post(`/supports/${params.support}/replies`, params)
                .then((response) => resolve(response))
                .catch((error) => reject(new Error(error.response)))
        })
    }

    static async getMySupports(params) {
        return new Promise((resolve, reject) => {
            this.request({ auth: true })
                .get('/my-supports', {
                    params
                })
                .then((response) => resolve(response))
                .catch((error) => reject(new Error(error.response)))
        })
    }
}