<template>
    <div></div>
</template>

<script>
import pinyin from 'pinyin'
import { EventBus } from '../utils/bus'
let rtx = /^[\u4e00-\u9fa5]+$/
export default {
    data () {
        return {
            contents: [],
            pinyinArr: []
        }
    },
    mounted () {
        this.pinyin(this.contents)
        const { hangjia } = this.$route.params
        this.url = hangjia
        if (this.pinyinArr.includes(this.url)) {
            this.goHome(this.url)
        }
    },
    async asyncData ({ $axios }) {
        const { contents } = await $axios.$post('/content/get', { page: 0 })
        return { contents }
    },
    methods: {
        // 如果是详情的url，跳转到index
        goHome (url) {
            this.$router.push({ name: 'index', params: { path: url } })
        },
        pinyin (contents) {
            // 获取公司名拼音
            contents.forEach(v => {
                let str = ''
                if (rtx.test(v.companyName)) {
                    let arr = pinyin(v.companyName, {
                        style: pinyin.STYLE_NORMAL
                    })
                    str = arr.length > 2 ? arr[0] + arr[1] + arr[2] : arr[0] + arr[1]
                } else {
                    str = v.companyName
                }
                this.pinyinArr.push(str)
            })
        },
    }
}
</script>

<style>
</style>