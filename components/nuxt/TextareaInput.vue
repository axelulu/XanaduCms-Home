<template>
    <div class="relative my-1.5 flex flex-row">
        <textarea :class="width" @input="$emit('update:value', ($event.target as HTMLTextAreaElement).value)"
            :placeholder="placeholder" :pattern="pattern" :required="required"
            class="border-2 border-gray-100 py-1.5 pl-2 pr-2 focus:border-pink-400 duration-300 focus-visible:outline-0"
            :maxlength="maxlen" :rows="rows" :value="value" />
        <slot />
    </div>
</template>
<script lang="ts">

export default defineComponent({
    props: {
        value: {
            type: String,
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
        maxlen: {
            type: String,
            default: '120',
        },
        rows: {
            type: String,
            default: '5',
        },
        width: {
            type: String,
            default: 'w-full',
        },
        placeholder: {
            type: String,
            default: '请输入内容',
        }
    },
})
</script>