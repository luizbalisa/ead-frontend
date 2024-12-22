import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import CourseService from '@/services/course.service'

export const useCourseStore = defineStore('course', () => {
    const courses = ref([])
    const modules = ref({})
    const lesson = ref({})

    const getCourses = computed(() => courses.value)
    const getModules = computed(() => modules.value)
    const getLesson = computed(() => lesson.value)

    const getCourseBySlug = (slug) => {
        return courses.value.find((course) => course.slug === slug)
    }

    const setCourseByAll = () => {
        CourseService.getCourses()
            .then((response) => {
                courses.value = response.data
            })
    }

    const setCourseById = (id) => {
        modules.value = courses.value.find((course) => course.id === id)
    }

    const setLesson = (selected_lesson) => {
        lesson.value = selected_lesson
    }

    const setMarkLessonViewed = (lesson_view) => {
        CourseService.setMarkLessonViewed(lesson_view)
    }

    return { courses, modules, lesson, getModules, getCourses, setCourseById, getCourseBySlug, getLesson, setCourseByAll, setLesson, setMarkLessonViewed }
})