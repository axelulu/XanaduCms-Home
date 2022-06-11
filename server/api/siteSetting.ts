const runtimeConfig = useRuntimeConfig()

export default () => $fetch(`${runtimeConfig.public.publicUrl}/Setting/SiteSetting`)
