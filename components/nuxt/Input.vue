<template>
    <div class="relative my-1.5 flex flex-row">
        <font-awesome-icon class="absolute left-0 top-0 p-2.5 text-gray-400" :icon="icon" />
        <input :class="width"
            @input="$emit('update:value', type === 'number' ? parseInt(($event.target as HTMLTextAreaElement).value) : ($event.target as HTMLTextAreaElement).value)"
            :placeholder="placeholder" :pattern="pattern" :required="required"
            class="border-2 border-gray-100 py-1.5 pl-7 pr-2 focus:border-pink-400 duration-300 focus-visible:outline-0"
            :type="type" :value="value" />
        <slot />
    </div>
</template>
<script lang="ts">

export default defineComponent({
    props: {
        value: {
            type: String || Number,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        pattern: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        width: {
            type: String,
            default: 'w-full',
        },
        icon: {
            type: Array,
            default: ['fas', 'user'],
        },
        placeholder: {
            type: String,
            default: '请输入内容',
        }
    },
})
</script>