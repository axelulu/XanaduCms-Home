<template>
    <div class="flex justify-start flex-wrap mt-4 animate-fadeIn30">
        <div class="flex flex-wrap">
            <div v-for="(item, index) in fansList" :key="index"
                class="p-1 text-center cursor-pointer text-gray-500 hover:bg-pink-50 hover:text-pink-400">
                <NuxtLink :to="'/author-[id]-userInfo/' + item.formUidRelation.uuid">
                    <img class="rounded-full h-20 w-20 border-2 border-transparent hover:border-pink-400 duration-300 object-cover"
                        v-lazy="runtimeConfig.public.assetsUrl + item.formUidRelation.avatar" alt="">
                    <div class="text-xs mt-1">{{ item.formUidRelation.nickName }}</div>
                </NuxtLink>
            </div>
        </div>
        <div class="w-full p-1.5 text-gray-500">
            <div v-if="hasMore" @click="nextPage"
                class="w-full p-1.5 select-none bg-white border-3 border-gray-100 rounded-md cursor-pointer text-center text-xs hover:bg-pink-50 border-2 duration-20 hover:border-pink-400 duration-300">
                查看更多</div>
        </div>
    </div>
</template>
<script lang="ts">
import { FOLLOWLIST } from '~~/config/api';
import { FollowList } from '~~/types/response';

export default defineComponent({
    props: {
        authorId: {
            type: String,
            default: '',
        },
    },
    async setup(props: any) {
        const route = useRoute()
        const page = ref(1)
        const pageSize = ref(12)
        const hasMore = ref(true)
        const fansList = ref<any>([])
        const runtimeConfig = useRuntimeConfig()

        async function getAuthorPostList() {
            const { result } = await useCustomFetch<FollowList>(FOLLOWLIST, {
                method: 'GET',
                params: {
                    toUid: props.authorId,
                    page: page.value,
                    pageSize: pageSize.value,
                }
            })
            if (result.value.list.length <= 0) {
                hasMore.value = false
            }
            fansList.value.push(...result.value.list)
        }

        async function nextPage() {
            page.value++
            getAuthorPostList()
        }

        const { result } = await useCustomFetch<FollowList>(FOLLOWLIST, {
            method: 'GET',
            params: {
                toUid: props.authorId,
                page: page.value,
                pageSize: pageSize.value,
            }
        })
        fansList.value.push(...result.value.list)

        return {
            fansList,
            hasMore,
            runtimeConfig,
            nextPage,
        }
    }
})

</script>