import { useBody, CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default (req: CompatibilityEvent) => {
    const query = useQuery(req)
    const method = useMethod(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/Comment/CommentList`, {
        method: method,
        params: query
    })
}
