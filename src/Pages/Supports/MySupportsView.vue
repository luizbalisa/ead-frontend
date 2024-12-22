<script setup>
import CardSupports from '@/Components/SupportsCard.vue'
import PaginationCard from '@/Components/PaginationCard.vue'
import { onMounted, computed, ref } from 'vue'
import { useSupportStore } from '@/store/supports'

const supportsStore = useSupportStore()

const status = ref({
    all: '',
    pending: 'Pending',
    waiting: 'Waiting',
    resolved: 'Resolved'
})
const active = ref(null)

const mySupports = computed(() => supportsStore.getMySupports)

const getFilterMySupports = (statusValue) => {
    const params = {
        status: statusValue
    }
    active.value = statusValue
    supportsStore.setMySupports(params)
}

const changePage = (page) => {
    const params = {
        status: active.value,
        page: page
    }
    supportsStore.setMySupports(params)
}

onMounted(() => {
    getFilterMySupports(status.value.all)
})
</script>
<template>
    <div>
        <div class="pageTitle">
            <span class="title">Minhas Dúvidas</span>
            <span class="dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>

        <div class="content">
            <div class="container">
                <div class="left">
                    <div class="card">
                        <div class="title bg-laravel">
                            <span class="text">Filtros Dúvidas ( total {{ mySupports.length }} )</span>
                        </div>
                        <div class="modules">
                            <ul class="classes">
                                <li 
                                    @click="getFilterMySupports(status.all)"
                                    :class="active === status.all ? 'active' : ''"
                                > 
                                    Todos
                                </li>
                                <li 
                                    @click="getFilterMySupports(status.waiting)"
                                    :class="active === status.waiting ? 'active' : ''"
                                >
                                    Aguardando Minha Resposta
                                </li>
                                <li 
                                    @click="getFilterMySupports(status.pending)"
                                    :class="active === status.pending ? 'active' : ''"
                                >
                                    Aguardando Professor
                                </li>
                                <li 
                                    @click="getFilterMySupports(status.resolved)"
                                    :class="active === status.resolved ? 'active' : ''"
                                >
                                    Finalizados
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="right">
                    <div class="content">
                        <div class="comments">
                            <CardSupports :supports="mySupports.data" />

                        </div>
                    </div>
                </div>
            </div>
            <PaginationCard :data="mySupports" @search-link="changePage($event)" />
        </div>
    </div>
</template>
