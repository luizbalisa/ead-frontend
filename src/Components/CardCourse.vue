<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    bgName: { String },
    course: { String },
	title: {String},
    imageCard: {String}
	
})
</script>
<template>
    <li>
        <span :class="['card', 'bg-' + bgName]">
            <span class="icon">
                <img :src="imageCard" :alt="title" />
            </span>
            <span class="title">{{ title }}</span>
            <span class="action">
                <!-- <a href="#" :class="['btn', bgName]">Acessar</a> -->
                <router-link :to="{name: 'campus.modules'}" :class="['btn', bgName]">Acessar</router-link>
            </span>
        </span>
        <span class="dots">
            <span></span>
            <span></span>
            <span></span>
        </span>
    </li>
</template>
