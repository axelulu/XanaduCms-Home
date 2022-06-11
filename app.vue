<template>
  <div class="scroll-smooth">
    <NuxtPage :page-key="key" />
    <NuxtLoading ref="loading"></NuxtLoading>
  </div>
</template>
<script setup>
const route = useRoute()
const loading = ref(null)

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:start", () => {
  loading.value.start()
})

nuxtApp.hook("page:finish", () => {
  loading.value.finish()
  window.scrollTo(0, 0)
})

const key = computed(() => route.name !== undefined ? route.name + +new Date() : route + +new Date())
</script>