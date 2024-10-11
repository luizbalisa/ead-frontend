<script  setup>
import CardModules from '@/Components/CardModules.vue';
import CardPlayer from '@/Components/CardPlayer.vue';
import CardSupports from '@/Components/CardSupports.vue';
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
                    <CardSupports />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>

</style>