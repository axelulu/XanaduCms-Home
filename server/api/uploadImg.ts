import { useBody, CompatibilityEvent } from 'h3'
import { FormData } from 'formdata-polyfill/esm.min.js'
import { base64ToFile } from '~~/utils/utils'

const runtimeConfig = useRuntimeConfig()

export default async (req: CompatibilityEvent) => {
    const file = await useBody(req)
    console.log(base64ToFile(file.file, '01.jpg'))
    const fd = new FormData()
    fd.append('file', base64ToFile(file.file, file.fileName))
    fd.append('uuid', file.uuid)
    fd.append('type', file.type)
    const method = useMethod(req)
    return $fetch(`${runtimeConfig.public.publicUrl}/Upload/FileUpload`, {
        method: method,
        headers: {
            'Authorization': req.res.req.headers.authorization,
        },
        body: fd
    })
}
