<template>
    <button :class="class"
        class="w-full flex justify-center items-center select-none py-1.5 cursor-pointer hover:bg-green-600 duration-300 active:bg-green-500 bg-green-500 border-0 border-green-600 text-xs text-white text-center">
        <font-awesome-icon :icon="icon" />
        <span class="ml-1">{{ value }}</span>
    </button>
</template>
<script lang="ts">
export default defineComponent({
    props: {
        value: {
            type: String,
            default: '登陆',
        },
        icon: {
            type: Array,
            default: ['fas', 'user'],
        },
        class: {
            type: String,
            default: '',
        }
    },
    setup(props: any) {
        const value = ref<String>()
        const icon = ref<Array<String>>()
        value.value = props.value
        icon.value = props.icon
        return {
            value,
            icon
        }
    }
})
</script>