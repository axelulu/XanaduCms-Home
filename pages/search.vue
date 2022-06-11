<template>
    <NuxtLayout name="index">
        <div class="flex flex-col items-center">
            <div class="lg:w-3/4 xl:w-6/12">
                <div class="p-4 bg-white rounded-md mt-4">
                    <input @keyup.enter="jumpTo(keyword)" v-model="keyword" type="text" placeholder="请输入关键词"
                        class="border-b-4 w-full p-2 placeholder:text-lg focus:border-pink-400 duration-300 focus-visible:outline-0 placeholder:text-gray-500 text-gray-500 text-center text-lg border-gray-200 bg-transparent">
                    <div class="flex flex-row pt-4">
                        <div class="text-xs text-gray-500 font-semibold pr-12 py-1">分类</div>
                        <div class="flex flex-col">
                            <div class="flex flex-row">
                                <div @click="searchPost(null, 'all')"
                                    :class="'all' == currentIndex ? 'bg-pink-400 text-white' : 'text-gray-500'"
                                    class="text-xs hover:bg-pink-400 hover:text-white px-2 py-1 duration-300 cursor-pointer">
                                    全部</div>
                                <div v-for="(item, index) in categoryList.list" :key="index"
                                    @click="searchPost(item.children, item.slug)"
                                    :class="item.slug == currentIndex ? 'bg-pink-400 text-white' : 'text-gray-500'"
                                    class="text-xs hover:bg-pink-400 hover:text-white px-2 py-1 duration-300 cursor-pointer">
                                    {{ item.name }}</div>
                            </div>
                            <div v-if="childCategory" class="flex flex-row mt-0.5">
                                <div @click="searchAllChildPost(null, 'all')"
                                    :class="'all' == currentChildIndex ? 'bg-pink-400 text-white' : 'text-gray-500'"
                                    class="text-xs hover:bg-pink-400 hover:text-white px-2 py-1 duration-300 cursor-pointer">
                                    全部</div>
                                <div v-for="(item, index) in childCategory" :key="index"
                                    @click="searchChildPost(item.children, item.slug)"
                                    :class="item.slug == currentChildIndex ? 'bg-pink-400 text-white' : 'text-gray-500'"
                                    class="text-xs hover:bg-pink-400 hover:text-white px-2 py-1 duration-300 cursor-pointer">
                                    {{ item.name }}</div>
                            </div>
                            <div v-if="grandCategory" class="flex flex-row mt-0.5">
                                <div @click="searchAllGrandPost(null, 'all')"
                                    :class="'all' == currentGrandIndex ? 'bg-pink-400 text-white' : 'text-gray-500'"
                                    class="text-xs hover:bg-pink-400 hover:text-white px-2 py-1 duration-300 cursor-pointer">
                                    全部</div>
                                <div v-for="(item, index) in grandCategory" :key="index"
                                    @click="searchGrandPost(item.children, item.slug)"
                                    :class="item.slug == currentGrandIndex ? 'bg-pink-400 text-white' : 'text-gray-500'"
                                    class="text-xs hover:bg-pink-400 hover:text-white px-2 py-1 duration-300 cursor-pointer">
                                    {{ item.name }}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="flex flex-row justify-between bg-white mt-3 rounded-md shadow-sm animate-fadeIn30 px-4">
                    <div class="flex flex-row">
                        <div v-for="(item, index) in sort" :key="index" @click="sortPost(item.type, desc)"
                            :class="orderKey === item.type ? 'text-pink-400 bg-pink-50' : ''"
                            class="text-xs px-3 select-none py-2 flex justify-center items-center cursor-pointer text-gray-400 hover:text-pink-400 hover:bg-pink-50 duration-300">
                            {{ item.title }}</div>
                    </div>
                    <div @click="sortPost('updated_at', !desc)"
                        class="text-xs px-3 py-2 select-none flex justify-center items-center cursor-pointer text-gray-500 hover:text-pink-400 hover:bg-pink-50 duration-300">
                        {{ desc ? '倒序' : '正序' }}</div>
                </div>
                <div class="flex justify-start flex-wrap mt-4 animate-fadeIn30">
                    <div v-for="(post, v) in searchPostList" :key="v" class="w-1/6 p-1.5">
                        <Article :post="post" imgHeight="h-60"></Article>
                    </div>
                    <div class="w-full p-1.5 text-gray-500">
                        <div v-if="hasMore" @click="nextPage"
                            class="w-full p-1.5 select-none bg-white border-3 border-gray-100 rounded-md cursor-pointer text-center text-xs hover:bg-pink-50 border-2 duration-20 hover:border-pink-400 duration-300">
                            查看更多</div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script lang="ts">
