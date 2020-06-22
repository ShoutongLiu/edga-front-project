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

