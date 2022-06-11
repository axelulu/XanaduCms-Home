<template>
    <NuxtLayout name="index">
        <div class="flex flex-col items-center">
            <div class="lg:w-3/4 xl:w-6/12">
                <div class="flex flex-row bg-white mt-3 rounded-md shadow-sm animate-fadeIn30">
                    <NuxtLink to="/"
                        class="text-xs p-3 text-gray-500 ml-1 hover:bg-pink-50 cursor-pointer hover:text-pink-400 duration-300">
                        <font-awesome-icon :icon="['fas', 'home']" />
                    </NuxtLink>
                    <NuxtLink v-for="(item, index) in category" :key="index" :to="'/category/' + item.slug"
                        class="flex justify-center items-center text-gray-500">
                        <font-awesome-icon class="text-xs py-3 px-2 text-gray-300 ml-1"
                            :icon="['fas', 'caret-right']" />
                        <span
                            class="text-xs py-3 px-2 hover:bg-pink-50 cursor-pointer hover:text-pink-400 duration-300">{{
                                    item.name
                            }}</span>
                    </NuxtLink>
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
                    <Spin :show="loading">
                        <div v-for="(post, v) in categoryPostList" :key="v" class="w-1/6 p-1.5">
                            <Article :post="post" imgHeight="h-60"></Article>
                        </div>
                    </Spin>
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
<script lang="ts" setup>
import { CATEGORYPOSTLIST } from '~~/config/api';
import { CategoryPostList } from '~~/types/response';

const route = useRoute()
const loading = ref(true)
const page = ref(1)
const pageSize = ref(12)
const hasMore = ref(true)
const categoryPostList = ref<any>([])
const category = ref<any>([])
const orderKey = ref<String>('updated_at')
const desc = ref<boolean>(true)
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

function nextPage() {
    page.value++
    getCategoryPostList((data) => categoryPostList.value.push(...data.value.list.post))
}

function sortPost(type: String, descs: boolean) {
    orderKey.value = type
    desc.value = descs
    getCategoryPostList((data) => categoryPostList.value = data.value.list.post)
}

async function getCategoryPostList(f1: Function) {
    loading.value = true
    const { result } = await useCustomFetch<CategoryPostList>(CATEGORYPOSTLIST, {
        method: 'GET',
        params: {
            category: route.params.slug,
            page: page.value,
            pageSize: pageSize.value,
            orderKey: orderKey.value,
            desc: desc.value
        }
    })
    if (result.value.list.post.length <= 0) {
        hasMore.value = false
    }
    f1(result)
    loading.value = false
}

loading.value = true
const { result } = await useCustomFetch<CategoryPostList>(CATEGORYPOSTLIST, {
    method: 'GET',
    params: {
        category: route.params.slug,
        page: page.value,
        pageSize: pageSize.value,
        orderKey: orderKey.value,
        desc: desc.value
    }
})
const title = computed(() => result.value.list.category[0].name)
categoryPostList.value.push(...result.value.list.post)
category.value = result.value.list.category
loading.value = false
const settings = useSettings()
useHead({
    title: `${title.value} - ${settings.value.basic.desc}`,
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    charset: 'utf-8',
    meta: [
        { name: 'og:locale', content: 'zh_CN' },
        { name: 'og:type', content: 'article' },
        { name: 'og:site_name', content: settings.value.basic.title },
        { name: 'og:title', content: `${settings.value.basic.title} - ${settings.value.basic.desc}` },
        { name: 'og:url', content: settings.value.basic.desc },
        { name: 'keywords', content: settings.value.basic.keyword },
        { name: 'description', content: settings.value.basic.desc },
    ],
})
</script>