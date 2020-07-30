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
                    <span>{{title}}:</span>
                    <span>{{value}}</span>
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
            @hide="handleHide"
        ></dialog-show>
    </div>
</template>

<script>
import edgaHeader from './Header'
import NavItem from './NavItem'
import recommend from './Recommend'
import DialogShow from './Dialog'
import { EventBus } from '../utils/bus'
import rendom from '../utils/rendom'
import pinyin from 'pinyin'
let rtx = /^[\u4e00-\u9fa5]+$/
export default {
    data () {
        return {
            value: '',  // 路由参数
            url: '',
            contents: [],
            contData: [],
            pinyinArr: [],
            recommendData: [],
            companyInfo: {},
            isShow: false,
            path: '',
            more: null,
            tipTitle: '',
            itemUrl: ''
        }
    },
    props: {
        title: String,
        reqPath: String
    },
    components: {
        edgaHeader,
        NavItem,
        recommend,
        DialogShow
    },
    mounted () {
        this.init()

        const { key, url, index } = this.$route.params
        // 在首页点击更多的时候可以直接获取
        this.value = key ? key : ''
        this.url = url
        this.itemUrl = index ? index : ''
    },
    methods: {
        init () {
            this.getData()
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
        // 获取value
        getValue (url, tag) {
            let tagObj = tag.find(v => {
                if (v.url === url) {
                    return v
                }
            })
            this.value = tagObj.name
        },

        async goSearch (name) {
            this.$router.push({ path: 'search', query: { name } })
        },
        // 显示详情
        handleShow (info) {
            this.companyInfo = info
            this.isShow = true
            document.body.style.overflow = 'hidden'
        },
        // 隐藏详情事件
        handleHide (obj) {
            this.isShow = false
            document.body.style.overflow = 'auto'
            if (!obj.isLove && !obj.isView) {
                return
            }

            this.reqData();
            this.getData()
        },
        // 获取数据
        async getData () {
            switch (this.reqPath) {
                case 'tag':
                    const { tag } = await this.$axios.$post('/tag/get', { page: 0 })
                    this.getValue(this.url, tag)
                    break
                case 'cate':
                    const { categroy } = await this.$axios.$post('/categroy/get', { page: 0 })
                    this.getValue(this.url, categroy)
                    break
                case 'skill':
                    const { field } = await this.$axios.$post('/field/get', { page: 0 })
                    this.getValue(this.url, field)
                    break
                case 'location':
                    const { location } = await this.$axios.$post('/location/get', { page: 0 })
                    this.getValue(this.url, location)
                    break
            }
            const { contents } = await this.$axios.$post('/content/get', { page: 0 })
            this.contents = contents
            // 在这做数据处理
            this.recommendData = rendom(this.contents)
            this.pinyin(this.contents)
            this.judegUrl()
            this.reqData()
        },
        judegUrl () {
            if (this.pinyinArr.includes(this.itemUrl)) {
                const info = this.getDetail(this.itemUrl)
                this.handleShow(info)
                window.history.pushState(null, null, `${this.url}/${this.itemUrl}`); // 改变url但是不跳转
                let title = info.companyName + '|' + info.describe
                document.title = title
                return
            }
        },
        async reqData () {
            let reqObj = {}
            switch (this.reqPath) {
                case 'tag':
                    reqObj = { tag: { name: this.value } }
                    break
                case 'cate':
                    reqObj = { cate: { name: this.value } }
                    break
                case 'skill':
                    reqObj = { skill: { name: this.value } }
                    break
                case 'location':
                    reqObj = { location: { name: this.value } }
                    break
                default:
                    reqObj = {}
            }
            const { contents } = await this.$axios.$post(`/content/${this.reqPath}`, reqObj)
            this.changeIndex(contents)
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