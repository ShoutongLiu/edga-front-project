<template>
    <div class="recommend">
        <div
            class="company"
            v-if="data.length > 0"
        >
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
import pinyin from 'pinyin'
let rtx = /^[\u4e00-\u9fa5]+$/
export default {
    props: {
        data: Array,
        isShow: Boolean,
    },
    methods: {
        handleOpenDetail (item) {
            const pathArr = this.$route.path.split('/')
            let isHas = pathArr.includes('design') || this.isShow
            let url = ''
            if (rtx.test(item.companyName)) {
                let pinyinArr = pinyin(item.companyName, {
                    style: pinyin.STYLE_NORMAL                })
                url = isHas ? this.$route.path + '-' + pinyinArr[0] + pinyinArr[1] : 'hangjia/' + pinyinArr[0] + pinyinArr[1]
            } else {
                url = isHas ? this.$route.path + '-' + item.companyName : 'hangjia/' + item.companyName
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