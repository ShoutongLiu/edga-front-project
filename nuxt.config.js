
module.exports = {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: 'EGDA行家',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
        { src: '@/plugins/vue-awesome-swiper', mode: 'client' }
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
        port: 8000, // default: 3000
    }
}
