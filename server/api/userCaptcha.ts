import { useQuery, CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default (req: CompatibilityEvent) => {
    const query = useQuery(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/User/Captcha`, {
        params: query
    })
}
