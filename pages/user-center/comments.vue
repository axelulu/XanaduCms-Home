<template>
    <NuxtLayout name="user">
        <div class="ml-6">
            <div class="w-full mt-3 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'paint-brush']" />
                    <span class="ml-1 select-none">投稿说明</span>
                </div>
                <div class="p-4">
                    <div class="px-4 py-3 bg-gray-100 mt-2 text-xs text-gray-500">
                        <p>欢迎您在ACG调查小队投稿，在开始前请您简略阅读投稿须知，投稿即代表您同意以下协议啦。</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-center px-4 pb-4">
                    <Spin :show="loading">
                        <div v-if="authorCommentList" v-for="(item, index) in authorCommentList" :key="index"
                            class="flex justify-between flex-row items-center text-xs w-full text-gray-500 py-2 px-2 duration-300 cursor-pointer hover:bg-pink-100">
                            <div class="flex flex-row justify-start">您对<NuxtLink class="text-pink-400"
                                    :to="'/post/' + item.postRelation.postId + '.html'">《{{ item.postRelation.title }}》
                                </NuxtLink>
                                进行了一次吐槽： <div class="flex flex-row justify-start items-center" v-html="item.content">
                                </div>
                            </div>
                            <div>{{ formatDate(item.UpdatedAt) }}</div>
                        </div>
                    </Spin>
                </div>
            </div>
            <div class="w-full p-1.5 text-gray-500">
                <div v-if="hasMore" @click="nextPage"
                    class="w-full p-1.5 select-none bg-white border-3 border-gray-100 rounded-md cursor-pointer text-center text-xs hover:bg-pink-50 border-2 duration-20 hover:border-pink-400 duration-300">
                    查看更多</div>
            </div>
        </div>
    </NuxtLayout>
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