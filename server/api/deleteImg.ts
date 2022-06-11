import { useBody, CompatibilityEvent } from 'h3'

const runtimeConfig = useRuntimeConfig()

export default async (req: CompatibilityEvent) => {
    const body = await useBody(req)
    const method = useMethod(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/Upload/ImgFileDelete`, {
        method: method,
        headers: {
            'Authorization': req.res.req.headers.authorization,
        },
        body: body
    })
}
