<template>
    <header class="header">
        <div class="container header-container">
            <div class="title">
                <h1>
                    <img
                        class="logo"
                        src="../static/edga-pc.png"
                        alt="edga"
                    >
                </h1>
            </div>
            <div class="navbar">
                <ul class="navlist">
                    <li>
                        <span>首页</span>
                    </li>
                    <li>
                        <span>领域</span>
                    </li>
                    <li
                        v-for="v in categroy"
                        :key="v._id"
                    >
                        <span>{{v.name}}</span>
                    </li>
                    <li
                        class="cate"
                        v-for="v in cateArr"
                        :key="v.key"
                        @mouseenter="handleDownShow"
                        @mouseleave="handleDownHide"
                    >
                        <span> {{v.name}}</span>
                        <i
                            class="iconfont icon-down"
                            v-if="v.name !== '入驻'"
                        ></i>
                    </li>
                </ul>
            </div>
            <div class="search">
                <input
                    type="text"
                    class="search-input"
                    v-model="searchVal"
                    placeholder="搜索"
                >
                <i class="iconfont icon-search"></i>
            </div>
            <transition name="fade">
                <div
                    class="hover"
                    @mouseenter="handleDownShow"
                    @mouseleave="handleDownHide"
                    v-show="isShow"
                >
                    <ul class="hover-list">
                        <li>设计公司</li>
                        <li>设计公司</li>
                        <li>设计公司</li>
                        <li>设计公司</li>
                        <li>设计公司</li>
                        <li>设计公司</li>
                        <li>设计公司</li>
                    </ul>
                </div>
            </transition>
        </div>
    </header>
</template>

<script>
export default {
    data () {
        return {
            isShow: false,
            searchVal: '',
            categroy: [],
            cateArr: [
                {
                    name: '分类',
                    value: 'fl'
                },
                {
                    name: '标签',
                    value: 'bq'
                },
                {
                    name: '主站',
                    value: 'zz'
                },
                {
                    name: '入驻',
                    value: 'rz'
                }
            ]
        }
    },
    async mounted () {
        const { categroy } = await this.$axios.$post('/categroy/get', { page: 0 })
        this.categroy = categroy
    },
    methods: {
        handleDownShow () {
            this.isShow = true
        },
        handleDownHide () {
            this.isShow = false
        }
    }
}
</script>
