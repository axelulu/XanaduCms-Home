<template>
    <div v-show="isShow" :class="showAnimate ? 'animate-fadeIn30' : 'animate-fadeOut30'"
        class="z-20 fixed top-0 bottom-0 left-0 ring-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-50">
        <div @click="hide" class="fixed top-0 bottom-0 left-0 ring-0 w-full h-full"></div>
        <slot />
    </div>
</template>
<script lang="ts">
export default defineComponent({
    setup() {
        const isShow = ref<boolean>(false)
        const showAnimate = ref<boolean>(false)
        function show() {
            isShow.value = true
            showAnimate.value = true
        }
        function hide() {
            showAnimate.value = false
            setTimeout(() => {
                isShow.value = false
            }, 300)
        }
        return {
            show,
            hide,
            showAnimate,
            isShow,
        }
    }
})
</script>
<style scoped>
</style>