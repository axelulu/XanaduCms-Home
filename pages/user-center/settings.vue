<template>
    <NuxtLayout name="user">
        <div class="ml-6 columns-2 gap-4">
            <div class="w-full mt-3 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'user-circle']" />
                    <span class="ml-1 select-none">我的头像</span>
                </div>
                <div class="p-4">
                    <div class="px-4 py-3 bg-gray-100 mt-2 text-xs text-gray-500">修改头像需要 50 个喵爪哦！</div>
                </div>
                <div class="flex flex-row items-center px-4 pb-4">
                    <img class="w-28 h-28 rounded-full cursor-pointer object-cover"
                        :src="runtimeConfig.public.assetsUrl + user.avatar" alt="">
                    <label for="avatar"
                        class="border-2 border-dashed hover:bg-gray-100 duration-300 border-gray-500 ml-4 cursor-pointer h-28 w-full flex justify-center items-center">
                        <font-awesome-icon class="text-2xl text-gray-500" :icon="['fas', 'camera']" />
                        <span class="ml-2 text-lg text-gray-500 select-none">更改我的头像</span>
                        <input @change="uploadPostImg" accept="image/gif, image/jpg, image/jpeg, image/png, image/webp"
                            type="file" id="avatar" hidden value="" />
                    </label>
                </div>
            </div>
            <div class="w-full mt-3 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'user-circle']" />
                    <span class="ml-1 select-none">个人资料</span>
                </div>
                <div class="p-4">
                    <div class="px-4 py-3 bg-gray-100 mt-2 text-xs text-gray-500">如果您是第三方登录用户（例如 QQ
                        登录），则无需修改密码。如果您从第三方登录用户改为到账号邮箱登录，您的默认密码将会是您的新账号邮箱。</div>
                    <form ref="formUserDetail" onsubmit="return false" class="mt-4">
                        <div class="flex flex-row items-center">
                            <div class="text-xs w-2/12 text-gray-500">昵称</div>
                            <NuxtInput :required="true" pattern="[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$"
                                class="w-10/12 text-xs" :icon="['fas', 'user-circle']" v-model:value="user.nickName"
                                type="text" placeholder="请输入昵称">
                            </NuxtInput>
                        </div>
                        <div class="flex flex-row items-center">
                            <div class="text-xs w-2/12 text-gray-500">描述</div>
                            <NuxtTextareaInput :required="true" pattern="[\u4e00-\u9fa5]{3,100}$|^[\dA-Za-z_]{3,100}$"
                                class="w-10/12 text-xs" v-model:value="user.desc" rows="5" maxlen="120"
                                placeholder="请输入描述">
                            </NuxtTextareaInput>
                        </div>
                        <div class="flex justify-end mt-4">
                            <NuxtGreenBtn @click="updateDetail" class="w-10/12" value="更新个人资料" :icon="['fas', 'check']">
                            </NuxtGreenBtn>
                        </div>
                    </form>
                </div>
            </div>
            <div class="w-full mt-3 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'at']" />
                    <span class="ml-1 select-none">账户邮箱</span>
                </div>
                <div class="p-4">
                    <div class="px-4 py-3 bg-gray-100 mt-2 text-xs text-gray-500">修改个人资料，需要 50 个喵爪哦！</div>
                    <form ref="formUserEmail" onsubmit="return false" class="mt-4">
                        <div class="flex flex-row items-center">
                            <div class="text-xs w-2/12 text-gray-500">邮箱</div>
                            <NuxtInput :required="true" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                                class="w-10/12 text-xs" :icon="['fas', 'at']" v-model:value="email" type="email"
                                placeholder="请输入邮箱">
                            </NuxtInput>
                        </div>
                        <div class="flex flex-row items-center">
                            <div class="text-xs w-2/12 text-gray-500">验证码</div>
                            <NuxtInput :required="true" pattern="[0-9]{5,6}$" class="w-6/12 text-xs"
                                :icon="['fas', 'lock']" v-model:value="captcha" type="number" placeholder="请输入验证码">
                            </NuxtInput>
                            <div class="w-4/12 pl-4 flex justify-center items-center">
                                <div @click="getEmailCaptcha"
                                    class="w-full select-none text-xs text-center cursor-pointer text-gray-500 border-2 border-gray-100 px-2 py-1.5">
                                    <font-awesome-icon :icon="['fas', 'envelope']" />
                                    <span>
                                        发送验证码
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end mt-4">
                            <NuxtGreenBtn @click="updateEmail" class="w-10/12" value="更新邮箱" :icon="['fas', 'check']">
                            </NuxtGreenBtn>
                        </div>
                    </form>
                </div>
            </div>
            <div class="w-full mt-3 mb-2 inline-block bg-white rounded-md shadow-sm relative">
                <div class="absolute -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'lock']" />
                    <span class="ml-1 select-none">我的密码</span>
                </div>
                <div class="p-4">
                    <div class="px-4 py-3 bg-gray-100 mt-2 text-xs text-gray-500">您可以修改您的密码，建议复杂一些~ 如该您是第三方登录（例如 QQ
                        登录），则无需修改密码。</div>
                    <form ref="formUserPwd" onsubmit="return false" class="mt-4">
                        <div class="flex flex-row items-center">
                            <div class="text-xs w-2/12 text-gray-500">旧密码</div>
                            <NuxtInput :required="true" pattern="[a-zA-Z]\w{5,17}$" class="w-10/12 text-xs"
                                :icon="['fas', 'lock']" v-model:value="oldPwd" type="password" placeholder="请输入旧密码">
                            </NuxtInput>
                        </div>
                        <div class="flex flex-row items-center">
                            <div class="text-xs w-2/12 text-gray-500">新密码</div>
                            <NuxtInput :required="true" pattern="[a-zA-Z]\w{5,17}$" class="w-10/12 text-xs"
                                :icon="['fas', 'lock']" v-model:value="newPwd" type="password" placeholder="请输入新密码">
                            </NuxtInput>
                        </div>
                        <div class="flex flex-row items-center">
                            <div class="text-xs w-2/12 text-gray-500">确认新密码</div>
                            <NuxtInput :required="true" pattern="[a-zA-Z]\w{5,17}$" class="w-10/12 text-xs"
                                :icon="['fas', 'lock']" v-model:value="reNewPwd" type="password" placeholder="请确认新密码">
                            </NuxtInput>
                        </div>
                        <div class="flex justify-end mt-4">
                            <NuxtGreenBtn @click="updatePwd" class="w-10/12" value="更新密码" :icon="['fas', 'check']">
                            </NuxtGreenBtn>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Message ref="message"></Message>
    </NuxtLayout>
