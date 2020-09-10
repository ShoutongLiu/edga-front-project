<template>
    <div>
        <div
            class="mask"
            v-show="navPhone"
            @click="phoneNavHide"
        ></div>
        <div :class="`hide-1024 side-bar ${navPhone  ? 'show' : ''}`">
            <div class="nav-phone">
                <div class="p-header">
                    <img
                        class="logo"
                        src="../static/imgs/edga-pc@2.png"
                        alt="edga"
                        style="width: 120px;"
                    >
                    <i
                        class="iconfont icon-close"
                        @click="phoneNavHide"
                    ></i>
                </div>
                <ul class="navlist-phone">
                    <li
                        class="item-li"
                        @click="goHome"
                        style="color: #a0a0a0"
                    >
                        <span>首页</span>
                    </li>
                    <li
                        @click="goCate('tag')"
                        class="item-li"
                    >
                        <span>领域</span>
                    </li>
                    <li
                        class="item-li"
                        v-for="v in headerCate"
                        :key="v.id"
                        @click="goCate(v.id)"
                    >
                        <span>{{v.name}}</span>
                    </li>
                    <li
                        class="cate item-li"
                        v-for="v in cateArr"
                        :key="v.key"
                    >
                        <span
                            class="down-li"
                            @click="handleDownShow(v.value, 'phone')"
                        >
                            <span>{{v.name}}</span>
                            <i :class="`iconfont icon-down ${isPhoneShow === v.value ? 'down' : ''}`"></i>
                        </span>
                        <!-- 手机标签，类别 -->
                        <ul
                            class="list-down-phone"
                            v-show="isPhoneShow === v.value &&  v.value !== 'zz'"
                        >
                            <li
                                class="li-child"
                                v-for="v in navList.data"
                                :key="v._id"
                                @click="toMore(v, navList.type)"
                            >{{v.name}}</li>
                        </ul>
                        <!-- 移动设备显示站点 -->
                        <ul
                            class="list-down-phone"
                            v-show="isStationShow && isPhoneShow === v.value"
                        >
                            <li
                                class="li-child"
                                v-for="v in station"
                                :key="v.url"
                                @click="dropOther(v.url)"
                            >
                                {{v.name}}
                            </li>
                        </ul>
                    </li>
                    <li class="item-li">
                        <div @click="goJoin">
                            <span>入驻</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import { EventBus } from '../utils/bus'
export default {
    data () {
        return {
            isShow: false,
            isDownShow: false,
            isStationShow: false,
            navPhone: false,
            isPhoneShow: '',
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
        EventBus.$on('sidebarshow', (obj) => {
            this.navPhone = obj.navPhone
            this.tag = obj.tag
            this.categroy = obj.cate
        })
    },
    methods: {
        handleDownShow (val, isPhone) {
            this.isStationShow = false
            if (val === 'rz') {
                return
            } else if (val === 'fl') {
                this.navList.data = this.categroy
                this.navList.type = 'categroy'
            } else if (val === 'bq') {
                this.navList.data = this.tag
                this.navList.type = 'tag'
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
            this.phoneNavHide()
            this.$router.push({ name: `${type}-url`, params: { key: v.name, url: v.url, type } })
        },
        goCate (url) {
            EventBus.$emit('anchor', url)
            this.phoneNavHide()
        },
        // 关闭侧边栏
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
            this.phoneNavHide()
            document.body.style.overflow = 'auto'
            this.$router.push('/join')
        },
        // 跳转主站链接
        dropOther (url) {
            this.phoneNavHide()
            window.open(url, '_blank');
        },
        goHome () {
            this.phoneNavHide()
            this.$router.push('/')
        }
    }
}
</script>
