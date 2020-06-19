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
                                {{info.locationVal.join('、')}}
                            </span>
                            <span>
                                <i class="iconfont icon-eye1"></i>
                                {{isViewCount  ? viewCount : info.views}}
                            </span>
                            <span>
                                <!-- 根据isLoveCount判断显示 -->
                                <i class="iconfont icon-custom-tolove"></i>
                                {{isLoveCount ? loveCount : info.love}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div v-if="info.showType.includes('认证')">
                        <img
                            src="~/static/imgs/yirenzheng.png"
                            alt="renzheng"
                            class="renzheng"
                            v-if="clientWidth >= 1024"
                        >
                        <img
                            src="~/static/imgs/p-renzheng@2.png"
                            alt="renzheng"
                            class="renzheng"
                            style="height: 24px;"
                            v-else
                        >
                        <p>已认证</p>
                    </div>
                    <div v-if="info.showType.includes('推荐')">
                        <img
                            src="~/static/imgs/yituijian.png"
                            alt="tuijian"
                            v-if="clientWidth >= 1024"
                        >
                        <img
                            src="~/static/imgs/p-tuijian@2.png"
                            alt="tuijian"
                            style="height: 22px;"
                            v-else
                        >
                        <p>推荐行家</p>
                    </div>
                    <div @click="handleLove">
                        <img
                            src="~/static/imgs/love-red.png"
                            alt="love"
                            v-show="clientWidth >= 1024 && isLove"
                        >
                        <img
                            src="~/static/imgs/isLove.png"
                            alt="love"
                            v-show="clientWidth >= 1024 && !isLove"
                        >
                        <img
                            src="~/static/imgs/p-love@2.png"
                            alt="love"
                            style="height: 22px;"
                            v-show="clientWidth < 1024 && isLove"
                        >
                        <img
                            src="~/static/imgs/p-islove@2.png"
                            alt="love"
                            style="height: 22px;"
                            v-show="clientWidth < 1024  && !isLove"
                        >
                        <p>喜欢</p>
                    </div>
                </div>
            </div>
            <hr class="hr" />
            <!-- 公司详细信息 -->
            <div class="company-detail">
                <div class="desc">
                    <div
                        v-if="info.describe.length > 320 && info.describe.length < 600"
                        class="desc-container"
                    >
                        <p>{{info.describe.slice(0, 200)}}</p>
                        <p>{{info.describe.slice(200, info.describe.length - 1)}}</p>
                    </div>
                    <div
                        v-if="info.describe.length > 600"
                        class="desc-container"
                    >
                        <p>{{info.describe.slice(0, 200)}}</p>
                        <p>{{info.describe.slice(200, 420)}}</p>
                        <p>{{info.describe.slice(420, info.describe.length - 1)}}</p>
                    </div>
                    <div
                        v-else
                        class="desc-container"
                    >
                        <p>{{info.describe}}</p>
                    </div>

                    <a
                        class="guanwang"
                        :href="`${info.url ? info.url : 'javascript:void(0);'}`"
                        :target="`${info.url ? '_blank' : '_self'}`"
                    >访问官网</a>
                </div>
                <div class="contcant">
                    <div
                        class="renzheng"
                        v-if="info.slogan"
                    >
                        <span class="title">认证：</span>
                        <span>{{info.slogan}}</span>
                    </div>
                    <div class="skill">
                        <div class="type">
                            <span class="title">类型：</span>
                            <span>{{info.categroyVal}}</span>
                        </div>
                        <div class="location">
                            <div>
                                <span class="title">位置：</span>
                                <span>{{info.locationVal.join('、')}}</span>
                            </div>
                        </div>
                        <div class="shanc">
                            <span class="title">擅长：</span>
                            <span>{{info.skiile.join('、')}}</span>
                        </div>

                    </div>
                    <div class="tag">
                        <div class="">标签：</div>
                        <span>{{info.tagVal.join('、')}}</span>
                    </div>
                    <div class="concat">
                        <div class="phone">
                            电话：<span>{{info.Landline}}</span>
                        </div>
                        <div class="cellphfone">
                            手机：<span>{{info.phone}}</span>
                        </div>
                        <div class="email">
                            邮箱：<span>{{info.email}}</span>
                        </div>
                    </div>
                    <div class="foces">
                        <div>关注：
                            <span
                                class="url"
                                @mouseenter="qqShow = true"
                                @mouseleave="qqShow = false"
                            >
                                <p
                                    class="qq"
                                    v-show="qqShow"
                                >{{info.qq}}</p>
                                <i class="iconfont icon-qq"></i>
                            </span>
                            <span
                                class="url"
                                @mouseenter="wechatShow = true"
                                @mouseleave="wechatShow = false"
                            >
                                <div
                                    v-if="info.wxchat.length !== 0"
                                    class="wechat"
                                >
                                    <img
                                        :src="info.wxchat[0].url"
                                        alt="wechat"
                                        v-show="wechatShow"
                                    >
                                </div>
                                <i class="iconfont icon-wechat"></i>
                            </span>
                            <!-- 使用a标签跳转外部链接需要加上http或https -->
                            <a
                                :href="info.weibo"
                                class="url"
                                target="_blank"
                            >
                                <i class="iconfont icon-weibo"></i>
                            </a>
                            <a
                                :href="info.pinterest"
                                class="url"
                                target="_blank"
                            >
                                <i class="iconfont icon-pinterest"></i>
                            </a>
                            <a
                                :href="info.twitter"
                                class="url"
                                target="_blank"
                            >
                                <i class="iconfont icon-twitter"></i>
                            </a>
                            <a
                                :href="info.behance"
                                class="url"
                                target="_blank"
                            >
                                <i class="iconfont icon-behance"></i>
                            </a>
                            <a
                                :href="info.facebook"
                                class="url"
                                target="_blank"
                            >
                                <i class="iconfont icon-facebook"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <i
            class="iconfont icon-close"
            @click="dialogHide"
        ></i>
        <div class="dia-recommend">
            <recommend :data="contents"></recommend>
        </div>
    </div>
</template>

<script>
import recommend from './Recommend'
import { EventBus } from '../utils/bus'
let setTime = 1000 * 60 * 5
export default {
    props: {
        show: Boolean,
        info: Object,
        contents: Array
    },
    components: { recommend },
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
            loveCount: 0,
            viewCount: 0,
            qqShow: false,
            wechatShow: false,
            isLoveCount: false,
            isViewCount: false,
            isLove: false,
            isChange: false,    // 控制显示字段
            commitTime: 0,
            loveTime: 0,
            recomDetail: {},
            clientWidth: 0
        }
    },
    mounted () {
        this.clientWidth = document.body.clientWidth    // 获取屏幕宽度

        // 接收传来数据
        EventBus.$on('views', (res) => {
            this.handleIsLove(res.loveTime)
            this.handleCount(res.count, res.time)
        })

        EventBus.$on('resetStatu', (status) => {
            if (!this.show) {
                this.handleCount(status.count, status.time)
                this.handleIsLove(status.loveTime)
            } else {
                this.isViewCount = false
            }
        })
    },
    methods: {
        // 判断是否已经点过赞
        handleIsLove (loveTime) {
            console.log(loveTime);
            let time = loveTime - new Date().getTime()
            console.log(time, 'love');
            if (time > 0) {
                this.isLove = true
            } else {
                this.isLove = false
            }
        },
        async dialogHide () {
            // 关闭时提交更新
            if (this.isLoveCount || this.isViewCount) {
                let updateObj = JSON.parse(JSON.stringify(this.info))
                updateObj.love = this.isLoveCount ? this.loveCount : this.info.love
                updateObj.views = this.viewCount
                updateObj.commitTime = this.commitTime
                updateObj.loveTime = this.loveTime
                const { isUpdate } = await this.$axios.$post('/content/update', updateObj)
                if (isUpdate) {
                    this.isLoveCount = false
                    this.isViewCount = false
                    this.isChange = false
                    this.loveCount = 0
                    this.viewCount = 0
                }
                this.$emit('hide', { isLove: true, isView: true })
                return
            }
            this.$emit('hide', { isLove: this.isLoveCount, isView: this.isViewCount })
        },
        // 浏览次数数据处理
        handleCount (count, commitTime) {
            if (!this.isViewCount) {
                this.commitTime = commitTime
                this.viewCount = count
            }
            let time = this.commitTime - new Date().getTime()
            console.log(time);
            // 把状态传递给父组件，避免多次请求
            if (time > 0) {
                return
            }
            this.isChange = true
            this.isViewCount = true
            this.viewCount += 1
            // 更新提交时间
            this.commitTime = new Date().getTime() + setTime
        },
        stopSwiper () {
            this.myDirectiveSwiper.autoplay.stop()
        },
        startSwiper () {
            this.myDirectiveSwiper.autoplay.start()
        },
        handleStop () { },
        handleLove () {
            // 求出时间差
            if (!this.isLoveCount) {
                this.loveTime = this.info.loveTime
                this.loveCount = this.info.love
            }
            let time = this.loveTime - new Date().getTime()
            console.log(time);
            // 把状态传递给父组件，避免多次请求
            if (time > 0) {
                return
            }
            this.isLoveCount = true
            this.isLove = true
            this.loveCount += 1
            // 更新提交时间
            this.loveTime = new Date().getTime() + setTime
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