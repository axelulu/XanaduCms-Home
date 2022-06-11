<template>
    <div class="flex justify-start flex-wrap mt-4 animate-fadeIn30">
        <Spin :show="loading">
            <div v-for="(post, v) in authorPostList" :key="v" class="w-1/6 p-1.5">
                <Article :post="post" imgHeight="h-60"></Article>
            </div>
        </Spin>
        <div class="w-full p-1.5 text-gray-500">
            <div v-if="hasMore" @click="nextPage"
                class="w-full p-1.5 select-none bg-white border-3 border-gray-100 rounded-md cursor-pointer text-center text-xs hover:bg-pink-50 border-2 duration-20 hover:border-pink-400 duration-300">
                查看更多</div>
        </div>
    </div>
</template>
<script lang="ts">
import { POSTLIST } from '~~/config/api';
import { PostList } from '~~/types/response';

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
        const authorPostList = ref<any>([])

        async function getAuthorPostList() {
            loading.value = true
            const { result } = await useCustomFetch<PostList>(POSTLIST, {
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
            authorPostList.value.push(...result.value.list)
            loading.value = false
        }

        async function nextPage() {
            page.value++
            getAuthorPostList()
        }

        loading.value = true
        const { result } = await useCustomFetch<PostList>(POSTLIST, {
            method: 'GET',
            params: {
                author: props.authorId,
                page: page.value,
                pageSize: pageSize.value,
            }
        })
        authorPostList.value.push(...result.value.list)
        loading.value = false

        return {
            authorPostList,
            hasMore,
            loading,
            nextPage,
        }
    }
})
</script>