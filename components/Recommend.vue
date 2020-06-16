<template>
    <div class="recommend">
        <div class="company">
            <span class="title">推荐:</span>
            <div
                class="recomm-img"
                v-for="v in recommData"
                :key="v._id"
            >
                <img
                    :src="v.avatarUrl"
                    alt="logo"
                    class="logo"
                    @click.stop="handleOpenDetail(v)"
                >
            </div>
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
    data () {
        return {
            clientWidth: null,
            recommData: []
        }
    },
    mounted () {
        this.clientWidth = document.body.clientWidth    // 获取屏幕宽度
        if (this.clientWidth < 375) {
            this.recommData = this.data.slice(0, 5)
        } else if (this.clientWidth < 768) {
            this.recommData = this.data.slice(0, 7)
        } else if (this.clientWidth < 1024) {
            this.recommData = this.data.slice(0, 14)
        } else {
            this.recommData = this.data
        }
    },
    methods: {
        handleOpenDetail (item) {
            EventBus.$emit('showDetail', item)
            // 更新状态
            EventBus.$emit('resetStatu', { count: item.views, time: item.commitTime, loveTime: item.loveTime })
        }
    }
}
</script>

<style>
</style>