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
                <div class="flex flex-row items-center px-4 pb-4">
                    <table class="w-full">
                        <thead class="text-xs text-gray-500 bg-pink-200">
                            <tr>
                                <th class="px-2 py-3">封面</th>
                                <th class="px-2 py-3">标题</th>
                                <th class="px-2 py-3">操作</th>
                                <th class="px-2 py-3">状态</th>
                                <th class="px-2 py-3">类型</th>
                                <th class="px-2 py-3">日期</th>
                                <th class="px-2 py-3">评论</th>
                                <th class="px-2 py-3">下载</th>
                                <th class="px-2 py-3">查看数</th>
                                <th class="px-2 py-3">帖子点赞</th>
                            </tr>
                        </thead>
                        <tbody class="text-xs text-gray-500">
                            <tr v-if="userPostList" v-for="(item, index) in userPostList.list" :key="index">
                                <th class="px-2 py-3 flex justify-center items-center">
                                    <img v-lazy="runtimeConfig.public.assetsUrl + item.cover"
                                        class="w-10 h-10 object-cover" alt="">
                                </th>
                                <th class="px-2 py-3">
                                    <div
                                        class="cursor-pointer hover:bg-pink-400 hover:text-white duration-300 py-1.5 font-normal">
                                        <span>{{ item.title }}</span>
                                    </div>
                                </th>
                                <th class="px-2 py-3">
                                    <div class="cursor-pointer hover:bg-pink-400 hover:text-white duration-300 py-1.5">
                                        <font-awesome-icon :icon="['fas', 'edit']" />
                                        <span class="ml-1 font-normal">编辑</span>
                                    </div>
                                </th>
                                <th class="px-2 py-3 font-normal">{{ item.status === 'published' ?
                                        '已发布' : item.status === 'draft' ? '草稿' : '等待审核'
                                }}</th>
                                <th class="px-2 py-3 font-normal">{{ item.type === 'post' ? '文章' : item.type ===
                                        'music' ? '音乐' : '视频'
                                }}</th>
                                <th class="px-2 py-3 font-normal">{{ formatDate(item.UpdatedAt) }}</th>
                                <th class="px-2 py-3">
                                    <font-awesome-icon :icon="['fas', 'comments']" />
                                    <span class="ml-1 font-normal">{{ item.commentRelation.length }}</span>
                                </th>
                                <th class="px-2 py-3">
                                    <font-awesome-icon :icon="['fas', 'cloud-download-alt']" />
                                    <span class="ml-1 font-normal">{{ item.downloadRelation.length }}</span>
                                </th>
                                <th class="px-2 py-3">
                                    <font-awesome-icon :icon="['fas', 'eye']" />
                                    <span class="ml-1 font-normal">{{ item.view }}</span>
                                </th>
                                <th class="px-2 py-3">
                                    <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                                    <span class="ml-1 font-normal">{{ item.starRelation.length }}</span>
                                </th>
                            </tr>
                        </tbody>
                        <tfoot class="text-xs text-gray-500 bg-pink-200">
                            <tr>
                                <th class="px-2 py-3">封面</th>
                                <th class="px-2 py-3">标题</th>
                                <th class="px-2 py-3">操作</th>
                                <th class="px-2 py-3">状态</th>
                                <th class="px-2 py-3">类型</th>
                                <th class="px-2 py-3">日期</th>
                                <th class="px-2 py-3">评论</th>
                                <th class="px-2 py-3">下载</th>
                                <th class="px-2 py-3">查看数</th>
                                <th class="px-2 py-3">帖子点赞</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script lang="ts">
import { USERPOSTLIST } from "~~/config/api";
import { useAuth } from "~~/store/auth";
import { PostList } from "~~/types/response";
import { formatDate } from "~~/utils/utils";

export default defineComponent({
    setup() {
        const auth = useAuth()
        const userPostList = ref<PostList>()
        const runtimeConfig = useRuntimeConfig()

        async function getUserPost() {
            const { result, code, message: msg } = await useCustomFetch<PostList>(USERPOSTLIST, {
                method: 'GET',
                params: {
                    'Authorization': 'Bearer ' + auth.token,
                    page: 1,
                    pageSize: 999,
                }
            })
            userPostList.value = result.value
        }

        onMounted(() => {
            getUserPost()
        })

        return {
            userPostList,
            runtimeConfig,
            formatDate,
        }

    }
})
</script>