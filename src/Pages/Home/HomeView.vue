
<script setup>
import CardCourse from '@/Components/CardCourse.vue';
import imageCard from '@/Assets/teste.jpg';
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
            <ul class="listCourses">
                <card-course
                  class="animate__animated animate__headShake"
                  :bgName="'laravel'"
                  :title="'Curso Laravel'"
                  :imageCard="imageCard"
                >
                </card-course>
            </ul>
        </div>
  </div>
</template>

<style>

</style>