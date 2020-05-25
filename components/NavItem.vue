<template>
    <div
        class="item"
        @click="showDetail"
    >
        <div>
            <img
                src="~/assets/nucleo.png"
                alt=""
                class="logo"
            >
        </div>
        <div class="item-info">
            <div class="item-name">蓝美艺术设计</div>
            <div class="desc">汇集了国内首批酒店领域的优秀资深设计师</div>
            <div class="location">
                <span>设计公司</span>
                <span>深圳<i class="iconfont icon-location"></i></span>
            </div>
        </div>
        <div class="true">
            <img
                src="~/assets/tui-pc.png"
                alt="tui"
            >
            <img
                src="~/assets/zheng-pc.png"
                alt="zheng"
            >
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        showDetail () {
            this.$emit('show', { info: 'info' })
        }
    }
}
</script>

<style>
</style>