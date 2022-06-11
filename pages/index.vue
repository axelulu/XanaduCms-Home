<template>
    <NuxtLayout name="index">
        <div class="flex flex-col items-center relative">
            <div class="border-y-4 border-pink-400 w-full animate-fadeIn30" style="max-height: 480px;">
                <div class="popular flex flex-wrap overflow-hidden w-full duration-300" style="max-height: 472px;">
                    <NuxtLink v-for="(item, index) in home.popular" :key="index" :to="'/post/' + item.postId + '.html'"
                        class="popular-item hover:after:opacity-0! after:duration-500 flex-grow flex-initial relative cursor-pointer after:opacity-30">
                        <img class="h-60 max-w-full min-w-full object-cover"
                            v-lazy="runtimeConfig.public.assetsUrl + item.cover" alt="">
                        <div class="absolute top-1/2 left-0 bottom-0 ring-0 w-full"
                            style="background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.65));"></div>
                        <div class="absolute bottom-1 px-8 w-full text-center text-white text-md">{{ item.title }}
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <div class="lg:w-2/3 xl:w-5/12 mt-4 justify-center items-center animate-fadeIn30">
                <div class="flex flex-row mb-2">
                    <div class="w-7 h-7 bg-sky-400 rounded-full flex justify-center items-center text-white mr-1">
                        <font-awesome-icon :icon="['fas', 'star']" />
                    </div>
                    <div class="text-lg">推荐栏</div>
                </div>
                <div class="flex justify-center flex-wrap">
                    <div v-for="(post, v) in home.recommend" :key="v" class="w-1/5 h-80 p-1.5 overflow-hidden">
                        <Article :post="post" imgHeight="h-60"></Article>
                    </div>
                    <div class="w-full p-1.5 text-gray-400">
                        <div
                            class="w-full select-none shadow-sm p-1.5 bg-white border-2 border-transparent rounded-md cursor-pointer text-center text-xs hover:bg-pink-50 hover:border-pink-400 duration-300">
                            查看更多
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="data.showBar" class="fixed top-20 right-siderBar z-10 bg-white border border-pink-400">
                <div v-for="(item, index) in home.content" :key="index">
                    <div @click="jump(index)"
                        :class="data.showIndex === index ? 'bg-pink-400 text-white' : 'text-gray-500'"
                        class="text-xs p-2 cursor-pointer hover:bg-pink-400 hover:text-white duration-300 flex flex-col">
                        <font-awesome-icon :icon="[item.iconType, item.icon]" />
                        <span :class="data.showIndex === index ? 'block' : 'hidden'" class="col-text mt-1">{{
                                item.name
                        }}</span>
                    </div>
                </div>
            </div>
            <div ref="contentRef" class="w-full animate-fadeIn30">
                <div v-for="(item, index) in home.content" :key="index" class="lg:w-3/4 xl:w-6/12 mt-4 flex flex-col m-auto">
                    <div class="ml-2 flex flex-row">
                        <div class="w-7 h-7 bg-sky-400 rounded-full flex justify-center items-center text-white mr-1">
                            <font-awesome-icon :icon="[item.iconType, item.icon]" />
                        </div>
                        <div class="text-lg">{{ item.name }}</div>
                        <div class="flex flex-row ml-6 flex-1 justify-start items-center">
                            <NuxtLink v-for="(topic, i) in item.topic" :key="index" :to="'/topic/' + topic.value"
                                class="h-6 border-2 border-gray-200 text-xs px-2 py-0.5 mx-0.5 cursor-pointer text-gray-400 hover:text-black hover:border-gray-300 duration-300">
                                {{ topic.label }}
                            </NuxtLink>
                        </div>
                        <NuxtLink :to="'/category/' + item.slug"
                            class="text-xs text-gray-500 mr-2 flex items-center hover:text-pink-400 cursor-pointer duration-300">
                            更多
                            <font-awesome-icon class="ml-1" :icon="['fas', 'caret-right']" />
                        </NuxtLink>
                    </div>
                    <div class="flex justify-start flex-wrap">
                        <div v-for="(post, v) in item.post" :key="v" class="w-1/6 p-1.5">
                            <Article :post="post" :imgHeight="item.style == 1 ? 'h-60' : 'h-32'"></Article>
                        </div>
                        <div class="w-full p-1.5 text-gray-500">
                            <nuxt-link :to="'/category/' + item.slug">
                                <div
                                    class="w-full select-none shadow-sm p-1.5 bg-white border-2 border-transparent rounded-md cursor-pointer text-center text-xs hover:bg-pink-50 duration-20 hover:border-pink-400 duration-300">
                                    查看更多
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { HOMELIST } from '~~/config/api';
import { HomeList } from '~~/types/response';
// import { NButton } from 'naive-ui'

const settings = useSettings()
const runtimeConfig = useRuntimeConfig()
useHead({
    title: `${settings.value.basic.title} - ${settings.value.basic.desc}`,
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
// 列表HTMLElementDom
const contentRef = ref();
const data = reactive<any>({
    showBar: false,
    showIndex: 0,
})
const homeContent = await useCustomFetch<HomeList>(HOMELIST, {
    method: 'GET',
    params: {
        page: 1,
        pageSize: 999,
    }
})
const home = computed(() => homeContent.result.value)
function jump(i: any) {
    data.showIndex = i;
    document.documentElement.scrollTop = contentRef.value.children[i].offsetTop
}
function scrollHandler() {
    // 当前滚动高度
    let scrollY = document.documentElement.scrollTop
    if (scrollY > 700) {
        data.showBar = true
        data.showIndex = -1;
    } else {
        data.showBar = false
    }
    for (var i = 0; i < contentRef.value.children.length; i++) {
        if (scrollY + 50 > contentRef.value.children[i].offsetTop) {
            data.showIndex = i;
        }
    }
}
watchEffect(() => {
    nextTick(() => {
        if (home.value.content && home.value.content.length > 0) {
            if (typeof window !== "undefined") {
                window.removeEventListener('scroll', scrollHandler)
                window.addEventListener('scroll', scrollHandler)
            }
        }
    })
})
onUnmounted(() => {
    if (typeof window !== "undefined") {
        window.removeEventListener('scroll', scrollHandler)
    }
})
onMounted(() => {
    scrollHandler()
})
</script>
<style scoped>
.col-text {
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
}

.popular:hover .popular-item:after {
    opacity: .5
}

.popular-item:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
    opacity: 0
}
</style>