import { time } from "console"
import { CATEGORYLIST, SEARCHPOSTLIST } from "~~/config/api"
import { SearchPostList, CategoryList } from "~~/types/response"

export default defineComponent({
    props: {},
    async setup(props: any) {
        const keyword = ref<string | string[]>('')
        const childCategory = ref()
        const grandCategory = ref()
        const currentIndex = ref<String>('all')
        const currentChildIndex = ref<String>('all')
        const currentGrandIndex = ref<String>('all')
        const childIndex = ref<String>('all')
        const grandIndex = ref<String>('all')
        const category = ref<String>('news')
        const page = ref(1)
        const pageSize = ref(12)
        const hasMore = ref(true)
        const orderKey = ref<String>('updated_at')
        const desc = ref<boolean>(true)
        const searchPostList = ref<any>([])
        const sort = ref<any>([
            {
                title: '按最新',
                type: 'updated_at',
            },
            {
                title: '按标题',
                type: 'title',
            },
            {
                title: '按作者',
                type: 'author',
            },
            {
                title: '按查看',
                type: 'view',
            },
        ])
        const route = useRoute()

        keyword.value = route.query.keyword

        function jumpTo(key: string | string[]) {
            keyword.value = key
            return navigateTo({
                path: '/search/',
                query: {
                    keyword: keyword.value,
                }
            })
        }

        const categoryListContent = await useCustomFetch<CategoryList>(CATEGORYLIST, {
            method: 'GET',
            params: {
                page: 1,
                pageSize: 999,
            }
        })
        const categoryList = computed(() => categoryListContent.result.value)

        function searchPost(child: any, value: String) {
            currentIndex.value = value
            currentChildIndex.value = 'all'
            currentGrandIndex.value = 'all'
            childCategory.value = child
            category.value = value
            childIndex.value = value
            getSearchPostList()
        }

        function searchChildPost(child: any, value: String) {
            currentChildIndex.value = value
            currentGrandIndex.value = 'all'
            grandCategory.value = child
            category.value = value
            grandIndex.value = value
            getSearchPostList()
        }

        function searchAllChildPost(child: any, value: String) {
            currentChildIndex.value = value
            currentGrandIndex.value = 'all'
            grandCategory.value = child
            category.value = childIndex.value
            getSearchPostList()
        }

        function searchGrandPost(child: any, value: String) {
            currentGrandIndex.value = value
            category.value = value
            getSearchPostList()
        }

        function searchAllGrandPost(child: any, value: String) {
            currentGrandIndex.value = value
            category.value = grandIndex.value
            getSearchPostList()
        }

        function nextPage() {
            page.value++
            getSearchPostList()
        }

        function sortPost(type: String, descs: boolean) {
            orderKey.value = type
            desc.value = descs
            getSearchPostList()
        }

        async function getSearchPostList() {
            const { result } = await useCustomFetch<SearchPostList>(SEARCHPOSTLIST, {
                method: 'GET',
                params: {
                    title: keyword.value,
                    category: category.value,
                    page: page.value,
                    pageSize: pageSize.value,
                    orderKey: orderKey.value,
                    desc: desc.value
                }
            })
            searchPostList.value = result.value.list
        }

        const { result } = await useCustomFetch<SearchPostList>(SEARCHPOSTLIST, {
            method: 'GET',
            params: {
                title: keyword.value,
                category: category.value,
                page: page.value,
                pageSize: pageSize.value,
                orderKey: orderKey.value,
                desc: desc.value
            }
        })
        searchPostList.value.push(...result.value.list)

        return {
            categoryList,
            keyword,
            childCategory,
            currentIndex,
            currentChildIndex,
            currentGrandIndex,
            grandCategory,
            searchPostList,
            sort,
            desc,
            hasMore,
            orderKey,
            nextPage,
            sortPost,
            jumpTo,
            searchPost,
            searchChildPost,
            searchGrandPost,
            searchAllChildPost,
            searchAllGrandPost,
        }
    }
})
</script>