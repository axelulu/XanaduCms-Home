<template>
    <div v-if="item.children" v-for="(i, index) in item.children" :key="index">
        <div class="flex flex-row justify-between items-center bg-gray-100 pl-2 border-l-2 border-gray-300">
            <div class="text-xs text-gray-500 py-2 flex flex-row">
                <NuxtLink :to="'/author-' + i.FormUidRelation.uuid + '/userInfo'" class="text-pink-400">
                    {{ i.FormUidRelation.nickName }}</NuxtLink> 回复 <NuxtLink
                    :to="'/author-' + i.FormUidRelation.uuid + '/userInfo'" class="text-pink-400">
                    {{ i.ToUidRelation.nickName }}</NuxtLink>: <div class="flex flex-row" v-html="i.content"></div>
            </div>
            <div @click="showComment(i)"
                class="text-xs text-pink-400 bg-gray-100 w-10 py-2 flex justify-center items-center hover:bg-pink-400 hover:text-white duration-300 cursor-pointer">
                回复</div>
        </div>
        <CommentContent @showComment="showComment" :item="i">
        </CommentContent>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    props: {
        item: {
            default: [],
            type: Object
        },
    },
    setup(props, context) {
        function showComment(item) {
            context.emit("showComment", item)
        }
        return {
            showComment
        }
    }
})
</script>