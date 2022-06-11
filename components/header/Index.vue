<template>
  <div class="h-44 bg-blue-400 w-full flex justify-end items-center flex-col bg-cover"
    :style="'background-image: url(' + runtimeConfig.public.assetsUrl + settings.basic.background[0] + ');'">
    <div class="w-full z-10">
      <div class="mb-2 lg:w-3/4 xl:w-6/12 m-auto mt-4 animate-fadeIn30">
        <div class="w-52 h-24">
          <NuxtLink to="/">
            <img class="hover:animate-swing30 object-cover" v-lazy="runtimeConfig.public.assetsUrl + settings.basic.logo[0]" alt="">
          </NuxtLink>
        </div>
      </div>
      <div
        :class="data.fixed == true ? 'fixed z-10 top-0 backdrop-blur-sm w-full left-0 bg-white shadow-menuFixed bg-opacity-30 rounded-t-md' : ''">
        <div :class="data.fixed == true ? '' : 'bg-white bg-opacity-30 rounded-t-md shadow-menu  backdrop-blur-sm'"
          class="flex justify-between lg:w-3/4 xl:w-6/12 m-auto">
          <ul class="flex flex-row justify-start animate-fadeIn30">
            <NuxtLink to="/"
              class="h-14 pr-3 pl-3 flex justify-center items-center cursor-pointer text-sm hover:bg-black hover:bg-opacity-10 duration-300">
              <div class="flex flex-col">
                <div
                  class="bg-white bg-opacity-40 rounded-full w-6 h-6 flex justify-center items-center text-shadow-bg-white">
                  <font-awesome-icon icon="home" />
                </div>
              </div>
            </NuxtLink>
            <li v-for="(category, v) in categoryList.list" :key="v" class="relative group">
              <NuxtLink :to="'/category/' + category.slug"
                class="flex-col h-14 pr-3 pl-3 flex justify-center items-center cursor-pointer text-xs hover:bg-black hover:bg-opacity-10 duration-300">
                <div
                  class="bg-white bg-opacity-40 rounded-full w-6 h-6 flex justify-center items-center text-shadow-bg-white">
                  <font-awesome-icon :icon="[category.iconType, category.icon]" />
                </div>
                <div class="text-shadow-bg-white">{{ category.name }}</div>
              </NuxtLink>
              <ul
                class="group-hover:flex flex-col pt-3 pb-3 bg-white absolute top-full left-0 hidden shadow-xl animate-fadeIn30 hover:flex">
                <li v-for="(item, index) in category.children" :key="index"
                  class="flex flex-row childCategory text-xs relative">
                  <NuxtLink :to="'/category/' + item.slug"
                    class="px-4 py-2 w-32 hover:bg-pink-400 hover:text-white cursor-pointer duration-300">
                    <font-awesome-icon :icon="[item.iconType, item.icon]" />
                    <span class="ml-1">{{ item.name }}</span>
                  </NuxtLink>
                  <ul
                    class="flex-col childrenCategory hidden pt-3 pb-3 bg-white absolute left-32 -top-2 shadow-xl animate-fadeIn30 hover:flex">
                    <li v-for="(i, index) in item.children" :key="index" class="flex flex-row text-xs">
                      <NuxtLink :to="'/category/' + i.slug"
                        class="px-4 py-2 w-32 hover:bg-pink-400 hover:text-white cursor-pointer duration-300">
                        <font-awesome-icon :icon="[i.iconType, i.icon]" />
                        <span class="ml-1">{{ i.name }}</span>
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <div class="flex flex-row">
            <div v-if="!auth || !auth.isLoggedIn" @click="showLoginDialog"
              class="flex select-none justify-center items-center px-3 cursor-pointer bg-pink-400 text-white text-sm hover:bg-black hover:bg-opacity-10 duration-300">
              登陆
            </div>
            <div v-else class="flex flex-row">
              <div
                class="text-xs hover:animate-jello100 flex justify-center items-center w-16 px-3 bg-pink-400 text-white cursor-pointer select-none">
                <font-awesome-icon :icon="['fas', 'map-marker']" />
                <span class="ml-1 font-normal">签到</span>
              </div>
              <div class="relative userMenu h-full w-14">
                <div class="flex justify-center items-center px-2 h-full cursor-pointer">
                  <img v-if="auth && auth.avatar"
                    class="hover:animate-fadeIn30 h-10 w-10 rounded-full z-10 object-cover"
                    v-lazy="runtimeConfig.public.assetsUrl + auth.avatar" alt="">
                </div>
                <div class="userMenuList duration-300 flex-col">
                  <div class="h-14 flex justify-center items-center bg-pink-400 text-xs text-white">
                    <div
                      class="hover:bg-pink-300 cursor-pointer flex justify-center items-center h-full px-4 duration-300">
                      <font-awesome-icon :icon="['fas', 'paw']" />
                      <span class="ml-1 font-normal">积分: 0</span>
                    </div>
                  </div>
                  <div class="flex flex-row-reverse">
                    <div v-for="(item, index) in setting" :key="index"
                      class="flex flex-col border-r border-gray-100 my-3 group hover:text-pink-400 text-gray-500">
                      <div class="flex flex-col justify-center items-center duration-300">
                        <font-awesome-icon
                          class="text-xs p-1.5 rounded-full group-hover:bg-pink-400 duration-300 bg-gray-500 text-white"
                          :icon="[item.iconType, item.icon]" />
                        <div class="py-2 text-xs">{{ item.name }}</div>
                      </div>
                      <div v-for="(childitem, index) in item.children" :key="index">
                        <div v-if="childitem.func" @click="childitem.func()"
                          class="text-xs text-gray-500 px-2 py-2 cursor-pointer hover:bg-pink-400 w-24 text-center hover:text-white duration-300">
                          <font-awesome-icon :icon="[childitem.iconType, childitem.icon]" />
                          <span class="ml-1">{{ childitem.name }}</span>
                        </div>
                        <NuxtLink :to="childitem.url" v-else>
                          <div
                            class="text-xs text-gray-500 px-2 py-2 cursor-pointer hover:bg-pink-400 w-24 text-center hover:text-white duration-300">
                            <font-awesome-icon :icon="[childitem.iconType, childitem.icon]" />
                            <span class="ml-1">{{ childitem.name }}</span>
                          </div>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div @click="showSearchDialog"
              class="flex justify-center items-center px-2.5 cursor-pointer text-shadow-bg-white hover:bg-black hover:bg-opacity-10 duration-300">
              <font-awesome-icon class="text-2xl" :icon="['fas', 'search']" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Login ref="login" type="login"></Login>
    <Search ref="search"></Search>
    <Message ref="message"></Message>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, watchEffect, onUnmounted } from 'vue'
