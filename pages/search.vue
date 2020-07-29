<template>
    <div>
        <edga-header
            @anchor="goAnchor"
            @search="goSearch"
        ></edga-header>
        <div class="container more-container">
            <div class="content">
                <div
                    class="title"
                    v-if="contData.length !== 0"
                >
                    <span>{{typeTitle}}:</span>
                    <span class="count">{{contData.length}}</span>个
                </div>
                <div
                    class="title"
                    v-else
                >
                    {{tipTitle}}
                </div>
                <div class="cate-data">
                    <nav-item
                        v-for="v in contData"
                        :key="v._id"
                        :item="v"
                        @show="handleShow"
                    ></nav-item>
                </div>
            </div>
            <div class="more-recommend">
                <recommend :data="recommendData"></recommend>
            </div>
        </div>
        <dialog-show
            :info="companyInfo"
            :show="isShow"
            :contents="recommendData"
            :path="path"
            :query="name"
            @hide="handleHide"
        ></dialog-show>
    </div>
</template>

<script>
import edgaHeader from '../components/Header'
import NavItem from '../components/NavItem'
import recommend from '../components/Recommend'
import DialogShow from '../components/Dialog'
import { EventBus } from '../utils/bus'
import rendom from '../utils/rendom'
import pinyin from 'pinyin'
let rtx = /^[\u4e00-\u9fa5]+$/
export default {
    data () {
        return {
            url: '',
            tipTitle: '',
            typeTitle: '',
            contents: [],
            contData: [],
            pinyinArr: [],
            recommendData: [],
            companyInfo: {},
            isShow: false,
            path: '',
            name: ''
        }
    },
    components: {
        edgaHeader,
        NavItem,
        recommend,
        DialogShow
    },
    mounted () {
        this.init()
        this.pinyin(this.contents)
        // 获取搜索传参
        if (this.$route.query.name) {
            this.name = this.$route.query.name
            this.goSearch(this.name)
        }

        console.log(this.$route)
        this.url = this.$route.params.index
        if (this.pinyinArr.includes(this.url)) {
            const info = this.getDetail(this.url)
            this.handleShow(info)
            window.history.pushState(null, null, `?name=${this.name}`); // 改变url但是不跳转
            let title = info.companyName + '|' + info.describe
            this.path = '/' + this.$route.name
            document.title = title
            return
        }

    },
    async asyncData ({ $axios }) {
        const { contents } = await $axios.$post('/content/get', { page: 0 })
        return { contents }
    },
    methods: {
        init () {
            this.path = this.$route.path
            document.body.style.overflow = 'auto'
            // 获取Bus传值
            EventBus.$on('showDetail', (item) => {
                this.isShow = true
                this.companyInfo = item
            })

            // 移动端锚点跳转
            EventBus.$on('anchor', (url) => {
                this.goAnchor(url)
            })

            this.recommendData = rendom(this.contents)
        },
        getDetail (path) {
            let detailInfo = this.contents.find(v => {
                let str = ''
                if (rtx.test(v.companyName)) {
                    let pinyinArr = pinyin(v.companyName, {
                        style: pinyin.STYLE_NORMAL
                    })
                    str = pinyinArr.length > 2 ? pinyinArr[0] + pinyinArr[1] + pinyinArr[2] : pinyinArr[0] + pinyinArr[1]
                } else {
                    str = v.companyName
                }

                if (str === path) {
                    return v
                }
            })
            return detailInfo
        },
        // 显示详情
        handleShow (info) {
            this.companyInfo = info
            this.isShow = true
            this.name = this.$route.query.name
            let str = ''
            if (rtx.test(info.companyName)) {
                let pinyinArr = pinyin(info.companyName, {
                    style: pinyin.STYLE_NORMAL
                })
                str = pinyinArr.length > 2 ? pinyinArr[0] + pinyinArr[1] + pinyinArr[2] : pinyinArr[0] + pinyinArr[1]
            } else {
                str = info.companyName
            }
            window.history.pushState(null, null, '?name=' + this.name); // 改变url但是不跳转
            document.body.style.overflow = 'hidden'
        },
        // 隐藏详情事件
        handleHide (obj) {
            this.isShow = false
            document.body.style.overflow = 'auto'
            // 刷新后关闭title重新设置
            document.title = 'EGDA行家 | 环境图形设计行业专家信息搜索平台'
            if (!obj.isLove && !obj.isView) {
                return
            }
            // 重新请求
            if (this.$route.query.name) {
                this.goSearch(this.name)
            }

            this.getData()
        },
        // 获取数据
        async getData () {
            const { contents } = await this.$axios.$post('/content/get', { page: 0 })
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
        goAnchor (url) {
            this.$router.push({ name: 'index', params: { url } })
        },
        // 搜索函数
        async goSearch (name) {
            this.typeTitle = name
            const { contents } = await this.$axios.$post('/content/company', { name: name })
            this.changeIndex(contents)
        },
        // 在本页面要全部显示，把showIndex字段变为true
        changeIndex (data) {
            data.forEach(v => {
                v.showIndex = true
            })
            this.contData = data
            this.tipTitle = '抱歉，找不到任何结果。以下推荐的行家您可能会喜欢！'
        }
    }
}
</script>

<style>
</style>