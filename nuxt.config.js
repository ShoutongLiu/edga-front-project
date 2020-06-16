
module.exports = {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: 'EGDA行家 | 环境图形设计行业专家信息搜索平台',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
            { hid: 'description', name: 'description', content: 'EGDA行家，一个专业展示供需服务商的网站，为甲方、需求方提供国内外最专业的设计公司、设计师、制造企业、产品及耗材等供应服务商信息搜索平台' },
            { hid: 'keywords', name: "keywords", content: "EGDA, 行家, EGDA行家,标识,环境图形,展览,标识公司,标识设计,标识厂家,标识设计师,导视公司,标牌,标识平台,美陈公司,美陈制作,展览公司,雕塑公司,城市家具设计,艺术装置设计,互动设计公司,景观设计公司,品牌设计公司" },
            { hid: 'og:title', property: 'og:title', content: 'EGDA行家 | 行业专家信息搜索平台' },
            { hid: 'og:description', property: 'og:description', content: 'EGDA行家，一个专业展示供需服务商的网站，为甲方、需求方提供国内外最专业的设计公司、设计师、制造企业、产品及耗材等供应服务商信息搜索平台' },
            { hid: 'og:url', property: 'og:url', content: 'http://hangjia.egda.com' },
            { hid: 'og:image', property: 'og:image', content: 'http://hangjia.egda.com/manage/EGDA.png' },
            { itemprop: 'name', content: 'EGDA行家 | 行业专家信息搜索平台' },
            { itemprop: 'description', content: 'EGDA行家，一个专业展示供需服务商的网站，为甲方、需求方提供国内外最专业的设计公司、设计师、制造企业、产品及耗材等供应服务商信息搜索平台' },
            { itemprop: 'url', content: 'http://hangjia.egda.com' },
            { itemprop: 'image', content: 'http://hangjia.egda.com/manage/EGDA.png' }
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
