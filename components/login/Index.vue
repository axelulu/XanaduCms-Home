<template>
    <div v-show="isShow" :class="showAnimate ? 'animate-fadeIn30' : 'animate-fadeOut30'"
        class="z-20 fixed top-0 bottom-0 left-0 ring-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-50">
        <div @click="hide" class="fixed top-0 bottom-0 left-0 ring-0 w-full h-full"></div>
        <div :class="showAnimate ? 'animate-zoomInUp30' : 'animate-zoomOutDown30'"
            class="fixed top-0 bottom-0 left-0 ring-0 flex justify-center items-center h-full w-full pointer-events-none">
            <div class="lg:w-2/6 xl:w-2/12 bg-gray-50 pointer-events-auto flex flex-col rounded-md overflow-hidden">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row ml-4 bg-gray-200 p-0 rounded-bl-md rounded-br-md overflow-hidden">
                        <div @click="loginType = 'login'" :class="loginType == 'login' ? 'bg-pink-400 text-white' : ''"
                            class="text-sm px-4 py-1.5 cursor-pointer hover:text-white hover:bg-pink-400 duration-300">
                            登陆</div>
                        <div @click="loginType = 'reg'" :class="loginType == 'reg' ? 'bg-pink-400 text-white' : ''"
                            class="text-sm px-4 py-1.5 cursor-pointer hover:text-white hover:bg-pink-400 duration-300">
                            注册</div>
                        <div @click="loginType = 'forgetPwd'"
                            :class="loginType == 'forgetPwd' ? 'bg-pink-400 text-white' : ''"
                            class="text-sm px-4 py-1.5 cursor-pointer hover:text-white hover:bg-pink-400 duration-300">
                            丢失密码</div>
                    </div>
                    <div class="text-sm px-4 py-1.5 bg-gray-200 cursor-pointer hover:text-white hover:bg-pink-400 duration-300 rounded-bl-md"
                        @click="hide">
                        <font-awesome-icon :icon="['fas', 'times']" />
                    </div>
                </div>
                <form :ref="loginType == 'login' ? 'formLogin' : loginType == 'reg' ? 'formReg' : 'formForgetPwd'"
                    class="flex-1 p-4 text-xs">
                    <div>欢迎登录 ACG调查小队，登录后签个到看看运气如何吧！目前小队换了新域名（acgso1.com），qq登录还在申请中，所以暂时不能用qq登陆哦</div>
                    <div v-if="loginType == 'login'" class="animate-fadeIn30">
                        <NuxtInput :icon="['fas', 'at']" :required="true"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" v-model:value="email" type="email"
                            placeholder="请输入邮箱">
                        </NuxtInput>
                        <NuxtInput :icon="['fas', 'unlock-alt']" :required="true" pattern="[a-zA-Z]\w{5,17}$"
                            v-model:value="password" type="password" placeholder="请输入密码">
                        </NuxtInput>
                        <NuxtInput :icon="['fas', 'shield-alt']" :required="true" pattern="[0-9]{5,6}$"
                            v-model:value="captchaCode" type="number" placeholder="请输入验证码" width="w-4/6">
                            <div class="w-2/6" @click="getCaptcha">
                                <img class="cursor-pointer px-1 object-cover" :src="captcha.captchaImg" alt="">
                            </div>
                        </NuxtInput>
                    </div>
                    <div v-if="loginType == 'reg'" class="animate-fadeIn30">
                        <NuxtInput :icon="['fas', 'user']" :required="true" pattern="[a-zA-Z0-9_-]{4,16}$"
                            v-model:value="username" type="text" placeholder="请输入用户名">
                        </NuxtInput>
                        <NuxtInput :icon="['fas', 'at']" :required="true" pattern="[a-zA-Z]\w{5,17}$"
                            v-model:value="email" type="email" placeholder="请输入邮箱">
                        </NuxtInput>
                        <NuxtInput :icon="['fas', 'key']" :required="true" pattern="[0-9]{5,6}$"
                            v-model:value="emailCaptcha" type="number" width="w-3/6" placeholder="请输入验证码">
                            <button :disabled="!sendCaptcha" @click="getEmailCaptcha"
                                class="px-4 py-1.5 bg-sky-400 ml-4 w-3/6 text-xs text-white flex justify-center items-center cursor-pointer">
                                {{
                                        sendCaptcha ? '获取验证码' : '还有' + captchaTimer + '秒'
                                }}</button>
                        </NuxtInput>
                        <NuxtInput :icon="['fas', 'lock']" :required="true" pattern="[a-zA-Z]\w{5,17}$"
                            v-model:value="password" type="password" placeholder="请输入密码 ">
                        </NuxtInput>
                        <NuxtInput :icon="['fas', 'lock']" :required="true" pattern="[a-zA-Z]\w{5,17}$"
                            v-model:value="rePassword" type="password" placeholder="请确认密码">
                        </NuxtInput>
                    </div>
                    <div v-if="loginType == 'forgetPwd'" class="animate-fadeIn30">
                        <NuxtInput :icon="['fas', 'at']" value="qwqwqw" type="email"></NuxtInput>
                        <NuxtInput :icon="['fas', 'key']" value="121212121" type="number" width="w-3/6">
                            <div
                                class="px-4 py-1.5 bg-sky-400 ml-4 w-3/6 text-xs text-white flex justify-center items-center cursor-pointer">
                                发送验证码到新邮箱</div>
                        </NuxtInput>
                        <NuxtInput :icon="['fas', 'lock']" value="1212" type="password"></NuxtInput>
                    </div>
                </form>
                <NuxtGreenBtn v-if="loginType == 'login'" :class="'border-0'" @click="login" value="登陆"
                    :icon="['fas', 'arrow-alt-circle-right']" class="h-9"></NuxtGreenBtn>
                <NuxtGreenBtn v-if="loginType == 'reg'" :class="'border-0'" @click="reg" value="注册"
                    :icon="['fas', 'user-plus']" class="h-9">
                </NuxtGreenBtn>
                <NuxtGreenBtn v-if="loginType == 'forgetPwd'" :class="'border-0'" value="忘记密码" :icon="['fas', 'sync']"
                    class="h-9">
                </NuxtGreenBtn>
            </div>
        </div>
        <Message ref="message"></Message>
    </div>
