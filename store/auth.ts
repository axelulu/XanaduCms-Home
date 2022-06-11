import { defineStore } from 'pinia'
import { LOGIN, LOGOUT, REG } from '~~/config/api'
import { Login } from '~~/types/response'

interface AuthState {
    loggedIn: boolean
    userId: string
    token: string
    avatar: string
}

export const useAuth = defineStore('auth', {
    persist: true,
    state: (): AuthState => ({
        loggedIn: false,
        userId: '',
        token: '',
        avatar: '',
    }),
    getters: {
        isLoggedIn: (state) => state.loggedIn,
        isUserId: (state) => state.userId,
        isToken: (state) => state.token,
        isAvatar: (state) => state.avatar,
    },

    actions: {
        async login({ emailCode, password, captchaId, captchaCode }) {
            try {
                const res = await useCustomFetch<Login>(LOGIN, {
                    method: 'POST',
                    body: {
                        emailCode: emailCode,
                        password: password,
                        captchaId: captchaId,
                        captchaCode: captchaCode,
                    }
                })

                if (res.code == 200) {
                    // const ex = 7 * 24 * 60 * 60 * 1000;
                    this.loggedIn = true
                    this.token = res.result.value.token
                    this.userId = res.result.value.userInfo.uuid
                    this.avatar = res.result.value.userInfo.avatar
                }

                return Promise.resolve(res);
            } catch (e) {
                return Promise.reject(e);
            }
        },
        async reg({ username, password, rePassword, emailCode, captchaCode, captchaType }) {
            try {
                // Try to logout
                const res = await useCustomFetch<any>(REG, {
                    method: 'POST',
                    body: {
                        username,
                        password,
                        rePassword,
                        emailCode,
                        captchaCode,
                        captchaType
                    }
                })

                if (res.code == 200) {
                    this.$reset()
                }
                return Promise.resolve(res);
            } catch (e) {
                return Promise.reject(e);
            }
        },
        async logout() {
            try {
                const res = await useCustomFetch<any>(LOGOUT, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + this.token,
                    }
                })
                this.$reset()
                return Promise.resolve(res);
            } catch (e) {
                this.$reset()
                return Promise.reject(e);
            }
        },
        async getUser() {
            const { $directus } = useNuxtApp()
            try {
                const user = await $directus.users.me.read({
                    fields: ['*'],
                })
                this.loggedIn = true
                this.user = user
            } catch (e) {
            }
        },
        async resetState() {
            this.$reset()
        },
    },
})