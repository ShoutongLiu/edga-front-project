<template>
    <transition name="fadeside">
        <div :class="`side-bar ${navPhone  ? 'show' : ''}`"
             v-if="clientWidth < 1400">
            <div class="nav-phone">
                <div class="p-header">
                    <img class="logo"
                         src="../static/imgs/edga-pc@2.png"
                         alt="edga"
                         style="width: 120px;">
                    <i class="iconfont icon-close"
                       @click="phoneNavHide"></i>
                </div>
                <ul class="navlist-phone">
                    <li @click="$router.push('/')"
                        style="color: #a0a0a0">
                        <span>首页</span>
                    </li>
                    <li @click="toTag">
                        <span>领域</span>
                    </li>
                    <li v-for="v in headerCate"
                        :key="v.id"
                        @click="goCate(v.id)">
                        <span>{{v.name}}</span>
                    </li>
                    <li class="cate"
                        v-for="v in cateArr"
                        :key="v.key"
                        @click="handleDownShow(v.value, 'phone')">
                        <span>
                            {{v.name}}
                            <i :class="`iconfont icon-552cc1babd9aa ${isPhoneShow === v.value ? 'down' : ''}`"></i>
                        </span>
                        <!-- 手机标签，类别 -->
                        <ul class="list-down-phone"
                            v-show="isPhoneShow === v.value &&  v.value !== 'zz'">
                            <li v-for="v in navList.data"
                                :key="v._id"
                                @click="toMore(v, navList.type)">{{v.name}}</li>
                        </ul>
                        <!-- 移动设备显示站点 -->
                        <ul class="list-down-phone"
                            v-show="isStationShow && isPhoneShow === v.value">
                            <li v-for="v in station"
                                :key="v.url">
                                <a :href="v.url"
                                   target="_blank">{{v.name}}</a>
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
        </div>
    </transition>
</template>

<script>
import { EventBus } from '../utils/bus'
export default {
    data () {
        return {
            isShow: false,
            isStationShow: false,
            navPhone: false,
            isPhoneShow: '',
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
                    id: 'sjs'
                },
                {
                    name: '制造企业',
                    id: 'zzqy'
                },
                {
                    name: '平台机构',
                    id: 'ptjg'
                },
                {
                    name: '产品耗材',
                    id: 'cphc'
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

        EventBus.$on('sidebarshow', (obj) => {
            this.navPhone = obj.navPhone
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
            this.$router.push({ path: `/more/${v.url}`, query: { key: v.name, url: v.url, type } })
        },
        goCate (url) {
            this.$emit('anchor', url)
            this.phoneNavHide()
        },
        phoneNavHide () {
            this.navPhone = false
            EventBus.$emit('sidebarhide', { navPhone: false })
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
        },
        // 点击领域跳转锚点
        toTag () {
            this.$emit('toTag')
        }
    }
}
</script>
