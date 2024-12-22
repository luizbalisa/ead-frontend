<script setup>
import { useCourseStore } from '@/store/courses'
import { computed, watch } from 'vue'

const lessonStore = useCourseStore()

const lesson = computed(() => lessonStore.getLesson)

watch(lesson, (newLesson) => {
    setTimeout(() => {
        lessonStore.setMarkLessonViewed(newLesson)
    }, 5000)
})
</script>
<template>
    <div class="training">
        <div class="card bg-laravel">
            <span class="icon">
                <img src="@/Assets/Images/icons/laravel.svg" alt="" />
            </span>
            <span class="title">{{ lesson.name }}</span>
            <router-link :to="{ name: 'campus.home' }" class="btn laravel">
                <i class="fas fa-chevron-left"></i>
                Voltar
            </router-link>
        </div>
        <iframe
            v-if="lesson.video"
            width="100%"
            height="auto"
            :src="'https://www.youtube.com/watch?v=' + lesson.video"
            :title="lesson.name"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    </div>

    <div class="description-lesson" v-if="lesson.description">
        {{ lesson.description }}
    </div>
</template>
