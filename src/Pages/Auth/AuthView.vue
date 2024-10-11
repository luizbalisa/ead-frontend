<script setup>
import bgLogin from '@/Assets/Images/bgLogin.jpg'
import building from '@/Assets/Images/building.jpg'
import router from '@/Router';
import { useUserStore } from '@/store/users'
import { ref } from 'vue';

const user = useUserStore()

const email = ref('')
const password = ref('')

const loanding = ref(false)


const auth = () => {
    loanding.value = true
    user.auth({
        email: email.value,
        password: password.value,
        device_name: 'web'
    }).then(() => {
        router.push({name: 'campus.home'})
        
    }).catch((error) => {
        alert('error.response.data.message')
        console.log(error);
    }).finally(() => {
        loanding.value = false
    })
}
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
                                <input v-model="password" type="password" name="password" placeholder="Senha" required>
                                <i class="far fa-eye buttom"></i>
                            </div>
                            <button
                                @click.prevent="auth"
                                :class="[
                                    'btn',
                                    'primary'
                                ]"
                                type="submit">
                                <span>{{ loanding ? 'Entrando...' : 'Entrar' }}</span>
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