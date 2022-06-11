<template>
    <div class="relative">
        <div class="bg-white w-full mt-10 flex justify-center">
            <div class="lg:w-4/5 xl:w-6/12">
                <div class="flex flex-row">
                    <div class="w-1/4 pr-8">
                        <div class="text-xs text-gray-500 mt-6">快速导航</div>
                        <ul class="text-xs text-gray-500 mt-2">
                            <li v-for="(item, index) in settings.footer.friendsLinks" :key="index" class="pt-1 pb-0.5">
                                <a :href="item.url"
                                    class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">{{
                                            item.name
                                    }}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="w-1/4 pr-8">
                        <div class="text-xs text-gray-500 mt-6">网站申明</div>
                        <div class="text-xs text-gray-500 mt-2">{{ settings.footer.notice }}</div>
                    </div>
                    <div class="w-1/4 pr-8">
                        <div class="text-xs text-gray-500 mt-6">联系我们</div>
                        <div class="text-xs text-gray-500 mt-2">{{ settings.footer.contact }}</div>
                    </div>
                    <div class="w-1/4 pr-8">
                        <div class="text-xs text-gray-500 mt-6">关于小站</div>
                        <div class="text-xs text-gray-500 mt-2">
                            {{ settings.footer.about }}
                        </div>
                    </div>
                </div>
                <div class="mb-8">
                    <div class="text-xs text-gray-500 mt-2">
                        <font-awesome-icon icon="link" />
                        <span class="ml-1 text-gray-500">友情链接</span>
                    </div>
                    <ul class="text-xs text-gray-500 mt-2 flex flex-row">
                        <li v-for="(item, index) in settings.footer.friendsLinks" :key="index" class="pr-1">
                            <a :href="item.url"
                                class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">{{
                                        item.name
                                }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="h-14 text-gray-500 items-center text-xs justify-center flex underline">
            © XanaduCms 2022
        </div>
        <div
            class="fixed bottom-0 w-full h-9 shadow-scollTop bg-opacity-75 backdrop-blur-sm bg-white flex justify-center">
            <div @click="scollTop"
                class="w-3/4 flex justify-center items-center text-xs text-gray-500 cursor-pointer hover:bg-pink-400 hover:text-white duration-300">
                <font-awesome-icon :icon="['fas', 'arrow-up']" />
                <span class="ml-1">返回顶部</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
// 返回顶部
export default defineComponent({
    setup() {
        const settings = useSettings()
        function scollTop() {
            //  设置一个定时器
            const upRoll = setInterval(() => {
                const top = document.documentElement.scrollTop // 每次获取页面被卷去的部分
                const speed = top / 10 // 每次滚动多少 （步长值）
                if (document.documentElement.scrollTop !== 0) {
                    document.documentElement.scrollTop -= speed // 不在顶部 每次滚动到的位置
                } else {
                    clearInterval(upRoll) // 回到顶部清除定时器
                }
            }, 20)
        }
        return {
            scollTop,
            settings
        }
    }
})
</script>