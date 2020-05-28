<template>
    <div class="container">
        <div class="main">
            <div class="banner-container">
                <banner :banners="banners"></banner>
                <small-img :graphs="graphs"></small-img>
            </div>
            <div class="top-container">
                <top-list :newTop="newTopData"></top-list>
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
                            :class="{active: v.name === currentTag}"
                        >
                            {{v.name}}
                        </li>
                    </ul>
                    <div class="tag-item">
                        <div
                            v-for="v in screenTag"
                            :key="v._id"
                            class="item-box"
                        >
                            <nav-item
                                @show="handleShow"
                                :item="v"
                            ></nav-item>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav-list">
                <div
                    class="list-box"
                    v-for="v in cateData"
                    :key="v.title"
                >
                    <div class="title">
                        <span>{{v.title}}推荐</span>
                        <span @click="toMore(v.title)">更多</span>
                    </div>
                    <div class="nav-content">
                        <div
                            v-for="i in v.data"
                            :key="i._id"
                            class="item-box"
                        >
                            <nav-item
                                @show="handleShow"
                                :item="i"
                            ></nav-item>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <dialog-show
            :info="companyInfo"
            :show="isShow"
            :contents="contents"
            @hide="handleHide"
        ></dialog-show>
    </div>
</template>

<script>
import Banner from '../components/Banner'
import SmallImg from '../components/SmallImg'
import TopList from '../components/TopList'
import DialogShow from '../components/Dialog'
import NavItem from '../components/NavItem'
import { EventBus } from '../utils/bus'
export default {
    data () {
        return {
            isShow: false,
            currentTag: '商业',
            banners: [],
            graphs: [],
            tag: [],
            contents: [],
            categroy: [],
            companyInfo: {}
        }
    },
    components: {
        Banner,
        SmallImg,
        TopList,
        DialogShow,
        NavItem
    },
    async asyncData ({ $axios }) {
        const { banners } = await $axios.$get('/banner/get')
        const { graphs } = await $axios.$get('/graph/get')
        const { tag } = await $axios.$post('/tag/get', { page: 0 })
        const { contents } = await $axios.$post('/content/get', { page: 0 })
        const { categroy } = await $axios.$post('/categroy/get', { page: 0 })
        return { banners, graphs, tag, contents, categroy }
    },
    async mounted () {
        // 获取Bus传值
        EventBus.$on('showDetail', (item) => {
            this.companyInfo = item
        })
    },
    computed: {
        // 标签分类
        screenTag: function () {
            let arr = []
            this.contents.forEach(v => {
                if (v.tagVal.includes(this.currentTag)) {
                    arr.push(v)
                }
            })
            return arr
        },
        // 最新排行
        newTopData: function () {
            return this.contents.slice(0, 9)
        },
        // 分类数据
        cateData: function () {
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
            return CateData
        }
    },
    methods: {
        // 显示详情
        handleShow (info) {
            console.log(info);
            this.companyInfo = info
            this.isShow = true
            document.body.style.overflow = 'hidden'
        },
        handleEnter (tag) {
            console.log(tag);
            this.currentTag = tag
        },
        handleHide () {
            this.isShow = false
            document.body.style.overflow = 'auto'
        },
        toMore (title) {
            let url = ''
            this.categroy.forEach(v => {
                if (v.name === title) {
                    url = v.url
                }
            })
            this.$router.push(`/${url}`)
        }
    }
}
</script>

<style>
</style>
