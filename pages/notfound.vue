<template>
    <div class="not-found">
        <i class="iconfont icon-icon-test"></i>
        <div
            class="back"
            @click="back"
        >返回首页</div>
    </div>

</template>

<script>
export default {
    methods: {
        back () {
            this.$router.push('/')
        }
    }
}
</script>

<style>
</style>