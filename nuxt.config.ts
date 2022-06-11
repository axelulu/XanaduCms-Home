import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    loading: {
        color: 'blue',
    },
    runtimeConfig: {
        public: {
            publicUrl: process.env.PUBLIC_URL,
            assetsUrl: process.env.ASSETS_URL,
        }
    },
    css: [
        '@wangeditor/editor/dist/css/style.css',
        '~/assets/css/tailwind.css',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    buildModules: [
        "@pinia/nuxt",
    ],
    server: {
        // https: {
        //     key: fs.readFileSync(fileURLToPath(new URL('./server.key', import.meta.url))),
        //     cert: fs.readFileSync(fileURLToPath(new URL('./server.crt', import.meta.url)))
        // },
        host: 'localhost',
        port: 3000,
    },
    build: {
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/vue-fontawesome',
        ],
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    }
})
