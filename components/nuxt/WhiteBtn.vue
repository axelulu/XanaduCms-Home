<template>
    <div :class="class"
        class="w-full flex justify-center items-center select-none py-1.5 cursor-pointer hover:bg-gray-200 duration-300 active:bg-gray-100 bg-white border-2 border-gray-200 text-xs text-gray-600 text-center">
        <font-awesome-icon :icon="icon" />
        <span class="ml-1">{{ value }}</span>
    </div>
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