import { useQuery, CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default async (req: CompatibilityEvent) => {
    const query = useQuery(req)
    const body = await useBody(req)
    const method = useMethod(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/Post/PostItemDownloadBuy`, {
        method: method,
        body: body,
        headers: {
            'Authorization': query.Authorization as string
        }
    })
}
