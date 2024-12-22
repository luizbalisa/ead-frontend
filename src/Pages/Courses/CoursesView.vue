<script setup>
import CardCourse from "@/Components/CoursesCard.vue";
import { useCourseStore } from "@/store/courses";
import { computed, onMounted } from "vue";

const coursesStore = useCourseStore()

const getCourses = computed(() => coursesStore.getCourses)

onMounted(() => {
	coursesStore.setCourseByAll()
})

</script>

<template>
	<div class="page">
		<div class="pageTitle">
			<span class="title">Meus Cursos</span>
			<span class="dots">
				<span></span>
				<span></span>
				<span></span>
			</span>
		</div>

		<div class="content">
			<ul v-if="getCourses.length > 0" class="listCourses">
				<card-course
					v-for="course in getCourses"
					:key="course.id"
					:bgName="'laravel'"
					:course="course"
					class="animate__animated animate__headShake"
				> 
				</card-course>
			</ul>
		</div>
	</div>
</template>

<style></style>
