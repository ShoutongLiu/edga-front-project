<template>
    <header class="header">
        <div class="container header-container">
            <div class="title">
                <h1>EDGA行家</h1>
            </div>
            <div class="navbar">
                <ul class="navlist">
                    <li
                        v-for="v in navArr"
                        :key="v.key"
                    ><span>{{v.name}}</span></li>
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
                    placeholder="搜素"
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
            navArr: [
                {
                    name: '首页',
                    value: 'sy'
                },
                {
                    name: '领域',
                    value: 'ly'
                },
                {
                    name: '设计公司',
                    value: 'skgs'
                },
                {
                    name: '设计师',
                    value: 'sjs'
                },
                {
                    name: '制造企业',
                    value: 'zzqy'
                },
                {
                    name: '平台机构',
                    value: 'ptjg'
                },
                {
                    name: '产品耗材',
                    value: 'cphc'
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
                {
                    name: '入驻',
                    value: 'rz'
                }
            ]
        }
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
