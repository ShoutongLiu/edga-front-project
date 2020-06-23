<template>
    <div class="recommend">
        <div class="company">
            <span class="title">推荐:</span>
            <div
                class="recomm-img"
                v-for="v in data"
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
import pinyin from 'pinyin'
let rtx = /^[\u4e00-\u9fa5]+$/
export default {
    props: {
        data: Array
    },
    methods: {
        handleOpenDetail (item) {
            let url = ''
            if (rtx.test(item.companyName)) {
                let pinyinArr = pinyin(item.companyName, {
                    style: pinyin.STYLE_NORMAL                })
                url = 'design/' + pinyinArr[0] + pinyinArr[1]
            } else {
                url = 'design/' + item.companyName
            }

            // 设置title
            let title = item.companyName + '|' + item.describe
            document.title = title
            window.history.pushState(null, null, url); // 改变url但是不跳转

            EventBus.$emit('showDetail', item)
            // 更新状态
            EventBus.$emit('resetStatu', { count: item.views, time: item.commitTime, loveTime: item.loveTime })
        }
    }
}
</script>

<style>
</style>