import { useBody, CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default (req: CompatibilityEvent) => {
    const query = useQuery(req)
    const method = useMethod(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/Upload/FileList`, {
        method: method,
        headers: {
            'Authorization': req.res.req.headers.authorization,
        },
        params: query
    })
}
