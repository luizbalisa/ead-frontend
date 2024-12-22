<script setup>
import SupportModal from './SupportModal.vue';
import { useSupportStore } from '@/store/supports'
import { useCourseStore } from '@/store/courses';
import { watch, computed, ref } from 'vue';

const supportsStore = useSupportStore()
const coursesStore = useCourseStore()
const showModal = ref(false)
const supportReply = ref({})
const showSupport = ref(0)

defineProps({
    supports: {
        require: true,
        type: Object
    }
})

const lesson = computed(() => coursesStore.getLesson)

watch( lesson, (newLesson) => {
    if(newLesson) {
        supportsStore.setSupportsByLesson(lesson.value.id)
    }
})

const closeModal = () => {
    supportReply.value = {}
    showModal.value = false
    supportsStore.setSupportsByLesson(lesson.value.id)
}

</script>

<template>
    <div class="comments">
        <div 
            v-if="lesson.id"
            class="header"
        >
            <span class="title">
                Dúvidas ( total {{ supports.length }} )
            </span>
            <button
                @click.prevent="showModal = true"
                class="btn primary"
            >
                <i class="fas fa-plus"></i>
                Enviar nova dúvida
            </button>
        </div>

        <div class="content">
            <div
                v-for="support in supports" 
                :key="support.id"
                class="card"
            >
                <div class="commentContent main">
                    <span class="avatar">
                        <img 
                            src="@/Assets/Images/avatars/user01.svg" 
                            alt=""
                        />
                    </span>
                    <div class="comment">
                        <div class="balloon">
                            <span class="fas fa-sort-down"></span>
                            <span class="owner">
                                {{ support?.user?.name }} - {{ support.created_at }}
                            </span>
                            <span class="text">
                                {{ support.description }}
                            </span>
                        </div>
                    </div>
                    <button  
                        
                        class="btn primary"
                    >
                        <i
                            @click.prevent="showSupport = 0 "
                            v-if="showSupport === support.id"
                            class="fas fa-eye-slash"
                        > 
                            Ocultar respostas
                        </i>
                        <i
                            @click.prevent="showSupport = support.id "
                            v-else
                            class="fas fa-eye"
                        > 
                            Exibir respostas ( total: {{ support?.replies?.length }} )
                        </i>
                    </button>
                </div>
                <div
                    v-show="showSupport === support.id"
                    class="answersContent">
                    <div 
                        v-for="reply in support.replies"
                        :key="reply.id"
                        :class="reply.user.id !== support.user.id ? 'rightContent' : 'leftContent'"
                        class="commentContent"
                    >
                        <span
                            v-if="reply.user.id === support.user.id"
                            class="avatar"
                        >
                            <img 
                                src="@/Assets/Images/avatars/user03.svg"
                                alt="" 
                            />
                        </span>
                        <div class="comment">
                            <div class="balloon">
                                <span class="fas fa-sort-down"></span>
                                <span class="owner">{{ reply.user.name }}</span>
                                <span class="text">
                                    {{ reply.description }}
                                </span>
                            </div>
                        </div>
                        <span
                            v-if="reply.user.id !== support.user.id"
                            class="avatar">
                            <img 
                                src="@/Assets/Images/avatars/user03.svg"
                                alt="" 
                            />
                        </span>
                    </div>

                    <span class="answer">
                        <button
                            @click.prevent="showModal = true, supportReply = support"
                            class="btn primary">
                            <i class="fas fa-reply">
                                Responder
                            </i>
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <support-modal
            :show-modal="showModal"
            :support-reply="supportReply"
            @close-modal="closeModal"
        />
    </div>
</template>
