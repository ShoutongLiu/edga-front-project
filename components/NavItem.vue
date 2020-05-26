<template>
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
                <span>{{item.locationVal.join('、')}}<i class="iconfont icon-location"></i></span>
            </div>
        </div>
        <div class="true">
            <img
                src="~/assets/tui-pc.png"
                alt="tui"
                v-if="item.showType.includes('推荐')"
            >
            <img
                src="~/assets/zheng-pc.png"
                alt="zheng"
                v-if="item.showType.includes('认证')"
            >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object
    },
    methods: {
        showDetail () {
            this.$emit('show', this.item)
        }
    }
}
</script>

<style>
</style>