<script setup>
import DoubleArrowLeft from '@/Components/Icons/DoubleArrowLeft.vue'
import DoubleArrowRight from '@/Components/Icons/DoubleArrowRight.vue'
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['search-link'])

const props = defineProps({
    data: { type: Object },
    disabled: { default: {} }
})

let page_number = ref(props.data.meta.page === undefined ? props.data.meta.current_page : props.data.meta.page)
let last_page = ref(props.data.meta.last_page)
let links = ref([])
let maxPage = ref(3)
let countPage = ref(1)

let getLinks = () => {
    return new Array(last_page.value)
}

let searchLink = (go_to) => {
    emit('search-link', go_to)

    if (last_page.value > 3) {
        if (go_to >= maxPage.value) {
            countPage.value = go_to
            if (go_to + 2 < last_page.value) {
                maxPage.value = go_to + 2
            } else {
                countPage.value = last_page.value - 2
                maxPage.value = last_page.value
            }
        } else if (go_to < page_number.value) {
            if (go_to + 2 <= maxPage.value && go_to > 1) {
                countPage.value = go_to - 1
                maxPage.value = go_to + 1
            } else if (go_to + 2 < last_page.value) {
                countPage.value = go_to
                maxPage.value = go_to + 2
            }
        }
    } else {
        maxPage.value = last_page.value
    }
    page_number.value = go_to
    for (let page = page_number.value; last_page.value > page; page++) {
        if (page >= 1) {
            links.value.push(page)
        }
    }
}

const previous = () => {
    if (page_number.value > 1) {
        searchLink(page_number.value - 1)
    }
}

const next = () => {
    if (page_number.value < last_page.value) {
        searchLink(page_number.value + 1)
    }
}

const generateLinks = () => {
    console.log('Generating links...')
    links.value = []
    for (let page = 1; page <= last_page.value; page++) {
        if (page >= 1) {
            links.value.push(page)
            console.log(`Added page: ${page}`)
        }
    }
    page_number.value = page_number.value === '' ? 1 : page_number.value
    console.log('Links generation complete:', links.value)
}

onMounted(() => generateLinks())

const startPage = computed(() => {
    if (page_number.value === 1) {
        return 1
    }

    if (page_number.value === last_page.value) {
        return last_page.value - 2
    }

    return page_number.value - 1
})

const pages = computed(() => {
    let page_range = []

    if (last_page.value < 3) {
        for (let page = 1; page <= last_page.value; page++) {
            page_range.push({ number: page })
        }
    } else {
        for (
            let page = startPage.value;
            page <= Math.min(startPage.value + 3 - 1, last_page.value);
            page++
        ) {
            page_range.push({ number: page })
        }
    }

    return page_range
})
</script>
<template>
    <div class="container">
        <div class="info">Showing {{ data.meta.from }} to {{ data.meta.to }} of {{ data.meta.total }} results</div>

        <ul class="pagination">
            <span
                :class="{ active: page_number === 1 }"
                @click="previous()"
                class="previous"
            >
                <double-arrow-left :icon_height="10" :icon_width="10" class="icon" />
                Previous
            </span>
            <li v-for="(link, index) in pages" :key="index" class="links">
                <span
                    :class="{ active: page_number === link.number }"
                    @click="searchLink(link.number)"
                    class="link"
                >
                    {{ link.number }}
                </span>
            </li>
            <span
                @click="next()"
                :class="{ active: page_number === getLinks().length }"
                class="next"
            >
                Next
                <double-arrow-right :icon_height="10" :icon_width="10" class="icon" />
            </span>
        </ul>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.link {
    color: #d9dcd6;
    border: 1px solid #d9dcd6;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.link:hover,
.link.active {
    background-color: #d9dcd6;
    color: #292929;
}

.info {
    color: #d9dcd6;
    margin-bottom: 1rem;
}

.next,
.previous {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    color: #d9dcd6;
    border: 1px solid #d9dcd6;
    padding: 5px 10px;
    border-radius: 5px;
}

.previous:hover {
    background-color: #d9dcd6;
    color: #000;
}

.next:hover {
    background-color: #d9dcd6;
    color: #000;
}

.icon {
    fill: currentColor;
    width: 0.75rem;
    height: 0.75rem;
}
</style>
