<template>
    <header class="header">
        <div class="container header-container">
            <div class="title">
                <h1>
                    <nuxt-link to="/">
                        <img
                            class="logo"
                            src="../static/imgs/edga-pc.png"
                            alt="edga"
                        >
                    </nuxt-link>
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
                        @click="goCate(v.url)"
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
                        <i class="iconfont icon-down"></i>
                    </li>
                    <li class="cate">
                        <nuxt-link to="/join">
                            <span>入驻</span>
                        </nuxt-link>
                    </li>
                </ul>
                <transition name="fade">
                    <div
                        class="station"
                        @mouseenter="isStationShow = true"
                        @mouseleave="isStationShow = false"
                        v-show="isStationShow"
                    >
                        <ul class="station-list">
                            <li
                                v-for="v in station"
                                :key="v.url"
                            >
                                <a
                                    :href="v.url"
                                    target="_blank"
                                >{{v.name}}</a>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>
            <div class="search">
                <input
                    type="text"
                    :class="`search-input ${searchShow ? 'show' :'hide'}`"
                    v-model="searchVal"
                    placeholder="搜索"
                    @mouseenter="handleEnter"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @mouseleave="handleLeave"
                    @keyup.enter="goSearch"
                >
                <i
                    class="iconfont icon-search"
                    @mouseenter="handleEnter"
                    @mouseleave="handleLeave"
                    @click="goSearch"
                    @keyup.enter="goSearch"
                ></i>
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
                            @click="toMore(v)"
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
            isFocus: false,
            searchShow: false,
            isShow: false,
            isStationShow: false,
            searchVal: '',
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
            ],
            station: [
                { name: '首页', url: '11' },
                { name: '专辑', url: '22' },
                { name: '办公室', url: '3' },
                { name: '招聘', url: '44' },
            ],
            tag: [],
            categroy: []
        }
    },
    async mounted () {
        const { tag } = await this.$axios.$post('/tag/get', { page: 0 })
        const { categroy } = await this.$axios.$post('/categroy/get', { page: 0 })
        this.tag = tag
        this.categroy = categroy
        this.$emit('data', { tag, categroy })
    },
    methods: {
        handleDownShow (val) {
            if (val === 'rz') {
                return
            } else if (val === 'fl') {
                this.navList = this.categroy
            } else if (val === 'bq') {
                this.navList = this.tag
            } else if (val === 'zz') {
                this.isStationShow = true
                return
            }
            this.isShow = true
        },
        handleDownHide () {
            this.isShow = false
            this.isStationShow = false
        },
        toMore (v) {
            this.$router.push({ path: `/${v.url}`, query: { key: v.name } })
        },
        goCate (url) {
            this.$emit('anchor', url)
        },
        goSearch () {
            if (!this.searchVal) {
                return
            }
            this.$emit('search', this.searchVal)
            this.$router.push({ path: '/search', query: { name: this.searchVal } })
            this.searchVal = ''
        },
        // 获取焦点事件
        handleFocus () {
            this.isFocus = true
            this.searchShow = true
        },
        handleLeave () {
            if (this.isFocus) {
                return
            }
            this.searchShow = false
        },
        // 鼠标划入
        handleEnter () {
            if (this.isFocus) {
                return
            }
            this.isFocus = false
            this.searchShow = true
        },
        // 失去焦点事件
        handleBlur () {
            this.isFocus = false
            this.searchShow = false
        }
    }
}
</script>
