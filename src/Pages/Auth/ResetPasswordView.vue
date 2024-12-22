<script setup>
import bgLogin from '@/Assets/Images/bgLogin.jpg'
import building from '@/Assets/Images/building.jpg'
import { useNotification } from "@kyvg/vue3-notification";
import router from '@/Router';
import { useUserStore } from '@/store/users'
import { ref } from 'vue';

const props = defineProps({
    token: {
        type: String
    }
})

const user = useUserStore()
const { notify } = useNotification()
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const loading = ref(false)
const typeVisiblePassword = ref(false)

const resetPassword = () => {
    loading.value = true
    user.resetPassword({
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        token: props.token
    }).then(() => {
        router.push({name: 'auth.login'})
        notify({
            title: 'Sucesso',
            text: 'Senha redefinida com sucesso',
            type: 'success'
        })
    }).catch((error) => {
        let message = 'Falha ao redefinir senha'
        if(error.status === 404){
            message = 'Tokem inválido'
        }
        if(error.status === 422){
            message = 'Senhas não conferem'
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
                            <p>Seja muito bem vindo(a) novamente!</p>
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
                                <input v-model="password" :type="typeVisiblePassword ? 'text' : 'password'" name="password" placeholder="Nova senha" required>
                                <i  @click="typeVisiblePassword = !typeVisiblePassword" class="far fa-eye buttom"></i>
                            </div>
                            <div class="groupForm">
                                <i class="far fa-key"></i>
                                <input v-model="password_confirmation" :type="typeVisiblePassword ? 'text' : 'password'" name="password_confirmation" placeholder="Confirme a senha" required>
                                <i  @click="typeVisiblePassword = !typeVisiblePassword" class="far fa-eye buttom"></i>
                            </div>
                            <button
                                @click.prevent="resetPassword"
                                :class="[
                                    'btn',
                                    'primary'
                                ]"
                                type="submit">
                                <span>{{ loading ? 'Entrando...' : 'Entrar' }}</span>
                            </button>
                        </form>
                    </div>
                    <span class="copyright fontSmall">
                        Todos os Direitos reservados - <b>Especializati</b>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>