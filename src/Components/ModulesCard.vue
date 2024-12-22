<script setup>
import { useCourseStore } from '@/store/courses'

import { computed, ref, watch } from 'vue'
const coursesStore = useCourseStore()
const getModules = computed(() => coursesStore.getModules)

const showLessons = ref(0)

const showLesson = (lesson) => {
    coursesStore.setLesson(lesson)
}

const toggleLessons = (module_id) => (showLessons.value = module_id)

watch(showLessons, (newModule) => {
    console.log(newModule);
    
    if(newModule) {
        // coursesStore.setLessonsByModule(newModule)
    }
})

</script>
<template>
    <div class="card">
        <div class="title bg-laravel">
            <span class="text">Modulos</span>
            <span class="icon far fa-stream"></span>
        </div>
        <div
            v-for="module in getModules.models"
            :key="module.id"
            @click="toggleLessons(module.id)"
            :class="showLessons === module.id ? 'active' : ''"
            class="modules"
        >
            <div class="name">
                <span class="text">{{ module.name }}</span>
                <span class="icon fas fa-sort-down"></span>
            </div>
            <ul v-show="showLessons === module.id" class="classes">
                <li
                    v-for="lesson in module.lesson"
                    :key="lesson.id"
                    @click="showLesson(lesson)"
                    :class="coursesStore.getLesson.id === lesson.id ? 'active' : ''"
                >
                    <span v-if="lesson.views.length > 0" class="check active fas fa-check"></span>
                    <span class="nameLesson">Aula {{ lesson.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
