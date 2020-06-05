<template>
    <div>
        <edga-header
            @data="handleGetData"
            @anchor="goAnchor"
        ></edga-header>
        <div class="container">
            <div class="main">
                <div class="banner-container">
                    <banner :banners="banners"></banner>
                    <small-img :graphs="graphs"></small-img>
                </div>
                <div class="top-container">
                    <top-list
                        :newTop="newTopData"
                        :loveTop="loveTopData"
                        @showDetail="handleGetTop"
                    ></top-list>
                </div>
            </div>
            <div class="list">
                <div class="list-container">
                    <!-- 标签分类 -->
                    <div class="tag-list">
                        <ul class="tag-box">
                            <li
                                v-for="v in tag"
                                :key="v._id"
                                @mouseenter="handleEnter(v.name)"
                            >
                                <span
                                    v-if="v.showIndex"
                                    :class="{active: v.name === currentTag}"
                                >{{v.name}}</span>
                            </li>
                        </ul>
                        <div class="tag-item">
                            <nav-item
                                v-for="v in screenTag"
                                :key="v._id"
                                @show="handleShow"
                                :item="v"
                            ></nav-item>
                        </div>
                    </div>
                </div>
                <div class="nav-list">
                    <div
                        class="list-box"
                        v-for="v in newContents"
                        :key="v.title"
                    >
                        <div
                            class="title"
                            :id="v.id"
                        >
                            <span>{{v.title}}推荐</span>
                            <span @click="toMore(v.title, v.id)">更多</span>
                        </div>
                        <div class="nav-content">
                            <nav-item
                                v-for="i in v.data"
                                :key="i._id"
                                :item="i"
                                @show="handleShow"
                            ></nav-item>
                        </div>
                    </div>
                </div>
            </div>
            <dialog-show
                :info="companyInfo"
                :show="isShow"
                :contents="recommendData"
                @hide="handleHide"
            ></dialog-show>
        </div>
    </div>
</template>

<script>
import edgaHeader from '../components/Header'
import Banner from '../components/Banner'
import SmallImg from '../components/SmallImg'
import TopList from '../components/TopList'
import DialogShow from '../components/Dialog'
import NavItem from '../components/NavItem'
import { EventBus } from '../utils/bus'
import rendom from '../utils/rendom'
export default {
    data () {
        return {
            isShow: false,
            currentTag: '',
            banners: [],
            graphs: [],
            tag: [],
            contents: [],
            newContents: [],
            recommendData: [],
            loveTopData: [],
            newTopData: [],
            categroy: [],
            screenTag: [],
            companyInfo: {},
            timer: null,
            time: 0,
        }
    },
    components: {
        edgaHeader,
        Banner,
        SmallImg,
        TopList,
        DialogShow,
        NavItem
    },
    async asyncData ({ $axios }) {
        const { banners } = await $axios.$get('/banner/get')
        const { graphs } = await $axios.$get('/graph/get')
        const { contents } = await $axios.$post('/content/get', { page: 0 })
        return { banners, graphs, contents }
    },
    mounted () {
        let { url } = this.$route.params
        if (url) {
            // 定时器等待dom渲染完成
            this.timer = setTimeout(() => {
                this.goAnchor(url)
            }, 500);
        }
        this.recommendData = rendom(this.contents)
        // 获取推荐的Bus传值
        EventBus.$on('showDetail', (item) => {
            this.companyInfo = item
        })

        this.getLoveTopData()
        this.getNewTopData()
    },
    methods: {
        // 显示详情
        handleShow (info) {
            this.companyInfo = info
            this.isShow = true
            document.body.style.overflow = 'hidden'
        },
        handleEnter (tag) {
            this.currentTag = tag
            this.getScreenTag(this.currentTag)
        },
        async handleHide (obj) {
            this.isShow = false
            document.body.style.overflow = 'auto'
            if (!obj.isLove && !obj.isView) {
                return
            }
            const { contents } = await this.$axios.$post('/content/get', { page: 0 })
            this.contents = contents
            this.recommendData = rendom(this.contents)
            this.cateData(this.categroy)
            this.getScreenTag(this.currentTag)
            this.getLoveTopData()
            this.getNewTopData()
        },
        // 更多跳转
        toMore (name, url) {
            this.$router.push({ path: `/${url}`, query: { key: name } })
        },
        // 获取分类和标签数据
        handleGetData ({ tag, categroy }) {
            this.tag = tag
            this.categroy = categroy
            let first = tag.find(v => {
                if (v.showIndex) {
                    return v
                }
            })
            this.currentTag = first.name
            this.getScreenTag(this.currentTag)
            this.cateData(this.categroy)
        },
        // 分类数据
        cateData (categroy) {
            let cateArr = []
            let CateData = []
            this.contents.forEach(c => {
                cateArr.unshift(c.categroyVal)
            })
            // 去重
            let newCate = new Set(cateArr)
            newCate.forEach(n => {
                let data = []
                this.contents.forEach(c => {
                    if (n === c.categroyVal) {
                        data.push(c)
                    }
                })
                CateData.push({ title: n, data })
            })
            categroy.forEach(v => {
                CateData.forEach(c => {
                    if (c.title === v.name) {
                        c.id = v.url
                    }
                })
            })
            this.newContents = CateData
        },
        // 锚点跳转
        goAnchor (url) {
            const returnEle = document.querySelector(`#${url}`);
            if (!!returnEle) {
                returnEle.scrollIntoView(true);
            }
        },

        compare (property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1
            }
        },
        getLoveTopData () {
            let newContents = [...this.contents]
            let newArr = []
            // 过滤已经过期的
            newContents.forEach(v => {
                if (v.surplusTime > 0) {
                    newArr.push(v)
                }
            })
            this.loveTopData = newArr.sort(this.compare('love')).slice(0, 10)
        },
        // 最新排行
        getNewTopData () {
            let newArr = []
            // 过滤已经过期的
            this.contents.forEach(v => {
                if (v.surplusTime > 0) {
                    newArr.push(v)
                }
            })
            this.newTopData = newArr.slice(0, 10)

        },
        // 标签分类数据
        getScreenTag (tag) {
            let arr = []
            this.contents.forEach(v => {
                if (v.tagVal.includes(tag)) {
                    arr.push(v)
                }
            })
            this.screenTag = arr
        },
        // 获取排行数据
        handleGetTop (item) {
            this.isShow = true
            this.companyInfo = item
            document.body.style.overflow = 'hidden'
        }
    },
    destroyed () {
        clearTimeout(this.timer)
    }
}
</script>

<style>
</style>
