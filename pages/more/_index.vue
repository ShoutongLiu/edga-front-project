<template>
    <div>
        <edga-header
            @data="handleGetData"
            @anchor="goAnchor"
            @search="goSearch"
            @toTag="goAnchorTag"
        ></edga-header>
        <div class="container more-container">
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
export default {
    data () {
        return {
            value: '',  // 路由参数
            type: '标签',   // 参数类别
            categroy: [],
            tag: [],
            contents: [],
            recommendData: [],
            companyInfo: {},
            isShow: false,
            time: 0,
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
        const { index } = this.$route.params
        const { url } = this.$route.query
        if (index !== url && index !== 'search') {
            this.$router.push('/notfound')
        }
        // 获取传参
        if (this.$route.query.name) {
            let name = this.$route.query.name
            this.goSearch(name)
            this.type = name
        }
        this.value = this.$route.query.key ? this.$route.query.key : ''
        // 获取Bus传值
        EventBus.$on('showDetail', (item) => {
            this.isShow = true
            this.companyInfo = item
        })
        this.getData()
    },
    methods: {
        // 显示详情
        handleShow (info) {
            this.companyInfo = info
            this.isShow = true
            document.body.style.overflow = 'hidden'
        },
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
            this.recommendData = rendom(contents)
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
            if (this.type === '类别' || this.type === '标签') {
                this.reqJudge(this.type)
            }
        },
        goAnchorTag () {
            this.$router.push({ name: 'index', params: { url: 'tag' } })
        }
    }
}
</script>

<style>
</style>