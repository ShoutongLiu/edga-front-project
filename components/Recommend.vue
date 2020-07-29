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
        isShow: Boolean
    },
    methods: {
        handleOpenDetail (item) {
            console.log(this.$route)
            const query = this.$route.query.name
            const pathArr = this.$route.path.split('/')
            let path = pathArr[1]
            let url = ''
            let fPath = this.$route.params.url + '/'
            if (rtx.test(item.companyName)) {
                let pinyinArr = pinyin(item.companyName, {
                    style: pinyin.STYLE_NORMAL
                })
                // 判断数组长度截取字符
                let str = pinyinArr.length > 2 ? pinyinArr[0] + pinyinArr[1] + pinyinArr[2] : pinyinArr[0] + pinyinArr[1]
                if (this.isShow && !query) {
                    url = str
                } else if (this.isShow && query) {
                    url = this.$route.path + '/' + str + '?name=' + query
                } else if (path && query) {
                    url = this.$route.path + '/' + str + '?name=' + query
                } else {
                    url = fPath + str
                }
            } else {
                if (this.isShow && !query) {
                    url = item.companyName.replace(/\s+/g, "")
                } else if (this.isShow && query) {
                    url = this.$route.path + '/' + item.companyName.replace(/\s+/g, "") + '?name=' + query
                } else if (path && query) {
                    url = this.$route.path + '/' + item.companyName.replace(/\s+/g, "") + '?name=' + query
                } else {
                    url = fPath + item.companyName.replace(/\s+/g, "")
                }
            }

            // 设置title
            let title = item.companyName + '|' + item.describe
            document.title = title
            console.log(url)
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