</template>
<script lang="ts">
import { EMAILCAPTCHA, UPLOADIMG, USERAVATARUPDATE, USERDETAILUPDATE, USEREMAILUPDATE, USERPWDUPDATE } from "~~/config/api"
import { useAuth } from "~~/store/auth"
import { fileToBase64 } from "~~/utils/utils"
definePageMeta({
    middleware: ["user"]
})
export default defineComponent({
    setup() {
        const message = ref()
        const email = ref('')
        const captcha = ref('')
        const oldPwd = ref('')
        const newPwd = ref('')
        const reNewPwd = ref('')
        const formUserDetail = ref(null)
        const formUserEmail = ref(null)
        const formUserPwd = ref(null)
        const sendCaptcha = ref<boolean>(true)
        const captchaTimer = ref<number>(60)
        const auth = useAuth()
        const user = useUser()
        const runtimeConfig = useRuntimeConfig()

        async function updateDetail() {
            if (formUserDetail.value.reportValidity()) {
                const { result, code, message: msg } = await useCustomFetch<any>(USERDETAILUPDATE, {
                    method: 'POST',
                    params: {
                        'Authorization': 'Bearer ' + auth.token,
                    },
                    body: {
                        nickName: user.value.nickName,
                        desc: user.value.desc,
                    }
                })
                if (code === 200) {
                    message.value.show('更新成功', {
                        type: 'success',
                    })
                } else {
                    message.value.show(msg || '更新失败', {
                        type: 'warning',
                    })
                }
            }
        }

        async function updateAvatar() {
            const { code, message: msg } = await useCustomFetch<any>(USERAVATARUPDATE, {
                method: 'POST',
                params: {
                    'Authorization': 'Bearer ' + auth.token,
                },
                body: {
                    avatar: user.value.avatar,
                }
            })
            if (code === 200) {
                message.value.show('更新成功', {
                    type: 'success',
                })
            } else {
                message.value.show(msg || '更新失败', {
                    type: 'warning',
                })
            }
        }

        async function getEmailCaptcha() {
            const { code, message: msg } = await useCustomFetch<any>(EMAILCAPTCHA, {
                method: 'POST',
                body: {
                    emailType: 'changePwd',
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

        async function updateEmail() {
            if (formUserEmail.value.reportValidity()) {
                const { code, message: msg } = await useCustomFetch<any>(USEREMAILUPDATE, {
                    method: 'POST',
                    params: {
                        'Authorization': 'Bearer ' + auth.token,
                    },
                    body: {
                        emailCaptcha: captcha.value,
                        emailCode: email.value,
                    }
                })
                if (code === 200) {
                    message.value.show('更新成功', {
                        type: 'success',
                    })
                } else {
                    message.value.show(msg || '更新失败', {
                        type: 'warning',
                    })
                }
            }
        }

        async function updatePwd() {
            if (formUserPwd.value.reportValidity()) {
                if (newPwd.value !== reNewPwd.value) {
                    message.value.show('二次密码不一样', {
                        type: 'warning',
                    })
                    return
                }
                const { code, message: msg } = await useCustomFetch<any>(USERPWDUPDATE, {
                    method: 'POST',
                    params: {
                        'Authorization': 'Bearer ' + auth.token,
                    },
                    body: {
                        password: newPwd.value,
                        oldPassword: oldPwd.value,
                    }
                })
                if (code === 200) {
                    message.value.show('更新成功', {
                        type: 'success',
                    })
                } else {
                    message.value.show(msg || '更新失败', {
                        type: 'warning',
                    })
                }
            }
        }

        async function uploadPostImg(event: any) {
            var files = event.target.files[0]        //获取文件
            const imgBase64 = await fileToBase64(files)
            const { result, code, message: msg } = await useCustomFetch<any>(UPLOADIMG, {
                method: 'POST',
                body: {
                    'file': imgBase64,
                    'fileName': files.name,
                    'uuid': auth.userId,
                    'type': 'user',
                },
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                }
            })
            if (code === 200) {
                user.value.avatar = result.value.file.url
                updateAvatar()
            } else {
                message.value.show(msg || '上传失败', {
                    type: 'warning',
                })
            }
            event.target.value = ''
        }


        return {
            message,
            email,
            captcha,
            oldPwd,
            newPwd,
            reNewPwd,
            user,
            runtimeConfig,
            formUserDetail,
            formUserPwd,
            formUserEmail,
            updateDetail,
            uploadPostImg,
            updatePwd,
            getEmailCaptcha,
            updateEmail,
        }
    }
})
</script>