<script setup>
import bgLogin from '@/Assets/Images/bgLogin.jpg'
import building from '@/Assets/Images/building.jpg'
import { useNotification } from "@kyvg/vue3-notification";
import router from '@/Router';
import { useUserStore } from '@/store/users'
import { ref,onMounted } from 'vue';

const userStore = useUserStore()
const { notify } = useNotification()
const email = ref('')
const password = ref('')
const typeVisiblePassword = ref(false)

const loading = ref(false)


const auth = () => {
    loading.value = true
    userStore.auth({
        email: email.value,
        password: password.value,
        device_name: 'web'
    }).then(() => {
        router.push({name: 'campus.home'})
        notify({
            title: 'Sucesso',
            text: 'Usuário autenticado com sucesso',
            type: 'success'
        })
    }).catch((error) => {
        
        let message = 'Falha ao autenticar'
        if(error.status === 404){
            message = 'Seu email não foi encontrado'
        }
        if(error.status === 422){
            message = 'Email ou senha inválidos'
        }
        notify({
            title: 'Erro',
            text: message,
            type: 'error'
        })
    }).finally(() => {
        loading.value = false
    })
}

const isGetLogged = () => userStore.getLogged ? router.push({name: 'campus.home'}) : ''
onMounted(() => {
    isGetLogged()
})
</script>
<template>
    <section 
		id="loginPage"
        :style="{ 'background-image': 'url(' + bgLogin + ')' }">
        <div class="loginContent">
            <div class="loginCard">
                <div class="decor" :style="{'background-image': 'url('+ building +')'}">
                    <div class="content">
                        <span class="logo">
                            <img src="@/Assets/Images/logo.svg" alt="EspecializaTi">
                        </span>
                        <span class="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="description">
                            <p>
                                Os melhores e mais completos cursos de Laravel do Brasil, cursos com projetos reais. Do zero ao profissional.
                            </p>
                        </span>
                        <span class="copyright fontSmall">
                            Todos os Direitos reservados - <b>Especializati</b>
                        </span>
                    </div>
                </div>
                <div class="login">
                    <div class="content">
                        <span class="logo"
                            ><img src="@/Assets/Images/logo.svg" alt="" />
                        </span>
                        <span>
                            <p>Seja muito bem vindo(a)!</p>
                        </span>
                        <span class="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span class="description">
                            Acesse nossa plataforma e desfrute de cursos completos para sua especialização.
                        </span>
                        <form action="" method="" >
                            <div class="groupForm">
                                <i class="far fa-envelope"></i>
                                <input v-model="email" type="email" name="email" placeholder="E-mail" required>
                            </div>
                            <div class="groupForm">
                                <i class="far fa-key"></i>
                                <input v-model="password" :type="typeVisiblePassword ? 'text' : 'password'" name="password" placeholder="Senha" required>
                                <i  @click="typeVisiblePassword = !typeVisiblePassword" class="far fa-eye buttom"></i>
                            </div>
                            <button
                                @click.prevent="auth"
                                :class="[
                                    'btn',
                                    'primary',
                                    loading || userStore.getLoadingStore ? 'disabled' : ''
                                ]"
                                type="submit">
                                <span>{{ loading ? 'Entrando...' : 'Entrar' }}</span>
                            </button>
                        </form>
                        <span>
                            <p class="fontSmall">
                                Esqueceu sua senha?
                                <router-link :to="{name: 'forget.password'}" class="link primary">Clique aqui</router-link>
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