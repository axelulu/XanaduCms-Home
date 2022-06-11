<template>
    <div class="h-44 bg-blue-400 w-full flex justify-end items-center flex-col bg-cover"
        style="background-image: url(https://www.tietieacg.com/wp-content/uploads/2021/02/11fb1bd5b339650a423706a5c1985a12.png);">
        <div class="w-full">
            <div class="mb-6 w-3/4 m-auto">
                <NuxtLink to="/">
                    <img class="hover:animate-swing30 object-cover"
                        v-lazy="'https://static.acgso1.com/uploads/2017/08/e0a92e544bacbd3e50ee075667361da5.png'"
                        alt="">
                </NuxtLink>
            </div>
            <div
                :class="data.fixed == true ? 'fixed z-10 top-0 backdrop-blur-sm w-full left-0 bg-white shadow-menuFixed bg-opacity-30 rounded-t-md overflow-hidden' : ''">
                <div :class="data.fixed == true ? '' : 'bg-white bg-opacity-30 rounded-t-md overflow-hidden shadow-menu  backdrop-blur-sm'"
                    class="flex justify-between w-3/4 m-auto">
                    <ul class="flex flex-row justify-start">
                        <NuxtLink to="/"
                            class="h-14 pr-3 pl-3 flex justify-center items-center cursor-pointer text-sm hover:bg-black hover:bg-opacity-10 duration-300">
                            <div class="flex flex-col">
                                <div
                                    class="bg-white bg-opacity-40 rounded-full w-6 h-6 flex justify-center items-center text-shadow-bg-white">
                                    <font-awesome-icon icon="home" />
                                </div>
                            </div>
                        </NuxtLink>
                        <NuxtLink v-for="(k, v) in 8" :to="'/category/' + k" :key="v"
                            class="h-14 pr-3 pl-3 flex justify-center items-center cursor-pointer text-xs hover:bg-black hover:bg-opacity-10 duration-300">
                            <div class="flex flex-col">
                                <div
                                    class="bg-white bg-opacity-40 rounded-full w-6 h-6 flex justify-center items-center text-shadow-bg-white">
                                    <font-awesome-icon icon="image" />
                                </div>
                                <div class="text-shadow-bg-white">菜单</div>
                            </div>
                        </NuxtLink>
                    </ul>
                    <div class="flex flex-row">
                        <div @click="showLoginDialog"
                            class="flex justify-center items-center px-3 cursor-pointer bg-pink-400 text-white text-sm hover:bg-black hover:bg-opacity-10 duration-300">
                            登陆
                        </div>
                        <div
                            class="flex justify-center items-center px-2 cursor-pointer text-shadow-bg-white hover:bg-black hover:bg-opacity-10 duration-300">
                            <font-awesome-icon class="text-2xl" :icon="['fas', 'search']" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Login ref="login" type="login"></Login>
    </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, watchEffect, onUnmounted } from 'vue'

export default defineComponent({
    setup() {
        const login = ref()
        // 列表HTMLElementDom
        const data = reactive<any>({
            // 列表第一项的高度（起始高度）
            initH: 176 - 56,
            // 是否固定
            fixed: false,
        })
        function showLoginDialog() {
            login.value.showLoginDialog()
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
            data,
            login,
            showLoginDialog,
        }
    }
})

</script>
<style>
.text-shadow-bg-white {
    text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 10px #fff
}
</style>