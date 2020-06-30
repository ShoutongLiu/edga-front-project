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
import edgaHeader from '../../components/Header'
import NavItem from '../../components/NavItem'
import recommend from '../../components/Recommend'
import DialogShow from '../../components/Dialog'
import { EventBus } from '../../utils/bus'
import rendom from '../../utils/rendom'
import pinyin from 'pinyin'
let rtx = /^[\u4e00-\u9fa5]+$/
export default {
    data () {
        return {
            value: '',  // 路由参数
            type: 'fl',   // 参数类别
            url: '',
            tipTitle: '',
            typeTitle: '标签',
            categroy: [],
            tag: [],
            contents: [],
            contData: [],
            pinyinArr: [],
            recommendData: [],
            companyInfo: {},
            isShow: false,
            time: 0,
            path: '',
            more: null
        }
    },
    components: {
        edgaHeader,
        NavItem,
        recommend,
        DialogShow
    },
    mounted () {
        console.log(this.$route);
        this.init()
        this.pinyin(this.contents)
        // 获取搜索传参
        if (this.$route.query.name) {
            let name = this.$route.query.name
            this.goSearch(name)
            this.typeTitle = name
            return
        }

        const { key, url } = this.$route.params

        // 在首页点击更多的时候可以直接获取
        this.value = key ? key : ''
        // 获取url参数
        if (url.split('-').length === 2) {
            this.url = url.split('-')[1]
            this.path = '/design/' + url.split('-')[0]
        } else {
            this.url = url
        }


        if (this.pinyinArr.includes(this.url)) {
            const info = this.getDetail(this.url)
            this.handleShow(info)
            window.history.pushState(null, null, url); // 改变url但是不跳转
            let title = info.companyName + '|' + info.describe
            document.title = title
            return
        }
        // 获取关键词
        this.getValue(this.url)
        this.isNotfound()
        this.reqJudge(this.typeTitle)

    },
    async asyncData ({ $axios }) {
        const { tag } = await $axios.$post('/tag/get', { page: 0 })
        const { categroy } = await $axios.$post('/categroy/get', { page: 0 })
        const { contents } = await $axios.$post('/content/get', { page: 0 })
        return { tag, categroy, contents }
    },
    methods: {
        init () {
            console.log(this.$route);
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
        isNotfound () {
            // 判断url是否存在
            if (!this.value && this.url !== 'search') {
                this.$router.push('/notfound')
            }
        },
        getDetail (path) {
            let detailInfo = this.contents.find(v => {
                let str = ''
                if (rtx.test(v.companyName)) {
                    let pinyinArr = pinyin(v.companyName, {
                        style: pinyin.STYLE_NORMAL                    })
                    str = pinyinArr[0] + pinyinArr[1]
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
        getValue (url) {
            let cateObj = this.categroy.find(v => {
                return v.url === url
            })
            let tagObj = this.tag.find(v => {
                if (v.url === url) {
                    return v
                }
            })

            if (cateObj) {
                this.typeTitle = '类别'
                this.value = cateObj.name
            } else {
                this.typeTitle = '标签'
                this.value = tagObj.name
            }
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
            // 重新请求
            if (!this.value) {
                let name = this.$route.query.name
                this.goSearch(name)
            } else {
                this.reqJudge(this.type);
            }
            this.getData()
        },
        // 获取数据
        async getData () {
            const { contents } = await this.$axios.$post('/content/get', { page: 0 })
        },
        async reqJudge (type) {
            if (type === '类别') {
                const { contents } = await this.$axios.$post('/content/cate', { cate: { categroyVal: this.value } })
                this.changeIndex(contents)
            } else if (type === '标签') {
                const { contents } = await this.$axios.$post('/content/tag', { tag: { tagVal: this.value } })
                this.changeIndex(contents)
            }
        },


        pinyin (contents) {
            // 获取公司名拼音
            contents.forEach(v => {
                let str = ''
                if (rtx.test(v.companyName)) {
                    let arr = pinyin(v.companyName, {
                        style: pinyin.STYLE_NORMAL                    })
                    str = arr[0] + arr[1]
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