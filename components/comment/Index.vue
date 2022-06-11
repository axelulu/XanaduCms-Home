<template>
    <div v-show="isShow" :class="showAnimate ? 'animate-fadeIn30' : 'animate-fadeOut30'"
        class="z-20 fixed top-0 bottom-0 left-0 ring-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-50">
        <div @click="hide" class="fixed top-0 bottom-0 left-0 ring-0 w-full h-full"></div>
        <div :class="showAnimate ? 'animate-zoomInUp30' : 'animate-zoomOutDown30'"
            class="fixed top-0 bottom-0 left-0 ring-0 flex justify-center items-center h-full w-full pointer-events-none">
            <form ref="formComment"
                class="lg:w-2/6 xl:w-4/12 bg-gray-50 pointer-events-auto flex flex-col rounded-md overflow-hidden">
                <div class="flex flex-row justify-between items-center">
                    <div
                        class="flex flex-row justify-center items-center text-gray-500 text-xs ml-4 p-0 rounded-bl-md rounded-br-md overflow-hidden">
                        <font-awesome-icon :icon="['fas', 'comments']" />
                        <NuxtLink :to="'/author-' + commentMetas.FormUidRelation.uuid + '/userInfo'"
                            v-if="commentMetas !== null" class="ml-1">回复 <span class="text-pink-400">{{
                                    commentMetas.FormUidRelation.nickName
                            }}</span> 的评论</NuxtLink>
                        <span v-else class="ml-1">发表评论</span>
                    </div>
                    <div class="text-sm px-4 py-1.5 bg-gray-200 cursor-pointer hover:text-white hover:bg-pink-400 duration-300 rounded-bl-md"
                        @click="hide">
                        <font-awesome-icon :icon="['fas', 'times']" />
                    </div>
                </div>
                <div class="pb-4 pt-2 px-4 text-xs h-24">
                    <NuxtTextareaInput :required="true" pattern="[\u4e00-\u9fa5]{1,100}$|^[\dA-Za-z_]{1,100}$"
                        class="h-full" v-model:value="commentContent" type="email" placeholder="请输入评论内容">
                    </NuxtTextareaInput>
                </div>
                <div class="flex flex-row">
                    <div @click="showFont"
                        class="py-3 w-2/12 flex justify-center items-center text-xs bg-gray-100 cursor-pointer hover:bg-gray-200 duration-300">
                        <font-awesome-icon :icon="['fas', 'font']" />
                    </div>
                    <div @click="showSmile"
                        class="py-3 w-2/12 flex justify-center items-center text-xs bg-gray-100 cursor-pointer hover:bg-gray-200 duration-300">
                        <font-awesome-icon :icon="['fas', 'smile']" />
                    </div>
                    <NuxtGreenBtn @click="submitComment" class="w-8/12" :icon="['fas', 'check']" value="我说完了">
                    </NuxtGreenBtn>
                </div>
            </form>
        </div>
        <Message ref="message"></Message>
        <CommentFont @insertFont="insertFont" ref="font"></CommentFont>
        <CommentSmile @insertSmile="insertSmile" ref="smile"></CommentSmile>
    </div>
</template>
<script lang="ts">
import { COMMENTCREATE } from "~~/config/api"
import { useAuth } from "~~/store/auth"

export default defineComponent({
    props: {
        postId: {
            type: String,
            default: 'login',
        }
    },
    setup(props: any) {
        const dialog = ref()
        const message = ref()
        const font = ref()
        const smile = ref()
        const formComment = ref()
        const showAnime = ref<string>()
        const auth = useAuth()
        const route = useRouter()
        const commentContent = ref<string>('')
        const commentType = ref<string>('post')
        const commentMetas = ref<any>(null)

        const isShow = ref<boolean>(false)
        const showAnimate = ref<boolean>(false)
        function show(commentMeta) {
            if (commentMeta !== null) {
                commentMetas.value = commentMeta
                commentType.value = 'comment'
            }
            isShow.value = true
            showAnimate.value = true
        }
        function hide() {
            showAnimate.value = false
            setTimeout(() => {
                isShow.value = false
            }, 300)
        }

        function showFont() {
            font.value.show()
        }

        function showSmile() {
            smile.value.show()
        }

        async function submitComment() {
            if (formComment.value.reportValidity()) {
                const { result, code, message: msg } = await useCustomFetch<any>(COMMENTCREATE, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + auth.token,
                    },
                    body: {
                        postId: props.postId,
                        parentId: commentMetas.value ? commentMetas.value.ID : 0,
                        formUid: auth.userId,
                        toUid: commentMetas.value ? commentMetas.value.FormUidRelation.uuid : null,
                        content: commentContent.value,
                        type: commentType.value,
                        status: "published",
                    }
                })
                if (code === 200) {
                    message.value.show('评论成功', {
                        type: 'success',
                    })
                    setTimeout(() => {
                        hide()
                    }, 300)
                    setTimeout(() => {
                        route.push('/post/' + props.postId + '.html?t=' + Date.parse(new Date().toString()))
                    }, 3000)
                } else {
                    message.value.show(msg || '评论失败', {
                        type: 'warning',
                    })
                }
            }
        }

        function insertFont(item) {
            commentContent.value = commentContent.value + item
        }

        function insertSmile(item) {
            commentContent.value = commentContent.value + item
        }

        return {
            dialog,
            message,
            showAnime,
            commentContent,
            smile,
            font,
            formComment,
            insertFont,
            insertSmile,
            show,
            hide,
            showFont,
            showSmile,
            submitComment,
            showAnimate,
            isShow,
            commentMetas,
        }
    }
})
</script>