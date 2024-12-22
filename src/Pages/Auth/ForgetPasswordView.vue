<script setup>
import bgLogin from '@/Assets/Images/bgLogin.jpg'
import building from '@/Assets/Images/building.jpg'
import { useNotification } from "@kyvg/vue3-notification";
import router from '@/Router'
import { useUserStore } from '@/store/users'
import { ref } from 'vue'

const email = ref('')
const loanding = ref(false)
const user = useUserStore()

const forgetPassword = () => {
    loanding.value = true
    user.forgetPassword(email.value)
        .then(() => {
            router.push({ name: 'auth.login' })
            useNotification({
                title: 'Sucesso',
                text: 'Um e-mail foi enviado para ' + email.value,
                type: 'success'
            })
        })
        .catch((error) => {
            useNotification({
                title: 'Erro',
                text: error.data.message,
                type: 'error'
            })
        })
        .finally(() => {
            loanding.value = false
        })
}
</script>
<template>
    <section id="loginPage" :style="{ 'background-image': 'url(' + bgLogin + ')' }">
        <div class="loginContent">
            <div class="loginCard">
                <div class="decor" :style="{ 'background-image': 'url(' + building + ')' }">
                    <div class="content">
                        <span class="logo">
                            <img src="@/Assets/Images/logo.svg" alt="EspecializaTi" />
                        </span>
                        <span class="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="description">
                            <p>
                                Os melhores e mais completos cursos de Laravel do Brasil, cursos com
                                projetos reais. Do zero ao profissional.
                            </p>
                        </span>
                        <span class="copyright fontSmall">
                            Todos os Direitos reservados - <b>Especializati</b>
                        </span>
                    </div>
                </div>
                <div class="login">
                    <div class="content">
                        <span class="logo"><img src="@/Assets/Images/logo.svg" alt="" /> </span>
                        <span>
                            <p>Seja muito bem vindo(a)!</p>
                        </span>
                        <span class="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="description">
                            Acesse nossa plataforma e desfrute de cursos completos para sua
                            especialização.
                        </span>
                        <form action="" method="POST" @submit.prevent="forgetPassword">
                            <div class="groupForm">
                                <i class="far fa-envelope"></i>
                                <input
                                    v-model="email"
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    required
                                />
                            </div>
                            <button 
                                :class="['btn', 'primary', loanding ? 'loading' : ''] " 
                                type="submit"
                            >
                                <span v-if="!loanding">Recuperar</span>
                                <span v-else>Carregando...</span>
                            </button>
                        </form>
                        <span>
                            <p class="fontSmall">
                                Acessar?
                                <router-link :to="{ name: 'auth.login' }" class="link primary"
                                    >Clique aqui</router-link
                                >
                            </p>
                        </span>
                    </div>
                    <span class="copyright fontSmall">
                        Todos os Direitos reservados - <b>Especializati</b>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
