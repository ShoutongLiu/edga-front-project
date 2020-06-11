
module.exports = {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: 'EGDA行家',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
            { name: "keywords", content: "" }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        '@/assets/style/iconfont/iconfont.css',
        '@/assets/style/index.scss',
        'swiper/css/swiper.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
        '~/plugins/axios'
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8000, // default: 3000
    }
}
