<script setup>
import CardModules from '@/Components/ModulesCard.vue'
import CardPlayer from '@/Components/PlayerCard.vue'
import CardSupports from '@/Components/SupportsCard.vue'
import { useSupportStore } from '@/store/supports'
import { computed, onMounted } from 'vue'
import { useCourseStore } from '@/store/courses'
import { watch } from 'vue'

const supportsStore = useSupportStore()
const supports = computed(() => supportsStore.getSupports)

const coursesStore = useCourseStore()
const lesson = computed(() => coursesStore.getLesson)

watch( lesson, (newLesson) => {
    if(newLesson) {
        supportsStore.setSupportsByLesson(lesson.value.id)
    }
})

onMounted(() => {
    supportsStore.setSupportsByLesson(lesson.value.id)
})

</script>

<template>
    <section>
        <div class="pageTitle">
            <span class="title">LaraFood</span>
            <span class="dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>

        <div class="content">
            <div class="container">
                <div class="left">
                    <CardModules />
                </div>
                <div class="right">
                    <div class="content">
                        <CardPlayer />
                        <CardSupports :supports="supports" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style></style>
