<template>
    <div
        class="item-container"
        v-if="item.showIndex && item.surplusTime > 0"
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
                <div class="item-name">{{item.companyName}}</div>
                <div class="desc">{{item.describe}}</div>
                <div
                    class="location"
                    v-if="clientWidth > 768"
                >
                    <span>{{item.categroyVal}}</span>
                    <span>{{item.locationVal.join('、')}}<i class="iconfont icon-location" /></span>
                </div>
            </div>
            <div
                class="true"
                v-if="clientWidth > 768"
            >
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
            isViewCount: false,
            clientWidth: 0
        }
    },
    mounted () {
        this.clientWidth = document.body.clientWidth    // 获取屏幕宽度
    },
    methods: {
        showDetail () {
            this.addView()
            this.$emit('show', this.item)
        },
        async addView () {
            this.commitTime = this.item.commitTime
            this.viewCount = this.item.views
            // 把数量传到dialog组件
            EventBus.$emit('views', { count: this.viewCount, time: this.commitTime })
        }
    }
}
</script>

<style>
</style>

