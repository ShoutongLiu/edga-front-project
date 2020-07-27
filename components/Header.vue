<template>
    <header :class="`header ${navPhone ? 'static' : ''}`">
        <div
            class="search-mask"
            v-show="isPhoneSearch"
        >
            <input
                type="text"
                v-model="searchVal"
                class="p-search"
                placeholder="输入关键字"
                ref="input"
                @keyup.enter="handleSearch"
            >
            <i
                class="iconfont icon-close"
                @click="searchHide"
            ></i>
            <p class="search-tip">输入完按换行开始搜索</p>
        </div>
        <div class="container header-container">
            <div
                class="caidan"
                @click="phoneNavShow"
            >
                <i class="iconfont icon-caidan2"></i>
            </div>
            <div class="title">
                <h1>
                    <nuxt-link to="/">
                        <img
                            class="logo"
                            src="../static/imgs/edga-pc@2.png"
                            alt="edga"
                            style="width: 120px;height: 26px"
                        >
                    </nuxt-link>
                </h1>
            </div>
            <div class="navbar">
                <ul class="navlist">
                    <li @click="$router.push('/')">
                        <span>首页</span>
                    </li>
                    <li @click="toTag">
                        <span>领域</span>
                    </li>
                    <li
                        v-for="v in headerCate"
                        :key="v.id"
                        @click="goCate(v.id)"
                    >
                        <span>{{v.name}}</span>
                    </li>
                    <li
                        class="cate"
                        v-for="v in cateArr"
                        :key="v.key"
                        @mouseenter="handleDownShow(v.value, 'pc')"
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
            <div class="title-middle">
                <nuxt-link
                    to="/"
                    class="hide-768"
                >
                    <img
                        class="logo"
                        src="../static/imgs/edga-pc@2.png"
                        alt="edga"
                        style="width: 120px;height: 26px"
                    >
                </nuxt-link>
                <nuxt-link
                    to="/"
                    class="hide-992"
                >
                    <img
                        class="logo"
                        src="../static/imgs/edga-pc@2.png"
                        alt="edga"
                        style="width: 120px"
                    >
                </nuxt-link>
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
                    @keyup.enter="handleSearch"
                >
                <i
                    class="iconfont icon-search hide-768 hide-only-992"
                    @mouseenter="handleEnter"
                    @mouseleave="handleLeave"
                    @click="handleSearch"
                ></i>
                <i
                    class="iconfont icon-search hide-1400"
                    @click="goSearch"
                ></i>
            </div>
            <!-- PC下拉菜单 -->
            <transition name="fade">
                <div
                    class="hover"
                    @mouseenter="isShow = true"
                    @mouseleave="handleDownHide"
                    v-show="isShow"
                >
                    <ul class="hover-list">
                        <li
                            v-for="v in navList.data"
                            :key="v._id"
                            @click="toMore(v, navList.type)"
                        >{{v.name}}</li>
                    </ul>
                </div>
            </transition>
        </div>
    </header>
</template>

<script>
import { EventBus } from '../utils/bus'
export default {
    data () {
        return {
            isFocus: false,
            searchShow: false,
            isPhoneSearch: false,
            isShow: false,
            isStationShow: false,
            navPhone: false,
            isSearch: false,
            isIos: false,
            isPhoneShow: '',
            searchVal: '',
            clientWidth: 0,
            navList: {
                data: [],
                type: ''
            },
            headerCate: [
                {
                    name: '设计公司',
                    id: 'sjgs'
                },
                {
                    name: '设计师',
                    id: 'designer'
                },
                {
                    name: '制造企业',
                    id: 'zhizao'
                },
                {
                    name: '平台机构',
                    id: 'pingtai'
                },
                {
                    name: '产品耗材',
                    id: 'chanpin'
                }
            ],
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
                { name: '首页', url: 'https://egda.com' },
                { name: '杂志', url: 'https://egda.com/magazine' },
                { name: '专辑', url: 'https://egda.com/Album' },
                { name: '办公室', url: 'https://egda.com/offices' },
                { name: '招聘', url: 'https://egda.com/jobs' },
            ],
            tag: [],
            categroy: []
        }
    },
    async mounted () {
        this.clientWidth = document.body.clientWidth    // 获取屏幕宽度
        const { tag } = await this.$axios.$post('/tag/get', { page: 0 })
        const { categroy } = await this.$axios.$post('/categroy/get', { page: 0 })
        this.tag = tag
        this.categroy = categroy
        this.$emit('data', { tag, categroy })
        this.judgeClient()

        EventBus.$on('sidebarhide', (obj) => {
            this.navPhone = obj.navPhone
            document.body.style.overflow = 'auto'
        })
    },
    methods: {
        handleDownShow (val, isPhone) {
            this.isStationShow = false
            if (val === 'rz') {
                return
            } else if (val === 'fl') {
                this.navList.data = this.categroy
                this.navList.type = 'fl'
            } else if (val === 'bq') {
                this.navList.data = this.tag
                this.navList.type = 'bq'
            } else if (val === 'zz') {
                this.isStationShow = true
                this.isPhoneShow = this.isPhoneShow === val ? "" : val
                return
            }
            if (isPhone === 'pc') {
                this.isShow = true
            } else {
                this.isPhoneShow = this.isPhoneShow === val ? "" : val
            }

        },
        handleDownHide () {
            this.isShow = false
            this.isStationShow = false
        },
        toMore (v, type) {
            this.$router.push({ name: 'design-url', params: { key: v.name, url: v.url } })
        },
        goCate (url) {
            this.$emit('anchor', url)
            this.phoneNavHide()
        },
        goSearch () {
            this.isPhoneSearch = true
            this.$refs.input.focus()
            document.body.style.overflow = 'hidden'
            this.$nextTick(function () {
                this.$refs.input.focus()
            })
        },
        // 开始搜索
        handleSearch () {
            if (!this.searchVal) {
                return
            }
            this.$emit('search', this.searchVal)
            this.$router.push({ path: '/search', query: { name: this.searchVal } })
            this.searchVal = ''
        },
        searchHide () {
            this.isPhoneSearch = false
            document.body.style.overflow = 'auto'
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
        },
        phoneNavHide () {
            this.navPhone = false
            this.isStationShow = false
            this.isPhoneShow = ''
            document.body.style.overflow = 'auto'
        },
        phoneNavShow () {
            this.navPhone = true
            EventBus.$emit('sidebarshow', { navPhone: true, tag: this.tag, cate: this.categroy })
            document.body.style.overflow = 'hidden'
        },
        // 跳转到入驻
        goJoin () {
            document.body.style.overflow = 'auto'
            this.$router.push('/join')
        },
        // 点击领域跳转锚点
        toTag () {
            this.goCate('tag')
        },
        /*判断客户端*/
        judgeClient () {
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
            if (isAndroid) {
                this.isIos = false
            } else if (isIOS) {
                this.isIos = true
            }
        }
    }
}
</script>
