<template>
    <article class="border-2 duration-300 border-transparent hover:border-pink-400 rounded-md overflow-hidden">
        <div class="hover:bg-pink-50 bg-white shadow-sm w-full h-full">
            <div class="relative">
                <nuxt-link :to="'/post/' + post.postId + '.html'">
                    <img :class="'overflow-hidden object-cover ' + imgHeight + ' w-full cursor-pointer object-cover'"
                        v-lazy="runtimeConfig.public.assetsUrl + post.cover" alt="" srcset="">
                </nuxt-link>
                <div class="absolute top-0 right-0 text-xs text-white bg-black bg-opacity-30 px-1 py-0.5">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                    <span>{{ post.view }}</span>
                </div>
                <NuxtLink :to="'/category/' + post.CategoryRelation.slug"
                    class="absolute bottom-0 text-xs text-white bg-sky-400 bg-opacity-30 px-1 py-0.5 text-center cursor-pointer">
                    {{ post.CategoryRelation.name }}</NuxtLink>
            </div>
            <NuxtLink :to="'/post/' + post.postId + '.html'"
                class="text-ellipsis text-xs p-2 line-clamp-2 h-10 cursor-pointer hover:text-pink-400 duration-300">{{
                        post.title
                }}</NuxtLink>
            <div class="flex flex-row justify-between pl-2 pr-2 pt-1 pb-2 text-xs">
                <NuxtLink :to="'/author-' + post.AuthorRelation.uuid + '/userInfo'"
                    class="cursor-pointer hover:text-pink-400 duration-300 text-gray-400">{{
                            post.AuthorRelation.nickName
                    }}</NuxtLink>
                <div class="cursor-pointer hover:text-pink-400 duration-300 text-gray-400">{{ formatDate(post.UpdatedAt,
                        'YYYY-MM-DD')
                }}</div>
            </div>
        </div>
    </article>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { formatDate } from '~~/utils/utils'

export default defineComponent({
    props: {
        post: {
            type: Object,
            default: {},
        },
        imgHeight: {
            type: String,
            default: '',
        }
    },
    setup(props: any) {
        const runtimeConfig = useRuntimeConfig()
        return {
            formatDate,
            runtimeConfig
        }
    }
})

</script>