/*!
 * Router Global middleware
 */

import { SETTINGS } from '~/config/api'

export default defineNuxtRouteMiddleware(async (to, _from) => {
    const settings = useSettings()

    if (!settings.value) {
        const { result } = await useCustomFetch<Object>(SETTINGS, {
            method: 'GET',
        })
        console.log(result.value)
        result.value['basic'] = JSON.parse(result.value['basic']['value'])
        result.value['footer'] = JSON.parse(result.value['footer']['value'])
        settings.value = result.value
    }

})
