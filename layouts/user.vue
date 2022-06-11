<template>
  <div class="bg-slate-100 font-sans">
    <Header />
    <div class="flex flex-row mb-2 lg:w-3/4 xl:w-6/12 m-auto mt-4">
      <div class="w-2/12 flex flex-col bg-white py-4 rounded-md shadow-sm">
        <div v-for="(item, index) in setting" :key="index">
          <div
            class="text-xs text-gray-400 flex justify-start items-center px-3 py-1.5 cursor-pointer hover:bg-pink-50 hover:text-pink-400 duration-300">
            <font-awesome-icon class="p-1.5 rounded-full bg-gray-300" :icon="[item.iconType, item.icon]" />
            <span class="pl-2">{{ item.name }}</span>
          </div>
          <div v-for="(childItem, index) in item.children" :key="index">
            <div v-if="childItem.func" @click="childItem.func()"
              class="text-xs text-gray-400 flex justify-start items-center px-3 py-1 cursor-pointer hover:bg-pink-50 hover:text-pink-400 duration-300">
              <font-awesome-icon class="p-1.5" :icon="[childItem.iconType, childItem.icon]" />
              <span class="pl-2">{{ childItem.name }}</span>
            </div>
            <NuxtLink :to="childItem.url" v-else>
              <div
                :class="route.currentRoute.value.fullPath == childItem.url ? 'bg-pink-50 text-pink-400 border-l-2 border-pink-400' : ''"
                class="text-xs group text-gray-500 flex justify-start items-center px-3 py-1 cursor-pointer hover:bg-pink-50 hover:text-pink-400 duration-300">
                <font-awesome-icon class="p-1.5 group-hover:text-pink-400"
                  :class="route.currentRoute.value.fullPath == childItem.url ? 'text-pink-400' : 'text-gray-300'"
                  :icon="[childItem.iconType, childItem.icon]" />
                <span class="pl-2">{{ childItem.name }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="w-10/12">
        <slot />
      </div>
      <Message ref="message"></Message>
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">import { useAuth } from "~~/store/auth"

export default defineComponent({
  setup() {
    const auth = useAuth()
    const message = ref()
    const route = useRouter()
    const setting = ref<any>([
      {
        icon: 'paint-brush',
        iconType: 'fas',
        name: '文章管理',
        children: [
          {
            icon: 'paint-brush',
            iconType: 'fas',
            name: '资源投稿',
            url: '/user-center/publish',
            func: null
          },
          {
            icon: 'copy',
            iconType: 'fas',
            name: '我的帖子',
            url: '/user-center/posts',
            func: null
          },
          {
            icon: 'heart',
            iconType: 'fas',
            name: '收藏夹',
            url: '/user-center/stars',
            func: null
          },
          {
            icon: 'comments',
            iconType: 'fas',
            name: '我的吐槽',
            url: '/user-center/comments',
            func: null
          },
        ]
      },
      {
        icon: 'bell',
        iconType: 'fas',
        name: '消息管理',
        children: [
          {
            icon: 'history',
            iconType: 'fas',
            name: '消费记录',
            url: '/user-center/record',
            func: null
          },
          {
            icon: 'bell',
            iconType: 'fas',
            name: '我的提醒',
            url: '/user-center/notice',
            func: null
          },
          {
            icon: 'envelope',
            iconType: 'fas',
            name: '即时通讯',
            url: '/user-center/im',
            func: null
          },
        ]
      },
      {
        icon: 'circle-notch',
        iconType: 'fas',
        name: '我的圈子',
        children: [
          {
            icon: 'circle',
            iconType: 'fas',
            name: '我的首页',
            url: '/user-center/home',
            func: null
          },
          {
            icon: 'users',
            iconType: 'fas',
            name: '我的关注',
            url: '/user-center/follow',
            func: null
          },
          {
            icon: 'users',
            iconType: 'fas',
            name: '我的粉丝',
            url: '/user-center/fans',
            func: null
          },
        ]
      },
      {
        icon: 'gamepad',
        iconType: 'fas',
        name: '游戏中心',
        children: [
          {
            icon: 'bookmark',
            iconType: 'fas',
            name: '我的荣誉',
            url: '/user-center/medal',
            func: null
          },
          {
            icon: 'gift',
            iconType: 'fas',
            name: '抽奖',
            url: '/user-center/lottery',
            func: null
          },
          {
            icon: 'gift',
            iconType: 'fas',
            name: '商城',
            url: '/user-center/shop',
            func: null
          },
        ]
      },
      {
        icon: 'address-card',
        iconType: 'fas',
        name: '个人设置',
        children: [
          {
            icon: 'address-card',
            iconType: 'fas',
            name: '我的会员',
            url: '/user-center/vip',
            func: null
          },
          {
            icon: 'cog',
            iconType: 'fas',
            name: '我的设置',
            url: '/user-center/settings',
            func: null
          },
          {
            icon: 'power-off',
            iconType: 'fas',
            name: '退出登陆',
            url: '/user-center/publish',
            func: () => logout()
          },
        ]
      },
    ])

    console.log()

    async function logout() {
      const { code } = await auth.logout()
      if (code == 200) {
        message.value.show('退出登陆成功', {
          type: 'success',
        })
        setTimeout(() => {
          route.push('/?t=' + Date.parse(new Date().toString()))
        }, 3000)
      } else {
        message.value.show('退出登陆失败', {
          type: 'warning',
        })
      }
    }

    return {
      setting,
      message,
      route
    }
  }
})
</script>