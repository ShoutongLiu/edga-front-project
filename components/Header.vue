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
                    <li
                        @click="$router.push('/')"
                        style="color: #a0a0a0"
                    >
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
                        @mouseenter="handleDownShow(v.value)"
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
                        <li
                            v-for="v in navList"
                            :key="v._id"
                            @click="toMore(v.url)"
                        >{{v.name}}</li>
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
            tag: [],
            navList: [],
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
        const { tag } = await this.$axios.$post('/tag/get', { page: 0 })
        this.categroy = categroy
        this.tag = tag
    },
    methods: {
        handleDownShow (val) {
            if (val === 'rz') {
                return
            } else if (val === 'fl') {
                this.navList = this.categroy
            } else if (val === 'bq') {
                this.navList = this.tag
            }
            this.isShow = true
        },
        handleDownHide () {
            this.isShow = false
        },
        toMore (url) {
            this.$router.push(`/${url}`)
        }
    }
}
</script>
