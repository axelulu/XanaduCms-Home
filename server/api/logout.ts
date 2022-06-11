import { CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default (req: CompatibilityEvent) => {
    const method = useMethod(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/User/Logout`, {
        method: method,
        headers: {
            'Authorization': req.res.req.headers.authorization
        }
    })
}
