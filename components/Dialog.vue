<template>
    <div
        class="dialog"
        v-show="show"
        @click="dialogHide"
    >
        <div class="dialog-container">
            <span>dialog</span>
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
        show: Boolean
    },
    methods: {
        dialogHide () {
            this.$emit('hide')
        }
    }
}
</script>

<style>
</style>