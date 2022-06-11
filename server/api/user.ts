import { useQuery, CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default (req: CompatibilityEvent) => {
    const query = useQuery(req)
    const method = useMethod(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/User/User`, {
        method: method,
        headers: {
            'Authorization': query.Authorization as string
        }
    })
}
