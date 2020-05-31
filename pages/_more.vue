<template>
    <div>
        <edga-header @data="handleGetData"
                     @anchor="goAnchor"></edga-header>
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
                <div class="title"
                     v-if="contents.length !== 0">
                    <span>{{type}}:</span>
                    <span>{{value}}</span>
                    <span class="count">{{contents.length}}</span>个
                </div>
                <div class="title"
                     v-if="contents.length === 0">
                    抱歉，找不到任何结果。以下推荐的行家您可能会喜欢！
                </div>
                <div class="cate-data">
                    <nav-item v-for="v in contents"
                              :key="v._id"
                              :item="v"
                              @show="handleShow"></nav-item>
                </div>
            </div>
            <recommend></recommend>
        </div>
        <dialog-show :info="companyInfo"
                     :show="isShow"
                     :contents="contents"
                     @hide="handleHide"></dialog-show>
    </div>
</template>

<script>
import edgaHeader from '../components/Header'
import NavItem from '../components/NavItem'
import recommend from '../components/Recommend'
import DialogShow from '../components/Dialog'
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

        let arr = []
        this.categroy.forEach(v => {
            arr.push(v.name)
        })
        // 获取类别
        if (arr.includes(this.value)) {
            this.type = '类别'
        }
        this.reqJudge(this.type)
    },
    methods: {
        // 显示详情
        handleShow (info) {
            console.log(info);
            this.companyInfo = info
            this.isShow = true
            document.body.style.overflow = 'hidden'
        },
        handleHide () {
            this.isShow = false
            document.body.style.overflow = 'auto'
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
        goSearch (name) {
            let dataArr = []
            const contents = JSON.parse(localStorage.getItem('contents'))
            console.log(contents);
            contents.forEach(v => {
                if (v.companyName.includes(name)) {
                    dataArr.push(v)
                }
            })
            this.changeIndex(dataArr)
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
        }
    }
}
</script>

<style>
</style>