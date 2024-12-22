import BaseService from "./base.service"


export default class CourseService extends BaseService {
    static async getCourses(params) {
        return new Promise((resolve, reject) => {
            this.request({ auth: true })
                .get('/courses', params)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error.response))
        })
    }

    static async setMarkLessonViewed(lesson) {
        return new Promise((resolve, reject) => {
            const params = {
                lesson: lesson.id,
            }
            this.request({ auth: true })
                .post(`/lessons/viewed`, params)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error.response))
        })
    }
}