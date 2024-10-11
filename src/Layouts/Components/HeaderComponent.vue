<script setup>
// import MenuComponent from './MenuComponent.vue';
import logo from '@/Assets/Images/logo.svg';
import { ref } from 'vue';

const showMenu = ref(false);

const toggleMenu = () => {
	showMenu.value = !showMenu.value;
}
</script>

<template>

    <header id="header">
        <nav>
            <span class="toggleMenu far fa-bars" @click="toggleMenu"></span>
            <span class="logo">
                <router-link :to="{name: 'campus.home'}">
                    <img :src="logo" alt="EspecializaTi">
                </router-link>
            </span>
        </nav>
    </header>

    <!-- <menu-component v-show="showMenu">
    </menu-component> -->
</template>