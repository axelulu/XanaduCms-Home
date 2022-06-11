import { useQuery, CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default (req: CompatibilityEvent) => {
    const query = useQuery(req)
    console.log(query)
    return $fetch(`${runtimeConfig.public.publicUrl}/Post/PostItemDownload`, {
        params: query,
        headers: {
            'Authorization': query.Authorization as string
        }
    })
}
