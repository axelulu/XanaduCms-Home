
<script lang="ts">
export default defineComponent({
    setup() {
        const percent = ref(0)
        const show = ref(false)
        const canSucceed = ref(true)
        const reversed = ref(false)
        const skipTimerCount = ref(0)
        const throttle = ref(200)
        const duration = ref(5000)
        const continuous = ref(false)
        const _timer = ref(null)
        const _throttle = ref(null)
        const _cut = ref(undefined)
        const showAnimate = ref(false)
        const left = computed(() => {
            if (!continuous.value) {
                return false
            }
            return !reversed.value ? '0px' : 'auto'
        })
        function clear() {
            clearInterval(_timer.value)
            clearTimeout(_throttle.value)
            _timer.value = null
        }
        function start() {
            clear()
            percent.value = 0
            reversed.value = false
            skipTimerCount.value = 0
            show.value = true
            showAnimate.value = true
            canSucceed.value = true

            if (throttle.value) {
                _throttle.value = setTimeout(() => startTimer(), throttle.value)
            } else {
                startTimer()
            }
            return this
        }
        function set(num) {
            show.value = true
            canSucceed.value = true
            percent.value = Math.min(100, Math.max(0, Math.floor(num)))
        }
        function get() {
            return percent.value
        }
        function increase(num) {
            percent.value = Math.min(100, Math.floor(percent.value + num))
            return this
        }
        function decrease(num) {
            percent.value = Math.max(0, Math.floor(percent.value - num))
        }
        function pause() {
            clearInterval(_timer.value)
        }
        function resume() {
            startTimer()
        }
        function finish() {
            percent.value = reversed.value ? 0 : 100
            hide()
        }
        function hide() {
            clear()
            setTimeout(() => {
                show.value = false
                setTimeout(() => {
                    showAnimate.value = false
                }, 300)
                nextTick(() => {
                    percent.value = 0
                    reversed.value = false
                })
            }, 500)
        }
        function fail(error) {
            canSucceed.value = false
        }

        function startTimer() {
            if (!show.value) {
                show.value = true
            }
            if (typeof _cut.value === 'undefined') {
                _cut.value = 10000 / Math.floor(duration.value)
            }

            _timer.value = setInterval(() => {
                /**
                 * When reversing direction skip one timers
                 * so 0, 100 are displayed for two iterations
                 * also disable css width transitioning
                 * which otherwise interferes and shows
                 * a jojo effect
                 */
                if (skipTimerCount.value > 0) {
                    skipTimerCount.value--
                    return
                }

                if (reversed.value) {
                    decrease(_cut.value)
                } else {
                    increase(_cut.value)
                }

                if (continuous.value) {
                    if (percent.value >= 100) {
                        skipTimerCount.value = 1

                        reversed.value = !reversed.value
                    } else if (percent.value <= 0) {
                        skipTimerCount.value = 1

                        reversed.value = !reversed.value
                    }
                }
            }, 100)
        }
        onUnmounted(() => {
            clear()
        })
        return {
            fail,
            hide,
            finish,
            resume,
            pause,
            decrease,
            increase,
            get,
            set,
            clear,
            start,
            show,
            skipTimerCount,
            canSucceed,
            percent,
            left,
            showAnimate,
        }
    }
})
</script>
<template>
    <div class="nuxt-progress" v-show="show" :class="{
        'animate-fadeIn30': showAnimate,
        'animate-fadeOut30': !showAnimate,
        'nuxt-progress-notransition': skipTimerCount > 0,
        'nuxt-progress-failed': !canSucceed
    }" :style="'width: ' + percent + '%;left: ' + left"></div>
</template>
<style scoped>
.nuxt-progress {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 2px;
    width: 0%;
    opacity: 1;
    transition: width 0.1s, opacity 0.4s;
    background-color: rgb(36, 167, 255);
    z-index: 999999;
}

.nuxt-progress.nuxt-progress-notransition {
    transition: none;
}

.nuxt-progress-failed {
    background-color: #000;
}
</style>