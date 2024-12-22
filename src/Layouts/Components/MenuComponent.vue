<script setup>
import router from "@/Router";
import { useUserStore } from "@/store/users";
const userStore = useUserStore()

const logout = () => {
    userStore.logout().then(() => {
        router.push({name: 'auth.login'})
    })
}
</script>

<template>
    <div class="animate__animated animate__fadeIn">
        <ul id="mainMenu">
            <li class="animate__animated animate__headShake">
                <router-link :to="{name: 'campus.home'}">Início</router-link>
            </li>
            <li class="animate__animated animate__headShake">
                <router-link :to="{name: 'campus.my.supports'}">Minhas Dúvidas</router-link>
            </li>
            <li class="animate__animated animate__headShake">
                <a href="#" @click.prevent="logout">
                    <span v-if="userStore.setLoading">Saindo...</span>
                    <span v-else>Sair</span>
                </a>
            </li>
        </ul>
    </div>
</template> 