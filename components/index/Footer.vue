<template>
    <div class="relative">
        <div class="bg-white w-full mt-10 flex justify-center">
            <div class="w-4/5">
                <div class="flex flex-row">
                    <div class="w-1/4 pr-8">
                        <div class="text-xs text-gray-500 mt-6">快速导航</div>
                        <ul class="text-xs text-gray-500 mt-2">
                            <li class="pt-1 pb-0.5">
                                <a
                                    class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">首页</a>
                            </li>
                            <li class="pt-1 pb-0.5">
                                <a
                                    class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">关于我们</a>
                            </li>
                            <li class="pt-1 pb-0.5">
                                <a
                                    class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">联系我们</a>
                            </li>
                            <li class="pt-1 pb-0.5">
                                <a
                                    class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">加群</a>
                            </li>
                        </ul>
                    </div>
                    <div class="w-1/4 pr-8">
                        <div class="text-xs text-gray-500 mt-6">热门标签</div>
                        <div class="text-xs text-gray-500 mt-2">如果您有任何版权疑问，或广告合作，请发 站内私信
                            或者发送电子邮件（AbramMcRae12892@gmail.com）联系我。</div>
                    </div>
                    <div class="w-1/4 pr-8">
                        <div class="text-xs text-gray-500 mt-6">联系我们</div>
                        <div class="text-xs text-gray-500 mt-2">如果您有任何版权疑问，或广告合作，请发 站内私信
                            或者发送电子邮件（AbramMcRae12892@gmail.com）联系我。</div>
                    </div>
                    <div class="w-1/4 pr-8">
                        <div class="text-xs text-gray-500 mt-6">关于小站</div>
                        <div class="text-xs text-gray-500 mt-2">
                            <p>ACG 调查小队资源站始于 2012 年夏，为建设精品二次元资源库而努力。</p>
                            <p>无门槛下载是我们的坚持，希望在这里你能最快的找到需要的资源。</p>
                            <p>队员们以分享优质资源为己任，搜集来自全球的动漫资源，精心筛选过的资源总有你需要的。</p>
                            <p>来加入我们，说出你的故事，分享二次元的快乐吧！</p>
                        </div>
                    </div>
                </div>
                <div class="mb-8">
                    <div class="text-xs text-gray-500 mt-2">
                        <font-awesome-icon icon="link" />
                        <span class="ml-1 text-gray-500">友情链接</span>
                    </div>
                    <ul class="text-xs text-gray-500 mt-2 flex flex-row">
                        <li class="pr-1">
                            <a
                                class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">首页</a>
                        </li>
                        <li class="pr-1">
                            <a
                                class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">关于我们</a>
                        </li>
                        <li class="pr-1">
                            <a
                                class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">联系我们</a>
                        </li>
                        <li class="pr-1">
                            <a
                                class="text-xs text-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer p-1">加群</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="h-14 text-gray-500 items-center text-xs justify-center flex underline">
            © XanaduCms 2022
        </div>
        <div class="fixed bottom-0 w-full h-9 shadow-scollTop bg-opacity-75 backdrop-blur-sm bg-white flex justify-center">
            <div @click="scollTop" class="w-3/4 flex justify-center items-center text-xs text-gray-500 cursor-pointer hover:bg-pink-400 hover:text-white duration-300">
                <font-awesome-icon :icon="['fas', 'arrow-up']" />
                <span class="ml-1">返回顶部</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
// 返回顶部
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
</script>