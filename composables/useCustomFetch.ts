/**
 * useFetch interceptor
 */

import { FetchRequest, FetchOptions } from 'ohmyfetch'
import { FetchResponseType } from '~~/types/response'

const useCustomFetch = async <T = any>(request: FetchRequest, opts: FetchOptions = {}) => {
    const { data, pending, refresh, error } = await useFetch<FetchResponseType>(request, {
        ...opts,
        pick: ['code', 'result', 'message']
    })

    if (error.value) {
        return Promise.reject(data.value);
    }

    if (data.value.code !== 200) {
        return Promise.resolve(data.value);
    }

    return {
        result: ref<T>(data.value.result),
        code: data.value.code,
        message: data.value.message,
        pending,
        refresh
    }
}

export default useCustomFetch
