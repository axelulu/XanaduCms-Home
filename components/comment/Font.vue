<template>
    <div v-show="isShow" :class="showAnimate ? 'animate-fadeIn30' : 'animate-fadeOut30'"
        class="z-20 fixed top-0 bottom-0 left-0 ring-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-50">
        <div @click="hide" class="fixed top-0 bottom-0 left-0 ring-0 w-full h-full"></div>
        <div :class="showAnimate ? 'animate-zoomInUp30' : 'animate-zoomOutDown30'"
            class="fixed top-0 bottom-0 left-0 ring-0 flex justify-center items-center h-full w-full pointer-events-none">
            <div class="lg:w-5/12 xl:w-5/12 bg-gray-50 pointer-events-auto flex flex-col rounded-md overflow-hidden">
                <div class="flex flex-wrap space-between items-center text-center px-3 pt-3 pb-1">
                    <div v-for="(item, index) in font" :key="index" @click="insertFont(item)"
                        class="px-2 py-1 bg-gray-200 hover:bg-gray-100 duration-300 select-none text-xs m-0.5 flex-grow cursor-pointer">
                        {{
                                item
                        }}</div>
                </div>
                <div @click="hide" class="bg-gray-200 text-center py-1 cursor-pointer hover:bg-gray-100 duration-300">
                    <font-awesome-icon :icon="['fas', 'times']" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

export default defineComponent({
    props: {
        postId: {
            type: String,
            default: 'login',
        }
    },
    setup(props: any, context) {
        const dialog = ref()
        const font = ref([
            '(⊙⊙！) ',
            'ƪ(‾ε‾“)ʃƪ(',
            'Σ(°Д°;',
            '눈_눈',
            '(๑>◡<๑) ',
            '(❁´▽`❁)',
            '(,,Ծ▽Ծ,,)',
            '（⺻▽⺻ ）',
            '乁( ◔ ౪◔)「',
            'ლ(^o^ლ)',
            '(◕ܫ◕)',
            '❀.(*´▽`*)❀.',
            '(´･ω･`)',
            'ヽ(ﾟ∀ﾟ)ﾉ',
            '(ฅ>ω<*ฅ)',
            'ヽ(*≧ω≦)ﾉ',
            '( ≧Д≦)',
            '(Ｔ▽Ｔ)',
            '(ノへ￣、) ',
            '・ﾟ・(ノД`)・ﾟ・',
            '(,, ･∀･)ﾉ゛',
            '(o´ω`o)ﾉ',
            '(￣^￣)ゞ',
            '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
            '（＊／ω＼＊ )',
            '(´∇ﾉ｀*)ノ',
            '(〃ﾉωﾉ)',
            '(╯°□°）╯︵ ┻━┻',
            '(=ﾟДﾟ=) ▄︻┻┳━ ·.`.`.`. ',
            '╰(￣ω￣ｏ) [摸摸头]',
            '( ｰ̀дｰ́ )ง ',
            '(๑•̀ㅂ•́)و✧',
            '_(:з」∠)_',
            '╮(╯▽╰)╭',
            '（ﾉ´д｀）'
        ])
        const showAnime = ref<string>()
        const commentContent = ref<string>()

        const isShow = ref<boolean>(false)
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

        function insertFont(item) {
            context.emit('insertFont', item)
            hide()
        }

        return {
            dialog,
            showAnime,
            commentContent,
            insertFont,
            show,
            hide,
            font,
            showAnimate,
            isShow,
        }
    }
})
</script>