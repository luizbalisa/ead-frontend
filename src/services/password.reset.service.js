import BaseService from "./base.service"

export default class ResetPasswordService extends BaseService {
    static async forgetPassword(email) {
        return new Promise((resolve, reject) => {
            this.request()
                .post('/forget-password', { email })
                .then((response) => resolve(response))
                .catch((error) => reject(error.response))
        })
    }
}