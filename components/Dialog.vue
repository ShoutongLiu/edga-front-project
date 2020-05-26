<template>
    <div
        class="dialog"
        v-if="show"
        @click="dialogHide"
    >
        <div
            class="dialog-container"
            @click.stop="handleStop"
        >
            <!-- 轮播图 -->
            <div class="banner">
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
                            v-for="b in info.pics"
                            :key="b"
                        >
                            <img
                                :src="b"
                                alt="banner"
                                class="dia-banner"
                            >
                        </div>
                    </div>
                    <!-- 前进后退按钮 -->
                    <div
                        class="swiper-button-prev"
                        slot="button-prev"
                    ></div>
                    <div
                        class="swiper-button-next"
                        slot="button-next"
                    ></div>
                    <div class="swiper-pagination swiper-pagination-bullets"></div>
                </div>
            </div>
            <!--公司logo等  -->
            <div class="company-logo">
                <div class="left">
                    <img
                        :src="info.avatarUrl"
                        alt="logo"
                        class="logo"
                    >
                    <div class="view">
                        <div class="name">
                            {{info.companyName}}
                        </div>
                        <div class="location">
                            <span>
                                <i class="iconfont icon-location"></i>
                                {{info.locationVal[0]}}
                            </span>
                            <span>
                                <i class="iconfont icon-eyeopen"></i>
                                {{info.views}}
                            </span>
                            <span>
                                <i class="iconfont icon-custom-tolove"></i>
                                {{info.love}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <img
                            src="~/assets/yirenzheng.png"
                            alt="renzheng"
                        >
                        <p>已认证</p>
                    </div>
                    <div>
                        <img
                            src="~/assets/yituijian.png"
                            alt="tuijian"
                        >
                        <p>已推荐</p>
                    </div>
                    <div @click="handleLove">
                        <img
                            src="~/assets/love.png"
                            alt="love"
                            v-show="!isLove"
                        >
                        <img
                            src="~/assets/love-red.png"
                            alt="love"
                            v-show="isLove"
                        >
                        <p>喜欢</p>
                    </div>
                </div>
            </div>
            <!-- 公司详细信息 -->
            <div class="company-detail">
                <div class="desc">
                    <p>{{info.describe}}</p>
                    <div class="guanwang">访问官网</div>
                </div>
                <div class="contcant">

                </div>
            </div>
        </div>
        <i
            class="iconfont icon-close"
            @click="dialogHide"
        ></i>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        info: Object
    },
    data () {
        return {
            swiperOptions: {
                loop: true,
                speed: 500,
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                navigation: {
                    nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
                    prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素。
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                autoplayDisableOnInteraction: false,
                mousewheel: true,
                preloadImages: false
            },
            isLove: false
        }
    },
    methods: {
        dialogHide () {
            this.$emit('hide')
        },
        stopSwiper () {
            this.myDirectiveSwiper.autoplay.stop()
        },
        startSwiper () {
            this.myDirectiveSwiper.autoplay.start()
        },
        handleStop () { },
        handleLove () {
            this.isLove = !this.isLove
        }
    }
}
</script>

<style>
.swiper-button-next,
.swiper-button-prev {
    color: #ffffff;
}
</style>