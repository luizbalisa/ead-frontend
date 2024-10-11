<script setup>
import HeaderComponent from './Components/HeaderComponent.vue';
import FooterComponent from './Components/FooterComponent.vue';
</script>

<template>

    <header-component/>
    <section>
        <router-view></router-view>
    </section>
    <footer-component/>
</template>