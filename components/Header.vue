<template>
    <header class="header">
        <transition name="fade">
            <div
                class="nav-phone"
                v-show="navPhone"
            >
                <i
                    class="iconfont icon-close"
                    @click="phoneNavHide"
                ></i>
                <div
                    class="search-input-phone"
                    v-show="isSearch"
                >
                    <input
                        type="text"
                        v-model="searchVal"
                        class="input"
                        placeholder="请输入公司名"
                    >
                    <div
                        class="search-btn"
                        @click="handleSearch"
                    >搜索</div>
                </div>
                <ul
                    class="navlist-phone"
                    v-show="isList"
                >
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
                        @click="handleDownShow(v.value, 'phone')"
                    >
                        <span>
                            {{v.name}}
                            <i :class="`iconfont icon-552cc1babd9aa ${isPhoneShow === v.value ? 'down' : ''}`"></i>
                        </span>
                        <!-- 手机标签，类别 -->
                        <ul
                            class="list-down-phone"
                            v-show="isPhoneShow === v.value &&  v.value !== 'zz'"
                        >
                            <li
                                v-for="v in navList"
                                :key="v._id"
                                @click="toMore(v)"
                            >{{v.name}}</li>
                        </ul>
                        <!-- 移动设备显示站点 -->
                        <ul
                            class="list-down-phone"
                            v-show="isStationShow && isPhoneShow === v.value"
                        >
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
                    </li>
                    <li class="cate">
                        <div @click="goJoin">
                            <span>入驻</span>
                        </div>
                    </li>
                </ul>

            </div>
        </transition>
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
                    v-if="clientWidth >= 768"
                >
                    <img
                        class="logo"
                        src="../static/imgs/edga-pc.png"
                        alt="edga"
                    >
                </nuxt-link>
                <nuxt-link
                    to="/"
                    v-else
                >
                    <img
                        class="logo"
                        src="../static/imgs/p-logo.png"
                        alt="edga"
                        style="width: 92px"
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
                    @keyup.enter="goSearch"
                >
                <i
                    class="iconfont icon-search"
                    @mouseenter="handleEnter"
                    @mouseleave="handleLeave"
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
            navPhone: false,
            isList: false,
            isSearch: false,
            isPhoneShow: '',
            searchVal: '',
            clientWidth: 0,
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
        this.clientWidth = document.body.clientWidth    // 获取屏幕宽度
        const { tag } = await this.$axios.$post('/tag/get', { page: 0 })
        const { categroy } = await this.$axios.$post('/categroy/get', { page: 0 })
        this.tag = tag
        this.categroy = categroy
        this.$emit('data', { tag, categroy })
    },
    methods: {
        handleDownShow (val, isPhone) {
            this.isStationShow = false
            if (val === 'rz') {
                return
            } else if (val === 'fl') {
                this.navList = this.categroy
            } else if (val === 'bq') {
                this.navList = this.tag
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
        toMore (v) {
            this.$router.push({ path: `/${v.url}`, query: { key: v.name } })
        },
        goCate (url) {
            this.$emit('anchor', url)
            this.phoneNavHide()
        },
        goSearch () {
            if (this.clientWidth < 1400) {
                this.navPhone = true
                this.isList = false
                this.isSearch = true
                document.body.style.overflow = 'hidden'
                return
            }
            this.handleSearch()
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
            if (this.isFocus && this.clientWidth < 1400) {
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
            this.isList = true
            this.isSearch = false
            document.body.style.overflow = 'hidden'
        },
        // 跳转到入驻
        goJoin () {
            document.body.style.overflow = 'auto'
            this.$router.push('/join')
        }
    }
}
</script>
