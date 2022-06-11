/*!
 * image lazyload
 */
import VueLazyLoad from 'vue3-lazyload'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueLazyLoad, {
        preLoad: 1.3,//距离当前dom距离页面底部的高度
        error: '/assets/img/cover.png',//加载失败显示的图片
        loading: '/assets/img/cover.png',//加载中显示的图片
        attempt: 1 // 图片加载失败，最多重试的次数
    })
})
