<template>
    <div
        :class="`item-container ${isTouch ? 'touch' : ''}`"
        v-if="item.showIndex && item.surplusTime > 0"
        @touchmove="gtouchmove"
        @touchend="gtouchend"
    >
        <div
            class="item"
            @click="showDetail"
        >
            <div>
                <img
                    :src="item.avatarUrl"
                    alt=""
                    class="logo"
                >
            </div>
            <div class="item-info">
                <div :class="`item-name ${isTouch ? 'touch' : ''}`">{{item.companyName}}</div>
                <div class="desc">{{item.describe}}</div>
                <div class="location">
                    <span>{{item.categroyVal}}</span>
                    <span v-if="item.locationVal.length > 0">
                        {{item.locationVal[0]}}
                        <i class="iconfont icon-location" />
                    </span>
                </div>
            </div>
            <div class="true hide-768">
                <img
                    src="~/static/imgs/tui-pc.png"
                    alt="tui"
                    v-if="item.showType.includes('推荐')"
                >
                <img
                    src="~/static/imgs/zheng-pc.png"
                    alt="zheng"
                    v-if="item.showType.includes('认证')"
                >
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../utils/bus'
import pinyin from 'pinyin'
let rtx = /^[\u4e00-\u9fa5]+$/
export default {
    props: {
        item: Object
    },
    data () {
        return {
            viewCount: 0,
            commitTime: 0,
            loveTime: 0,
            isViewCount: false,
            isTouch: false,
        }
    },

    methods: {
        showDetail () {
            const pathArr = this.$route.path.split('/')
            let isHas = pathArr.includes('design')
            let url = ''
            if (rtx.test(this.item.companyName)) {
                let pinyinArr = pinyin(this.item.companyName, {
                    style: pinyin.STYLE_NORMAL                })
                let str = pinyinArr.length > 2 ? pinyinArr[0] + pinyinArr[1] + pinyinArr[2] : pinyinArr[0] + pinyinArr[1]
                url = isHas ? this.$route.path + '-' + str : 'hangjia/' + str
            } else {
                url = isHas ? this.$route.path + '-' + this.item.companyName : 'hangjia/' + this.item.companyName
            }

            // 设置title
            let title = this.item.companyName + '|' + this.item.describe
            document.title = title
            window.history.pushState(null, null, url); // 改变url但是不跳转
            this.addView()
            this.$emit('show', this.item)
        },
        async addView () {
            this.commitTime = this.item.commitTime
            this.viewCount = this.item.views
            this.loveTime = this.item.loveTime
            // 把数量传到dialog组件
            EventBus.$emit('views', { count: this.viewCount, time: this.commitTime, loveTime: this.loveTime })
        },
        // 移动端滑动事件
        gtouchmove () {
            this.isTouch = true
        },
        // 移动端停止滑动事件
        gtouchend () {
            this.isTouch = false
        }
    }
}
</script>

<style>
</style>

