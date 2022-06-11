<template>
    <div class="relative flex flex-wrap w-full h-full">
        <div v-if="show"
            class="absolute top-0 left-0 w-full h-full justify-center items-center flex z-10 backdrop-blur">
            <font-awesome-icon class="animate-rotating" :icon="['fas', 'circle-notch']" />
        </div>
        <slot />
    </div>
</template>
<script>
export default defineComponent({
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
})
</script>