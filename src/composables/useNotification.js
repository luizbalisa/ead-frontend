import { ref } from 'vue'

export function useNotification() {
    const notifications = ref([])

    const addNotification = (message, type = 'info', duration = 3000) => {
        const id = Date.now()
        notifications.value.push({ id, message, type })

        setTimeout(() => {
            notifications.value = notifications.value.filter((n) => n.id !== id)
        }, duration)
    }

    const success = (message, duration = 3000) => addNotification(message, 'success', duration)
    const error = (message, duration = 3000) => addNotification(message, 'error', duration)
    const info = (message, duration = 3000) => addNotification(message, 'info', duration)
    const warning = (message, duration = 3000) => addNotification(message, 'warning', duration)

    return {
        notifications,
        success,
        error,
        info,
        warning
    }
}
