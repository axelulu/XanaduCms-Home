<template>
    <div>
        <div class="mt-4 bg-white py-4 animate-fadeIn30">
            <div v-for="(item, index) in detail" :key="index"
                class="px-4 py-3 flex flex-row hover:bg-gray-100 duration-300">
                <div class="text-xs text-gray-500 w-28 font-semibold">{{ item.key }}</div>
                <div class="text-xs text-gray-400">
                    <font-awesome-icon v-if="item.icon.length > 0" class="text-xs" :icon="item.icon" />
                    <span class="ml-1">{{ item.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    props: {
        userInfo: {
            type: Object,
            default: {},
        }
    },
    setup(props: any) {
        const detail = [
            {
                key: '昵称',
                value: props.userInfo.nickName,
                icon: []
            },
            {
                key: 'UID',
                value: props.userInfo.uuid,
                icon: []
            },
            {
                key: '描述',
                value: props.userInfo.desc,
                icon: []
            },
            {
                key: '积分',
                value: props.userInfo.credit,
                icon: []
            },
            {
                key: '经验',
                value: props.userInfo.exp,
                icon: []
            },
            {
                key: '性别',
                value: props.userInfo.sex === 1 ? '保密' : props.userInfo.sex === 2 ? '女' : '男',
                icon: []
            },
        ]
        return {
            detail,
        }
    }
})
</script>