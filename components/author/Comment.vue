<template>
    <div class="mt-4">
        <div v-for="(item, index) in authorCommentList" :key="index"
            class="flex flex-row justify-between items-center bg-white px-4 py-2 hover:bg-gray-100 duration-300">
            <div class="flex flex-col justify-start">
                <NuxtLink :to="'/post/' + item.postRelation.postId + '.html'"
                    class="text-sm text-gray-400 hover:text-pink-400 duration-300">{{
                            item.postRelation.title
                    }}</NuxtLink>
                <div v-html="item.content" class="text-xs text-gray-500 bg-gray-100 px-2 py-1 mt-2"></div>
            </div>
            <div class="text-xs text-gray-500">{{ formatDate(item.UpdatedAt) }}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { COMMENTLIST } from '~~/config/api';
import { CommentList } from '~~/types/response';
import { formatDate } from '~~/utils/utils'

export default defineComponent({
    props: {
        authorId: {
            type: String,
            default: '',
        },
    },
    async setup(props: any) {
        const loading = ref(true)
        const page = ref(1)
        const pageSize = ref(12)
        const hasMore = ref(true)
        const authorCommentList = ref<any>([])

        async function getAuthorPostList() {
            loading.value = true
            const { result } = await useCustomFetch<CommentList>(COMMENTLIST, {
                method: 'GET',
                params: {
                    author: props.authorId,
                    page: page.value,
                    pageSize: pageSize.value,
                }
            })
            if (result.value.list.length <= 0) {
                hasMore.value = false
            }
            authorCommentList.value.push(...result.value.list)
            loading.value = false
        }

        async function nextPage() {
            page.value++
            getAuthorPostList()
        }

        loading.value = true
        const { result } = await useCustomFetch<CommentList>(COMMENTLIST, {
            method: 'GET',
            params: {
                author: props.authorId,
                page: page.value,
                pageSize: pageSize.value,
            }
        })
        authorCommentList.value.push(...result.value.list)
        loading.value = false

        return {
            authorCommentList,
            hasMore,
            loading,
            formatDate,
            nextPage,
        }
    }
})
</script>