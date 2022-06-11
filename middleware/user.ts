/*!
 * Router Global middleware
 */

import { USER } from '~/config/api'
import useUser from '~~/composables/useUser'
import { useAuth } from '~~/store/auth'

export default defineNuxtRouteMiddleware(async (to, _from) => {
    const user = useUser()
    const auth = useAuth()
    if (!user.value) {
        const { result, code, message } = await useCustomFetch<Object>(USER, {
            method: 'GET',
            params: {
                'Authorization': 'Bearer ' + auth.token,
            },
        })
        if (code === -1) {
            auth.logout()
        }
        user.value = result.value['userInfo']
    }
})
