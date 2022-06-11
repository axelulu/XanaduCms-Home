import { useQuery, CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default async (req: CompatibilityEvent) => {
    const body = await useBody(req)
    const method = useMethod(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/User/Reg`, {
        method: method,
        body: body
    })
}
