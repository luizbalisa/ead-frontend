<script setup>
import { computed, ref } from 'vue'
import { useSupportStore } from '@/store/supports'
import { useCourseStore } from '@/store/courses'

const supportsStore = useSupportStore()
const coursesStore = useCourseStore()
const description = ref('')
const loading = ref(false)

const props = defineProps({
    showModal: {
        require: true,
        default: false,
        type: Boolean
    },
    supportReply: {
        require: false,
        type: Object,
    }
})

const emit = defineEmits(['closeModal'])

const lesson = computed(() => coursesStore.getLesson.id)

const sendForm = () => {
    loading.value = true

    if(Object.keys(props.supportReply).length > 0) {
        const params = {
            description: description.value,
            support: props.supportReply.id
        }
        supportsStore.storeReply(params)
        .then(() => {
            description.value = ''
            emit('closeModal')
        })
        .finally(() => (loading.value = false))
    } else {
        const params = {
            lesson: lesson.value,
            description: description.value, 
            status: 'Pending',
        }
        supportsStore.storeSupport(params)
        .then(() => {
            description.value = ''
            emit('closeModal')
        })
        .finally(() => (loading.value = false))
    }
}
</script>
<template>
    <transition name="fade">
        <div v-if="showModal" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-title">
                        <div class="modal-header">
                            <h3 v-if="!Object.keys(supportReply).length">Nova dúvida</h3>
                            <h3 v-else>Responder para o ticket {{ supportReply.id }}</h3>
                            <i
                                class="close fas fa-times"
                                title="Cancelar"
                                @click="$emit('closeModal')"
                            ></i>
                        </div>
                        <div class="details">
                            <span
                                ><small>Total de caracteres: {{ description.length }}</small></span
                            >
                            <span
                                ><small>(mínimo <b>4</b> e máximo <b>10k</b>)</small></span
                            >
                        </div>
                    </div>
                    <div class="modal-body">
                        <form action="#" method="post" @submit.prevent="sendForm">
                            <div class="groupForm">
                                <textarea
                                    name="description"
                                    v-model="description"
                                    placeholder="Descreva sua mensagem"
                                    autofocus
                                    @keydown.esc="$emit('closeModal')"
                                ></textarea>
                            </div>

                            <button class="btn reverse" @click.prevent="$emit('closeModal')">
                                <i class="fas fa-times"></i> Cancelar
                            </button>
                            <button
                                v-if="description.length > 3"
                                :class="{ disabled: loading }"
                                :disabled="loading"
                                class="btn primary text-white animate__animated animate__bounceIn"
                                type="submit"
                            >
                                <i class="fas fa-check"></i>
                                <span v-if="loading">Enviando...</span>
                                <span v-else>Enviar</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
