import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import SupportsService from '@/services/supports.service'
export const useSupportStore = defineStore('support', () => {
    const defaultMeta = {
        total: 0,
        current_page: 1,
        last_page: 1,
        per_page: 1,
        to: 1,
        from: 1,
        path: ''
    }
    
    const supports = ref({
        data: [],
        meta: { ...defaultMeta }
    })

    const support = ref({})
    const mySupports = ref({})
    const isLoading = ref(false)
    const hasError = ref(false)

    const getSupports = computed(() => supports.value)
    const getSupport = computed(() => support.value)
    const getMySupports = computed(() => mySupports.value)

    const setSupportsByLesson = async (lesson_id) => {
        isLoading.value = true
        hasError.value = false
        try {
            const response = await SupportsService.getSupportsByLesson(lesson_id)
            supports.value = response.data
        } catch (error) {
            hasError.value = true
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    const storeSupport = async (params) => {
        SupportsService.storeSupport(params)
            .then(() => {
                setSupportsByLesson(params.lesson)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const storeReply = async (params) => {
        SupportsService.storeReply(params)
            .then(() => {
                setSupportsByLesson(params.lesson)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const setMySupports = async (params) => {
        SupportsService.getMySupports(params)
            .then((response) => {
                mySupports.value = response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const changePage = async (page) => {
        isLoading.value = true
        hasError.value = false
        try {
            const response = await SupportsService.getSupports({ page })
            supports.value = response.data
        } catch (error) {
            hasError.value = true
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    const setReset = () => {
        supports.value = { data: [], meta: { ...defaultMeta } }
        support.value = {}
        mySupports.value = {}
        isLoading.value = false
        hasError.value = false
    }

    return {
        getSupports,
        getSupport,
        getMySupports,
        setSupportsByLesson,
        storeSupport,
        storeReply,
        setMySupports,
        changePage,
        setReset,
        isLoading,
        hasError
    }
})