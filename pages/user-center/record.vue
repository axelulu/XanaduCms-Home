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
                <div class="flex flex-wrap items-center px-4 pb-4">
                    <div v-for="(item, index) in 6" :key="index"
                        class="flex justify-between items-center text-xs w-full text-gray-500 py-2 px-2 duration-300 cursor-pointer hover:bg-pink-100">
                        <div class="flex flex-row justify-center items-center">
                            <div class="text-xl text-green-600">-50</div>
                            <font-awesome-icon class="text-xl px-4" :icon="['fas', 'user']" />
                            <div>您修改了您的个人资料。</div>
                        </div>
                        <div>大约 2 年</div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script>
</script>