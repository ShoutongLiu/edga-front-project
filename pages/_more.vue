<template>
    <div>
        <edga-header
            @data="handleGetData"
            @anchor="goAnchor"
            @search="goSearch"
        ></edga-header>
        <div class="container more-container">
            <!-- <div class="search">
                <input
                    type="text"
                    class="search-input"
                    v-model="searchVal"
                    placeholder="输入公司名搜索"
                >
                <div
                    class="search-icon"
                    @click="goSearch"
                >
                    <i class="iconfont icon-search"></i>
                </div>
            </div> -->
            <div class="content">
                <div
                    class="title"
                    v-if="contents.length !== 0"
                >
                    <span>{{type}}:</span>
                    <span>{{value}}</span>
                    <span class="count">{{contents.length}}</span>个
                </div>
                <div
                    class="title"
                    v-if="contents.length === 0"
                >
                    抱歉，找不到任何结果。以下推荐的行家您可能会喜欢！
                </div>
                <div class="cate-data">
                    <nav-item
                        v-for="v in contents"
                        :key="v._id"
                        :item="v"
                        @setTime="handleIsView"
                        @show="handleShow"
                    ></nav-item>
                </div>
            </div>
            <recommend></recommend>
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
import edgaHeader from '../components/Header'
import NavItem from '../components/NavItem'
import recommend from '../components/Recommend'
import DialogShow from '../components/Dialog'
import { EventBus } from '../utils/bus'
export default {
    data () {
        return {
            value: '',  // 路由参数
            type: '标签',   // 参数类别
            categroy: [],
            tag: [],
            contents: [],
            companyInfo: {},
            isShow: false,
            time: 0
        }
    },
    components: {
        edgaHeader,
        NavItem,
        recommend,
        DialogShow
    },
    mounted () {
        // 获取传参
        if (this.$route.query.name) {
            let name = this.$route.query.name
            this.goSearch(name)
            this.type = name
            return
        }
        this.value = this.$route.query.key
        // 获取Bus传值
        EventBus.$on('showDetail', (item) => {
            this.isShow = true
            this.companyInfo = item
        })
    },
    methods: {
        // 显示详情
        handleShow (info) {
            this.companyInfo = info
            this.isShow = true
            document.body.style.overflow = 'hidden'
            // 时间差大于0 ，不请求
            if (this.time > 0) {
                return
            }
            // 重新请求
            if (this.type !== '标签' || this.type !== '类别') {
                let name = this.$route.query.name
                this.goSearch(name)
            }
            this.reqJudge(this.type)
        },
        handleHide () {
            this.isShow = false
            document.body.style.overflow = 'auto'
        },
        // 获取时间差
        handleIsView (time) {
            this.time = time
        },
        async reqJudge (type) {
            if (type === '类别') {
                const { contents } = await this.$axios.$post('/content/cate', { cate: { categroyVal: this.value } })
                this.changeIndex(contents)
            } else {
                const { contents } = await this.$axios.$post('/content/tag', { tag: { tagVal: this.value } })
                this.changeIndex(contents)
            }
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
            this.contents = data
        },
        handleGetData ({ tag, categroy }) {
            this.tag = tag
            this.categroy = categroy
            this.handleJudge(this.value, this.categroy)
        },

        // 判断是类别还是标签
        handleJudge (value, categroy) {
            let arr = []
            categroy.forEach(v => {
                arr.push(v.name)
            })
            // 获取类别
            if (arr.includes(value)) {
                this.type = '类别'
            }
            this.reqJudge(this.type)
        }
    }
}
</script>

<style>
</style>