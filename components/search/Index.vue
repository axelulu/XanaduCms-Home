<template>
    <Dialog ref="dialog">
        <div class="fixed top-12 left-0 ring-0 flex justify-center w-full pointer-events-none">
            <div class="w-3/6 pointer-events-auto flex flex-col rounded-md overflow-hidden">
                <div class="text-center text-white text-xl p-2">搜索</div>
                <input @keyup.enter="jumpTo(keyword)" v-model="keyword" type="text" placeholder="请输入关键词"
                    class="border-b-4 p-2 placeholder:text-lg focus:border-pink-400 duration-300 focus-visible:outline-0 placeholder:text-white text-white text-center text-lg border-gray-200 bg-transparent">
                <div class="flex flex-wrap my-2 justify-center">
                    <span v-for="(item, index) in 13" :key="index" @click="jumpTo('12')"
                        class="py-1.5 px-4 cursor-pointer hover:bg-pink-400 hover:text-white duration-300 bg-gray-200 text-xs m-1.5">关键词一</span>
                </div>
            </div>
        </div>
    </Dialog>
</template>
<script lang="ts">
export default defineComponent({
    setup(props: any) {
        const keyword = ref<string | string[]>('')
        const dialog = ref()
        function showSearchDialog() {
            dialog.value.show()
        }
        function hideSearchDialog() {
            dialog.value.hide()
        }
        function jumpTo(key: string | string[]) {
            keyword.value = key
            return navigateTo({
                path: '/search',
                query: {
                    keyword: keyword.value,
                }
            })
        }
        return {
            dialog,
            keyword,
            showSearchDialog,
            hideSearchDialog,
            jumpTo
        }
    }
})
</script>