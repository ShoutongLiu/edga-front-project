<template>
    <div class="recommend">
        <div class="company">
            <span class="title">推荐 ：</span>
            <img
                v-for="v in data"
                :key="v._id"
                :src="v.avatarUrl"
                alt="logo"
                class="logo"
                @click.stop="handleOpenDetail(v)"
            >
        </div>
    </div>
</template>

<script>
import { EventBus } from '../utils/bus'
let setTime = 1000 * 60 * 5
export default {
    props: {
        data: Array
    },
    methods: {
        handleOpenDetail (item) {
            EventBus.$emit('showDetail', item)
            // 更新状态
            EventBus.$emit('resetStatu', { count: item.views, time: item.commitTime })
        }
    }
}
</script>

<style>
</style>