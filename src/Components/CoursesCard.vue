<script setup>
import router from '@/Router';
import { useCourseStore } from '@/store/courses'

const coursesStore = useCourseStore()

const selectedCurse = (id) => {
    coursesStore.setCourseById(id)
    router.push({ name: 'campus.modules', params: { slug: id } })
}
defineProps({
    bgName: { String },
    course: { Object },
})
</script>
<template>
    <li>
        <span :class="['card', 'bg-' + bgName]">
            <span class="icon">
                <img :src="course.image" :alt="course.title" />
            </span>
            <span class="title">{{ course.title }}</span>
            <span class="action">
                <a 
                    @click.prevent="selectedCurse(course.id)"
                    :href="course.id" 
                    :class="['btn', bgName]"
                >   
                    Acessar
            </a>
            </span>
        </span>
        <span class="dots">
            <span></span>
            <span></span>
            <span></span>
        </span>
    </li>
</template>
