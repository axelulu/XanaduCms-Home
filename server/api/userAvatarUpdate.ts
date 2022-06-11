import { useQuery, CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default async (req: CompatibilityEvent) => {
    const query = useQuery(req)
    const body = await useBody(req)
    const method = useMethod(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/User/UserAvatarUpdate`, {
        method: method,
        headers: {
            'Authorization': query.Authorization as string
        },
        body: body
    })
}
