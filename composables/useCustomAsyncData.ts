/**
 * useFetch interceptor
 */

import { FetchResponseType } from '~~/types/response'

const useCustomAsyncData = async <T = any>(url, request) => {
    const { data, pending, refresh, error } = await useAsyncData<FetchResponseType>(url, request)

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

export default useCustomAsyncData
