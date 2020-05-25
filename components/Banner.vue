<template>
    <div
        class="swiper"
        ref="mySwiper"
        v-swiper:myDirectiveSwiper="swiperOptions"
        @mouseenter="stopSwiper"
        @mouseleave="startSwiper"
    >
        <div class="swiper-wrapper">
            <div
                class="swiper-slide"
                v-for="index in 2"
                :key="index"
            >
                <a
                    href="https://www.baidu.com"
                    class="banner-url"
                >
                    <img
                        src="~/assets/11.png"
                        alt="banner"
                        class="banner"
                    >
                </a>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            swiperOptions: {
                loop: true,
                speed: 500,
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                autoplayDisableOnInteraction: false,
                // effect:'cube',
                mousewheel: true,
                preloadImages: false,
                lazy: true
            }
        }
    },
    mounted () {
        console.log(this.myDirectiveSwiper);
    },

    methods: {
        stopSwiper () {
            this.myDirectiveSwiper.autoplay.stop()
        },
        startSwiper () {
            this.myDirectiveSwiper.autoplay.start()
        }
    }
}
</script>

<style>
</style>