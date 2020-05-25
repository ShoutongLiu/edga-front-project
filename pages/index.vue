<template>
    <div class="container">
        <div class="main">
            <div class="banner-container">
                <banner :banners="banners"></banner>
                <small-img :graphs="graphs"></small-img>
            </div>
            <div class="top-container">
                <top-list></top-list>
            </div>
        </div>
        <div class="list">
            <div class="list-container">
                <!-- 标签分类 -->
                <div class="tag-list">
                    <ul class="tag-box">
                        <li
                            v-for="v in tagData"
                            :key="v"
                            @mouseenter="handleEnter(v)"
                            :class="{active: v === currentTag}"
                        >
                            {{v}}
                        </li>
                    </ul>
                    <div class="tag-item">
                        <div
                            v-for="v in 10"
                            :key="v"
                        >
                            <nav-item @show="handleShow"></nav-item>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav-list">
                <div
                    class="list-box"
                    v-for="v in 5"
                    :key="v"
                >
                    <div class="title">
                        <span>设计公司推荐</span>
                        <span>更多</span>
                    </div>
                    <div class="nav-content">
                        <nav-item
                            v-for="v in 15"
                            :key="v"
                            @show="handleShow"
                        ></nav-item>
                    </div>
                </div>

            </div>
        </div>
        <dialog-show
            :show="isShow"
            @hide="handleHide"
        ></dialog-show>
    </div>
</template>

<script>
import Banner from '../components/Banner'
import SmallImg from '../components/SmallImg'
import TopList from '../components/Top'
import DialogShow from '../components/Dialog'
import NavItem from '../components/NavItem'
export default {
    data () {
        return {
            isShow: false,
            currentTag: '商业',
            tagData: ['商业', '住宅', '办公', '酒店', '医疗', '文旅', '场馆'],
            banners: [],
            graphs: []
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
        return { banners, graphs }
    },
    async mounted () {
        const bannerData = await this.$axios.$get('/banner/get')
        console.log(bannerData);
    },
    methods: {
        handleShow (info) {
            this.isShow = true
            document.body.style.overflow = 'hidden'
        },
        handleEnter (tag) {
            this.currentTag = tag
        },
        handleHide () {
            this.isShow = false
            document.body.style.overflow = 'auto'
        }
    }
}
</script>

<style>
</style>
