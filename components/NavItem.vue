<template>
    <div
        class="item-container"
        v-if="item.showIndex"
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
                <div class="location">
                    <span>{{item.categroyVal}}</span>
                    <span>{{item.locationVal.join('、')}}<i class="iconfont icon-location" /></span>
                </div>
            </div>
            <div class="true">
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
let setTime = 1000 * 60 * 5
export default {
    props: {
        item: Object
    },
    data () {
        return {
            timer: null
        }
    },
    methods: {
        showDetail () {
            this.addView()
            this.$emit('show', this.item)
        },
        async addView () {
            // 求出时间差
            let time = this.item.commitTime - new Date().getTime()
            let currentTimer = this.item.commitTime === 0 || time < 0 ? setTime : time
            // 把状态传递给父组件，避免多次请求
            this.$emit('setTime', time)
            if (time > 0) {
                return
            }
            let updateObj = JSON.parse(JSON.stringify(this.item))
            updateObj.views += 1
            updateObj.commitTime = new Date().getTime() + setTime
            const { isUpdate } = await this.$axios.$post('/content/update', updateObj)
        }
    },
    destroyed () {
        clearTimeout(this.timer)
    }
}
</script>

<style>
</style>

