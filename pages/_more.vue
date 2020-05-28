<template>
    <div class="container more-container">
        <div class="search">
            <input
                type="text"
                class="search-input"
            >
            <div class="search-icon">
                <i class="iconfont icon-search"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted () {
        console.log(this.$route);
    }
}
</script>

<style>
</style>