import { CATEGORYLIST } from '~~/config/api'
import { useAuth } from '~~/store/auth'
import { CategoryList } from '~~/types/response'

export default defineComponent({
  async setup() {
    const auth = useAuth()
    const message = ref()
    const route = useRouter()
    const settings = useSettings()
    const runtimeConfig = useRuntimeConfig()
    const login = ref()
    const search = ref()
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

    // 列表HTMLElementDom
    const data = reactive<any>({
      // 列表第一项的高度（起始高度）
      initH: 176 - 56,
      // 是否固定
      fixed: false,
    })

    const categoryListContent = await useCustomFetch<CategoryList>(CATEGORYLIST, {
      method: 'GET',
      params: {
        page: 1,
        pageSize: 999,
      }
    })
    const categoryList = computed(() => categoryListContent.result.value)

    async function logout() {
      const { code, message: msg } = await auth.logout()
      if (code == 200) {
        message.value.show('退出登陆成功', {
          type: 'success',
        })
        setTimeout(() => {
          route.push('/?t=' + Date.parse(new Date().toString()))
        }, 3000)
      } else {
        message.value.show(msg || '退出登陆失败', {
          type: 'warning',
        })
      }
    }

    function showLoginDialog() {
      login.value.show()
    }

    function showSearchDialog() {
      search.value.showSearchDialog()
    }

    function scrollHandler() {
      // 当前滚动高度
      const curScrollTop = document.documentElement.scrollTop
      if (curScrollTop > data.initH) {
        data.fixed = true
      } else {
        data.fixed = false
      }
    }

    watchEffect(() => {
      nextTick(() => {
        if (typeof window !== "undefined") {
          window.removeEventListener('scroll', scrollHandler)
          window.addEventListener('scroll', scrollHandler)
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
    return {
      message,
      data,
      auth,
      login,
      search,
      settings,
      setting,
      runtimeConfig,
      categoryList,
      showLoginDialog,
      showSearchDialog,
    }
  }
})

</script>
<style>
.text-shadow-bg-white {
  text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 10px #fff
}

.childCategory:hover .childrenCategory {
  display: flex;
}

.userMenu:hover .userMenuList {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.userMenuList {
  display: flex;
  background: hsla(0, 0%, 100%, .95);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  position: absolute;
  top: 0;
  right: 0;
  -webkit-box-shadow: 0 15px 30px 5px rgb(0 0 0 / 15%);
  box-shadow: 0 15px 30px 5px rgb(0 0 0 / 15%);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-transform: scale3d(.7, .5, 1);
  transform: scale3d(.7, .5, 1);
  -webkit-transform-origin: top right;
  -ms-transform-origin: top right;
  transform-origin: top right;
  z-index: 1;
}
</style>