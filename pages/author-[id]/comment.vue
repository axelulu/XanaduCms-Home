<template>
  <NuxtLayout name="index">
    <div class="flex flex-col lg:w-3/4 xl:w-6/12 m-auto">
      <div class="flex justify-center items-center mt-4">
        <img class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          v-lazy="runtimeConfig.public.assetsUrl + userInfo.avatar" alt="">
        <span class="text-xl text-gray-500 mx-2">{{ userInfo.nickName }}</span>
        <span class="text-xs px-1.5 py-1 text-white bg-yellow-500">{{
            userInfo.authority.authorityName
        }}</span>
      </div>
      <div class="flex justify-center items-center mt-4">
        <a class="bg-green-500 py-1 px-4 cursor-pointer text-xs text-white border-2 border-green-600">
          <font-awesome-icon class="mr-1" :icon="['fas', 'add']" />
          <span>加关注</span>
        </a>
        <a class="bg-white-500 py-1 px-4 cursor-pointer text-xs text-gray-400 border-2 border-gray-200">
          <font-awesome-icon class="mr-1" :icon="['fas', 'envelope']" />
          <span>站内信</span>
        </a>
      </div>
      <div class="mt-4">
        <div class="bg-white opacity-95 px-3 flex flex-row rounded-md justify-around shadow-sm">
          <NuxtLink :to="item.url" v-for="(item, index) in menu" :key="index"
            :class="currentMenu === item.value ? 'border-pink-400 ' : ''"
            class="px-16 border-b-2 w-full flex justify-center items-center py-2.5 cursor-pointer text-gray-500 hover:bg-pink-400 hover:text-white duration-300">
            <font-awesome-icon class="text-xs" :icon="item.icon" />
            <span class="ml-1 text-xs">{{ item.name }}</span>
          </NuxtLink>
        </div>
        <AuthorComment></AuthorComment>
      </div>
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { USERINFO } from '~~/config/api';
import { userMeta } from '~~/types/response';

const runtimeConfig = useRuntimeConfig()
const currentMenu = computed(() => route.path.split("/")[2] ? route.path.split("/")[2] : 'userInfo')

const route = useRoute()
const { result } = await useCustomFetch<userMeta>(USERINFO, {
  method: 'GET',
  params: {
    uuid: route.params.id,
  }
})
const userInfo = computed(() => result.value)

const menu = [
  {
    icon: ['fas', 'address-card'],
    value: 'userInfo',
    url: '/author-' + userInfo.value.uuid + '/userInfo',
    name: '总览'
  },
  {
    icon: ['fas', 'paint-brush'],
    value: 'post',
    url: '/author-' + userInfo.value.uuid + '/post',
    name: '帖子'
  },
  {
    icon: ['fas', 'user-plus'],
    value: 'follow',
    url: '/author-' + userInfo.value.uuid + '/follow',
    name: '关注'
  },
  {
    icon: ['fas', 'users'],
    value: 'fans',
    url: '/author-' + userInfo.value.uuid + '/fans',
    name: '粉丝'
  },
  {
    icon: ['fas', 'comments'],
    value: 'comment',
    url: '/author-' + userInfo.value.uuid + '/comment',
    name: '评论'
  }
]

const settings = useSettings()
useHead({
  title: `${userInfo.value.nickName} - ${settings.value.basic.desc}`,
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