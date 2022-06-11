<template>
    <NuxtLayout name="user">
        <form ref="formPublish" class="ml-6">
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
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'file']" />
                    <span class="ml-1 select-none">文章类型</span>
                </div>
                <div class="flex flex-row items-center px-4 pb-4 mt-6">
                    <div :class="formParams.type == 'post' ? 'bg-green-500 text-white' : 'text-gray-600'"
                        @click="formParams.type = 'post'"
                        class="text-xs w-1/3 flex justify-center items-center border-y-2 border-gray-100 py-1.5 cursor-pointer select-none hover:bg-green-500 duration-300 active:bg-green-600 hover:text-white">
                        <font-awesome-icon :icon="['fas', 'file']" />
                        <span class="ml-1">文章</span>
                    </div>
                    <div :class="formParams.type == 'video' ? 'bg-green-500 text-white' : 'text-gray-600'"
                        @click="formParams.type = 'video'"
                        class="text-xs w-1/3 flex justify-center items-center border-y-2 border-gray-100 py-1.5 cursor-pointer select-none hover:bg-green-500 duration-300 active:bg-green-600 hover:text-white">
                        <font-awesome-icon :icon="['fas', 'video']" />
                        <span class="ml-1">视频</span>
                    </div>
                    <div :class="formParams.type == 'music' ? 'bg-green-500 text-white' : 'text-gray-600'"
                        @click="formParams.type = 'music'"
                        class="text-xs w-1/3 flex justify-center items-center border-y-2 border-gray-100 py-1.5 cursor-pointer select-none hover:bg-green-500 duration-300 active:bg-green-600 hover:text-white">
                        <font-awesome-icon :icon="['fas', 'music']" />
                        <span class="ml-1">音乐</span>
                    </div>
                </div>
            </div>
            <div v-if="formParams.type == 'video'"
                class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative animate-fadeIn30">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'video']" />
                    <span class="ml-1 select-none">视频</span>
                </div>
                <div class="flex flex-wrap items-center px-4 pb-4 mt-6">
                    <div v-for="(item, index) in formParams.videoRelation" :key="index" class="flex flex-row w-full">
                        <div class="w-4/12 pr-2">
                            <NuxtInput class="w-full text-xs" :icon="['fas', 'video']" v-model:value="item.name"
                                type="text" placeholder="视频名称">
                            </NuxtInput>
                        </div>
                        <div class="w-4/12 pr-2">
                            <NuxtInput class="w-full text-xs" :icon="['fas', 'link']" v-model:value="item.url"
                                type="text" placeholder="视频链接">
                            </NuxtInput>
                        </div>
                        <div class="w-4/12 pr-2">
                            <NuxtInput class="w-full text-xs" :icon="['fas', 'link']" v-model:value="item.subtitles"
                                type="text" placeholder="视频字幕地址">
                            </NuxtInput>
                        </div>
                        <div class="w-2/12 flex flex-row items-center">
                            <div @click="formParams.videoRelation.length > 5 ? '' : formParams.videoRelation.push({ name: '', url: '', subtitles: '' })"
                                :class="formParams.videoRelation.length > 5 ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
                                class="w-full h-8 flex justify-center items-center select-none py-1 hover:bg-green-600 duration-300 active:bg-green-500 bg-green-500 border-2 border-green-600 text-xs text-white text-center">
                                <font-awesome-icon :icon="['fas', 'add']" />
                            </div>
                            <div @click="formParams.videoRelation.length < 2 ? '' : formParams.videoRelation.splice(index, 1)"
                                :class="formParams.videoRelation.length < 2 ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
                                class="w-full h-8 flex justify-center items-center select-none py-1 cursor-pointer hover:bg-red-600 duration-300 active:bg-red-500 bg-red-500 border-2 border-red-600 text-xs text-white text-center">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="formParams.type == 'music'"
                class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative animate-fadeIn30">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'music']" />
                    <span class="ml-1 select-none">音乐</span>
                </div>
                <div class="flex flex-wrap items-center px-4 pb-4 mt-6">
                    <div v-for="(item, index) in formParams.musicRelation" :key="index" class="flex flex-row w-full">
                        <div class="w-4/12 pr-2">
                            <NuxtInput class="w-full text-xs" :icon="['fas', 'music']" v-model:value="item.name"
                                type="text" placeholder="音乐名称">
                            </NuxtInput>
                        </div>
                        <div class="w-8/12 pr-2">
                            <NuxtInput class="w-full text-xs" :icon="['fas', 'link']" v-model:value="item.url"
                                type="text" placeholder="音乐页面地址（网易云音乐或文件直连）">
                            </NuxtInput>
                        </div>
                        <div class="w-2/12 flex flex-row items-center">
                            <div @click="formParams.musicRelation.length > 5 ? '' : formParams.musicRelation.push({ name: '', url: '' })"
                                :class="formParams.musicRelation.length > 5 ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
                                class="w-full h-8 flex justify-center items-center select-none py-1 hover:bg-green-600 duration-300 active:bg-green-500 bg-green-500 border-2 border-green-600 text-xs text-white text-center">
                                <font-awesome-icon :icon="['fas', 'add']" />
                            </div>
                            <div @click="formParams.musicRelation.length < 2 ? '' : formParams.musicRelation.splice(index, 1)"
                                :class="formParams.musicRelation.length < 2 ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
                                class="w-full h-8 flex justify-center items-center select-none py-1 cursor-pointer hover:bg-red-600 duration-300 active:bg-red-500 bg-red-500 border-2 border-red-600 text-xs text-white text-center">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'file']" />
                    <span class="ml-1 select-none">文章标题</span>
                </div>
                <div class="flex flex-row items-center px-4 pb-4 mt-6">
                    <NuxtInput class="w-full text-xs" :icon="['fas', 'file']" :required="true"
                        pattern="[\u4e00-\u9fa5]{1,50}$|^[\dA-Za-z_]{1,50}$" v-model:value="formParams.title"
                        type="text" placeholder="请输入文章标题">
                    </NuxtInput>
                </div>
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'file']" />
                    <span class="ml-1 select-none">文章摘要</span>
                </div>
                <div class="flex flex-row items-center px-4 pb-4 mt-6">
                    <NuxtTextareaInput class="w-full text-xs" v-model:value="formParams.exerpt" :required="true"
                        pattern="[\u4e00-\u9fa5]{1,120}$|^[\dA-Za-z_]{1,120}$" rows="5" maxlen="120"
                        placeholder="请输入文章摘要">
                    </NuxtTextareaInput>
                </div>
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'paint-brush']" />
                    <span class="ml-1 select-none">文章内容</span>
                </div>
                <div class="flex flex-row items-center px-4 pb-4 mt-6">
                    <WangEditor ref="wangEditor" v-model:value="formParams.content"></WangEditor>
                </div>
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'images']" />
                    <span class="ml-1 select-none">文章图片</span>
                </div>
                <div class="flex flex-col items-center px-4 pb-4 mt-6">
                    <label for="avatar"
                        class="border-2 border-dashed hover:bg-gray-100 duration-300 border-gray-500 cursor-pointer h-12 w-full flex justify-center items-center">
                        <font-awesome-icon class="text-xs text-gray-500" :icon="['fas', 'hand-paper']" />
                        <span class="ml-2 text-xs text-gray-500 select-none">添加图片</span>
                        <input @change="uploadPostImg" accept="image/gif, image/jpg, image/jpeg, image/png, image/webp"
                            type="file" id="avatar" hidden value="" />
                    </label>
                    <div class="flex flex-col w-full mt-2">
                        <div v-for="(item, index) in formParams.postImg" :key="index" class="flex flex-row w-full">
                            <img class="w-16 h-16 mt-2 mr-2 object-cover"
                                :src="runtimeConfig.public.assetsUrl + item.url" alt="">
                            <div class="flex flex-col flex-1">
                                <NuxtTextareaInput class="w-full text-xs h-8" :value="item.name"></NuxtTextareaInput>
                                <div class="flex flex-row justify-between">
                                    <div class="flex flex-row w-full">
                                        <NuxtGreenBtn @click="insertPostImg(item)" class="w-2/12" value="插入到文章"
                                            :icon="['fas', 'plus-circle']">
                                        </NuxtGreenBtn>
                                        <NuxtGreenBtn v-if="formParams.cover === item.url"
                                            @click="formParams.cover = item.url" class="w-2/12" value="设为封面"
                                            :icon="['fas', 'star']">
                                        </NuxtGreenBtn>
                                        <NuxtWhiteBtn v-else @click="formParams.cover = item.url" class="w-2/12"
                                            value="设为封面" :icon="['fas', 'star']">
                                        </NuxtWhiteBtn>
                                    </div>
                                    <div @click="deletePostImg(index)"
                                        class="w-1/12 h-8 flex justify-center items-center select-none py-1 cursor-pointer hover:bg-red-600 duration-300 active:bg-red-500 bg-red-500 border-2 border-red-600 text-xs text-white text-center">
                                        <font-awesome-icon :icon="['fas', 'trash']" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'sitemap']" />
                    <span class="ml-1 select-none">文章分类</span>
                </div>
                <div @click="getCategory"
                    class="flex flex-row items-center px-2 py-1 cursor-pointer bg-gray-50 hover:bg-white hover:text-gray-600 duration-300 mt-6 border-2 border-gray-200 mx-4 mb-4 text-xs text-gray-500">
                    <font-awesome-icon class="" :icon="['fas', 'sitemap']" />
                    <span class="ml-2 select-none">{{ category.name ? category.name : '选择文章分类' }}</span>
                </div>
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'tags']" />
                    <span class="ml-1 select-none">文章标签</span>
                </div>
                <div class="flex flex-col items-center px-4 pb-4 mt-6">
                    <div class="flex flex-wrap items-center justify-start w-full">
                        <div v-for="(item, index) in formParams.topic" :key="index" class="w-3/12 pr-4">
                            <div class="relative my-1.5 flex flex-row text-xs">
                                <input placeholder="请输入标签"
                                    @input="(e) => formParams.topic[index] = (e.target as HTMLTextAreaElement).value"
                                    class="border-2 w-full border-gray-100 py-1.5 pl-2 pr-8 focus:border-pink-400 duration-300 focus-visible:outline-0"
                                    type="text" :value="item" />
                                <font-awesome-icon
                                    @click="formParams.topic.length > 1 ? formParams.topic.splice(index, 1) : ''"
                                    :class="formParams.topic.length > 1 ? 'text-gray-400' : 'text-gray-300 cursor-not-allowed'"
                                    class="absolute right-0 top-0 p-2.5 cursor-pointer active:bg-gray-100 duration-300"
                                    :icon="['fas', 'trash']" />
                            </div>
                        </div>
                    </div>
                    <NuxtGreenBtn :class="formParams.topic.length > 7 ? 'opacity-60 cursor-not-allowed' : ''"
                        class="w-full mt-2" @click="formParams.topic.length > 7 ? '' : formParams.topic.push('')"
                        value="" :icon="['fas', 'plus']"></NuxtGreenBtn>
                </div>
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'cloud-download-alt']" />
                    <span class="ml-1 select-none">下载链接</span>
                </div>
                <div class="flex flex-wrap items-center px-4 pb-4 mt-6">
                    <div v-for="(item, index) in formParams.downloadRelation" :key="index" class="flex flex-row w-full">
                        <div class="w-2/12 pr-2">
                            <NuxtInput class="w-full text-xs" :icon="['fas', 'cloud-download-alt']"
                                v-model:value="item.name" type="text" placeholder="下载名称">
                            </NuxtInput>
                        </div>
                        <div class="w-2/12 pr-2">
                            <NuxtInput class="w-full text-xs" :icon="['fas', 'link']" v-model:value="item.url"
                                type="text" placeholder="下载链接">
                            </NuxtInput>
                        </div>
                        <div class="w-2/12 pr-2">
                            <NuxtInput class="w-full text-xs" :icon="['fas', 'key']" v-model:value="item.extractPwd"
                                type="text" placeholder="提取密码">
                            </NuxtInput>
                        </div>
                        <div class="w-2/12 pr-2">
                            <NuxtInput class="w-full text-xs" :icon="['fas', 'unlock']" v-model:value="item.unpackPwd"
                                type="text" placeholder="解压密码">
                            </NuxtInput>
                        </div>
                        <div class="w-2/12 pr-2 flex flex-row justify-center items-center">
                            <div :class="item.priceType == 'credit' ? 'bg-green-500 text-white' : 'text-gray-500'"
                                @click="item.priceType = 'credit'"
                                class="text-xs w-6/12 h-8 flex justify-center items-center border-2 border-gray-100 py-1.5 cursor-pointer select-none hover:bg-green-600 duration-300 active:bg-green-500 hover:text-white">
                                积分
                            </div>
                            <div :class="item.priceType == 'cash' ? 'bg-green-500 text-white' : 'text-gray-500'"
                                @click="item.priceType = 'cash'"
                                class="text-xs w-6/12 h-8 flex justify-center items-center border-2 border-gray-100 py-1.5 cursor-pointer select-none hover:bg-green-600 duration-300 active:bg-green-500 hover:text-white">
                                金币
                            </div>
                        </div>
                        <div class="w-2/12 pr-2">
                            <NuxtInput class="text-xs" :icon="['fas', 'cloud-download-alt']" v-model:value="item.price"
                                type="number" placeholder="下载所需">
                            </NuxtInput>
                        </div>
                        <div class="w-2/12 flex flex-row items-center">
                            <div @click="formParams.downloadRelation.length > 5 ? '' : formParams.downloadRelation.push({ name: '', url: '', extractPwd: '', unpackPwd: '', priceType: 'credit', price: 0 })"
                                :class="formParams.downloadRelation.length > 5 ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
                                class="w-full h-8 flex justify-center items-center select-none py-1 hover:bg-green-600 duration-300 active:bg-green-500 bg-green-500 border-2 border-green-600 text-xs text-white text-center">
                                <font-awesome-icon :icon="['fas', 'add']" />
                            </div>
                            <div @click="formParams.downloadRelation.length < 2 ? '' : formParams.downloadRelation.splice(index, 1)"
                                :class="formParams.downloadRelation.length < 2 ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
                                class="w-full h-8 flex justify-center items-center select-none py-1 cursor-pointer hover:bg-red-600 duration-300 active:bg-red-500 bg-red-500 border-2 border-red-600 text-xs text-white text-center">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'truck']" />
                    <span class="ml-1 select-none">作品来源</span>
                </div>
                <div class="flex flex-row items-center px-4 pb-4 mt-6">
                    <div :class="formParams.from == 'original' ? 'bg-green-500 text-white' : 'text-gray-500'"
                        @click="formParams.from = 'original'"
                        class="text-xs w-1/2 flex justify-center items-center border-2 border-gray-100 py-1.5 cursor-pointer select-none hover:bg-green-600 duration-300 active:bg-green-500 hover:text-white">
                        原创
                    </div>
                    <div :class="formParams.from == 'reprinted' ? 'bg-green-500 text-white' : 'text-gray-500'"
                        @click="formParams.from = 'reprinted'"
                        class="text-xs w-1/2 flex justify-center items-center border-2 border-gray-100 py-1.5 cursor-pointer select-none hover:bg-green-600 duration-300 active:bg-green-500 hover:text-white">
                        转载
                    </div>
                </div>
            </div>
            <div class="w-full mt-5 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'truck']" />
                    <span class="ml-1 select-none">发布状态</span>
                </div>
                <div class="flex flex-row items-center px-4 pb-4 mt-6">
                    <div :class="formParams.status == 'pending' ? 'bg-green-500 text-white' : 'text-gray-500'"
                        @click="formParams.status = 'pending'"
                        class="text-xs w-1/2 flex justify-center items-center border-2 border-gray-100 py-1.5 cursor-pointer select-none hover:bg-green-600 duration-300 active:bg-green-500 hover:text-white">
                        提交审核
                    </div>
                    <div :class="formParams.status == 'published' ? 'bg-green-500 text-white' : 'text-gray-500'"
                        @click="formParams.status = 'draft'"
                        class="text-xs w-1/2 flex justify-center items-center border-2 border-gray-100 py-1.5 cursor-pointer select-none hover:bg-green-600 duration-300 active:bg-green-500 hover:text-white">
                        保存草稿
                    </div>
                </div>
            </div>
            <NuxtGreenBtn @click="publishPost" class="w-full mt-2" value="发布文章" :icon="['fas', 'check']"></NuxtGreenBtn>
        </form>
        <div v-show="isShow" :class="showAnimate ? 'animate-fadeIn30' : 'animate-fadeOut30'"
            class="z-20 fixed top-0 bottom-0 left-0 ring-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-50">
            <div @click="hide" class="fixed top-0 bottom-0 left-0 ring-0 w-full h-full"></div>
            <div :class="showAnimate ? 'animate-zoomInUp30' : 'animate-zoomOutDown30'"
                class="fixed top-0 bottom-0 left-0 ring-0 flex justify-center items-center h-full w-full pointer-events-none">
                <div class="w-4/12 bg-gray-50 pointer-events-auto flex flex-col rounded-md overflow-hidden p-4">
                    <div v-for="(item, index) in categoryList" :key="index"
                        class="flex flex-row w-full hover:bg-gray-200 duration-300">
                        <div @click="chooseCategory(item)"
                            class="w-3/12 select-none text-xs text-gray-800 py-2 px-2 hover:bg-pink-400 hover:text-white my-2 text-left duration-300 cursor-pointer">
                            {{ item.name }}</div>
                        <div class="w-9/12 flex text-xs text-center justify-center items-center ">
                            <div v-for="(childItem, index) in item.children" :key="index"
                                class="flex-1 select-none text-gray-500 cursor-pointer hover:text-white hover:bg-pink-400 duration-300 py-2">
                                {{ childItem.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Message ref="message"></Message>
    </NuxtLayout>
</template>
<script lang="ts">
import { CATEGORYLIST, DELETEIMG, GETIMGLIST, PUBLISHPOST, UPLOADIMG } from "~~/config/api"
import { useAuth } from "~~/store/auth"
import { CategoryList, ImgList } from "~~/types/response"
import { fileToBase64 } from "~~/utils/utils"

export default defineComponent({
    setup() {
        const categoryList = ref<any>()
        const wangEditor = ref()
        const message = ref()
        const formPublish = ref()
        const auth = useAuth()
        const route = useRouter()
        const category = ref<any>({
            name: '',
            slug: ''
        })
        const defaultValueRef = () => ({
            postId: "",
            title: "",
            exerpt: "",
            content: "hello",
            category: "",
            author: auth.userId,
            cover: "",
            postImg: [],
            type: "post",
            view: 0,
            videoRelation: [
                {
                    name: "",
                    url: "",
                    subtitles: ""
                }
            ],
            musicRelation: [
                {
                    name: "",
                    url: "",
                }
            ],
            from: "original",
            downloadRelation: [
                {
                    name: "",
                    url: "",
                    extractPwd: "",
                    unpackPwd: "",
                    priceType: "credit",
                    price: 0,
                }
            ],
            status: "pending",
            topic: [] as string[],
            commentStatus: true
        });
        const state = reactive({
            cover: [] as string[],
            topic: [] as string[],
            formParams: defaultValueRef(),
        })

        const isShow = ref<boolean>(false)
        const runtimeConfig = useRuntimeConfig()
        const showAnimate = ref<boolean>(false)
        function show() {
            isShow.value = true
            showAnimate.value = true
        }
        function hide() {
            showAnimate.value = false
            setTimeout(() => {
                isShow.value = false
            }, 300)
        }

        async function getCategory() {
            const categoryListContent = await useCustomFetch<CategoryList>(CATEGORYLIST, {
                method: 'GET',
                params: {
                    page: 1,
                    pageSize: 999,
                }
            })
            categoryList.value = categoryListContent.result.value.list
            show()
        }

        async function getImgList() {
            const imgListContent = await useCustomFetch<ImgList>(GETIMGLIST, {
                method: 'GET',
                params: {
                    type: 'post_temporary',
                    page: 1,
                    pageSize: 999,
                },
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                }
            })
            state.formParams.postImg = imgListContent.result.value ? imgListContent.result.value.list : []
        }

        onMounted(() => {
            getImgList()
        })

        function chooseCategory(item: { slug: any; name: any }) {
            hide()
            category.value.slug = item.slug
            category.value.name = item.name
            state.formParams.category = item.slug
        }

        async function uploadPostImg(event: any) {
            var files = event.target.files[0]        //获取文件
            const imgBase64 = await fileToBase64(files)
            const { result, code, message: msg } = await useCustomFetch<any>(UPLOADIMG, {
                method: 'POST',
                body: {
                    'file': imgBase64,
                    'fileName': files.name,
                    'uuid': auth.userId,
                    'type': 'post_temporary',
                },
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                }
            })
            if (code === 200) {
                state.formParams.postImg.push(result.value.file)
                if (state.formParams.cover.length === 0) {
                    state.formParams.cover = state.formParams.postImg[0].url
                }
                message.value.show('上传成功', {
                    type: 'success',
                })
            } else {
                message.value.show(msg || '上传失败', {
                    type: 'warning',
                })
            }
            event.target.value = ''
        }

        function insertPostImg(img: any) {
            wangEditor.value.insertCover(runtimeConfig.public.assetsUrl + img.url);
        }

        async function deletePostImg(index: any) {
            const { code, message: msg } = await useCustomFetch<any>(DELETEIMG, {
                method: 'POST',
                body: {
                    'url': state.formParams.postImg[index].url
                },
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                }
            })
            if (code === 200) {
                if (state.formParams.postImg[index].url === state.formParams.cover) {
                    state.formParams.cover = state.formParams.postImg[0].url
                }
                state.formParams.postImg.splice(index, 1);
                message.value.show('删除成功', {
                    type: 'success',
                })
            } else {
                message.value.show(msg || '删除失败', {
                    type: 'warning',
                })
            }
        }

        async function publishPost() {
            if (formPublish.value.reportValidity()) {
                const { code, message: msg } = await useCustomFetch<any>(PUBLISHPOST, {
                    method: 'POST',
                    body: state.formParams,
                    headers: {
                        'Authorization': 'Bearer ' + auth.token,
                    }
                })
                if (code === 200) {
                    message.value.show('发布成功', {
                        type: 'success',
                    })
                    setTimeout(() => {
                        route.push('/?t=' + Date.parse(new Date().toString()))
                    }, 3000)
                } else {
                    message.value.show(msg || '发布失败', {
                        type: 'warning',
                    })
                }
            }
        }

        return {
            category,
            categoryList,
            runtimeConfig,
            wangEditor,
            message,
            ...toRefs(state),
            getCategory,
            publishPost,
            chooseCategory,
            show,
            hide,
            uploadPostImg,
            insertPostImg,
            deletePostImg,
            formPublish,
            showAnimate,
            isShow,
        }
    }
})
</script>