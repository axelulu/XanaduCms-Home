<template>
    <Dialog ref="dialog">
        <div
            class="fixed top-32 bottom-0 left-0 ring-0 flex justify-center items-start h-full w-full pointer-events-none">
            <div v-if="typeStr == 'success'"
                class="bg-gray-50 text-green-600 pointer-events-auto flex flex-row justify-center items-center px-2 py-1 rounded-md overflow-hidden">
                <font-awesome-icon :icon="['fas', 'check-circle']" />
                <span class="ml-1">{{ msgStr }}</span>
            </div>
            <div v-if="typeStr == 'info'"
                class="bg-gray-50 text-sky-600 pointer-events-auto flex flex-row justify-center items-center px-2 py-1 rounded-md overflow-hidden">
                <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
                <span class="ml-1">{{ msgStr }}</span>
            </div>
            <div v-if="typeStr == 'warning'"
                class="bg-gray-50 text-red-600 pointer-events-auto flex flex-row justify-center items-center px-2 py-1 rounded-md overflow-hidden">
                <font-awesome-icon :icon="['fas', 'times-circle']" />
                <span class="ml-1">{{ msgStr }}</span>
            </div>
        </div>
    </Dialog>
</template>
<script lang="ts">
export default defineComponent({
    setup() {
        const dialog = ref()
        let msgStr = ref<String>('提示')
        let typeStr = ref<String>('success')
        let durationNum = ref<number>(3000)

        function show(msg, { type, duration }) {
            msgStr.value = msg
            typeStr.value = type ? type : typeStr.value
            durationNum.value = duration ? duration : durationNum.value
            dialog.value.show()
            setTimeout(() => {
                dialog.value.hide()
            }, durationNum.value)
        }
        function hide() {
            dialog.value.hide()
        }
        return {
            dialog,
            msgStr,
            typeStr,
            durationNum,
            show,
            hide,
        }
    }
})
</script>
<style scoped>
</style>