</template>
<script lang="ts">
import { CAPTCHA, EMAILCAPTCHA } from "~~/config/api"
import { useAuth } from "~~/store/auth"
import { Captcha } from "~~/types/response"

export default defineComponent({
    props: {
        type: {
            type: String,
            default: 'login',
        }
    },
    setup(props: any) {
        const route = useRouter()
        const dialog = ref()
        const message = ref()
        const formLogin = ref()
        const formReg = ref()
        const formForgetPwd = ref()
        const showAnime = ref<string>()
        const loginType = ref<string>()
        const email = ref<string>('')
        const username = ref<string>('')
        const password = ref<string>('')
        const rePassword = ref<string>('')
        const captchaCode = ref<string>('')
        const emailCaptcha = ref<string>('')
        const sendCaptcha = ref<boolean>(true)
        const captchaTimer = ref<number>(60)
        const captcha = ref<Captcha>({
            captchaId: '',
            captchaImg: '',
        })
        const auth = useAuth()

        const isShow = ref<boolean>(false)
        const showAnimate = ref<boolean>(false)
        function show() {
            isShow.value = true
            showAnimate.value = true
            getCaptcha()
        }
        function hide() {
            showAnimate.value = false
            setTimeout(() => {
                isShow.value = false
            }, 300)
        }

        loginType.value = props.type

        async function getCaptcha() {
            const { result } = await useCustomFetch<Captcha>(CAPTCHA, {
                method: 'GET',
                params: {
                    t: Date.parse(new Date().toString()),
                }
            })
            captcha.value = result.value
        }

        async function getEmailCaptcha() {
            const { code, message: msg } = await useCustomFetch<any>(EMAILCAPTCHA, {
                method: 'POST',
                body: {
                    emailType: 'reg',
                    emailCode: email.value,
                    t: Date.parse(new Date().toString()),
                }
            })
            if (code == 200) {
                message.value.show('发送成功', {
                    type: 'success',
                })
                sendCaptcha.value = false;
                const timer = setInterval(() => {
                    captchaTimer.value--;
                    if (captchaTimer.value < 1) {
                        clearInterval(timer);
                        sendCaptcha.value = true;
                    }
                }, 1000);
            } else {
                message.value.show(msg || '发送失败', {
                    type: 'warning',
                })
            }
        }

        async function login() {
            if (formLogin.value.reportValidity()) {
                const { result, code, message: msg } = await auth.login({
                    emailCode: email.value,
                    password: password.value,
                    captchaCode: captchaCode.value.toString(),
                    captchaId: captcha.value.captchaId,
                })
                if (code == 200) {
                    message.value.show('登陆成功', {
                        type: 'success',
                    })
                    setTimeout(() => {
                        route.push('/?t=' + Date.parse(new Date().toString()))
                    }, 3000)
                } else {
                    message.value.show(msg || '登陆失败', {
                        type: 'warning',
                    })
                }
            }
        }

        async function reg() {
            if (formReg.value.reportValidity()) {
                const { result, code, message: msg } = await auth.reg({
                    username: username.value,
                    password: password.value,
                    rePassword: rePassword.value,
                    emailCode: email.value,
                    captchaCode: emailCaptcha.value.toString(),
                    captchaType: 'reg',
                })
                if (code == 200) {
                    message.value.show('注册成功', {
                        type: 'success',
                    })
                    setTimeout(() => {
                        route.push('/?t=' + Date.parse(new Date().toString()))
                    }, 3000)
                } else {
                    message.value.show(msg || '注册失败', {
                        type: 'warning',
                    })
                }
            }
        }

        return {
            dialog,
            message,
            loginType,
            captcha,
            captchaCode,
            email,
            username,
            password,
            emailCaptcha,
            rePassword,
            captchaTimer,
            sendCaptcha,
            showAnime,
            formLogin,
            formReg,
            formForgetPwd,
            login,
            reg,
            getCaptcha,
            getEmailCaptcha,
            show,
            hide,
            showAnimate,
            isShow,
        }
    }
})
</script>