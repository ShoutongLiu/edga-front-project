<template>
<div class="join-container">
    <egda-header @anchor="goAnchor"></egda-header>
    <!-- 专业行家 -->
    <div class="major">
        <div class="center">
            <div class="title">
                <span>行家，</span>
                <span>专业平台助力行业专家</span>
            </div>
            <p>EGDA行家是环境图形设计行业商务推广展示平台，为甲方、需求方提供国内外最专业的设计公司、设计师、制造企业、产品及耗材等供应服务商信息搜索。EGDA行家以企业信息展示为主，通过专业化运营和高质量的生态流量共享，为行业内的企业、专家提供更多的品牌曝光机会，同时，减少推广成本、提升竞争力、实现业务增长率。</p>
            <img src="../static/imgs/lr@2x.jpg" alt="lr" class="lr">
        </div>
    </div>
    <!-- 套餐价格 -->
    <div class="price">
        <h2 class="title">套餐价格</h2>
        <p class="p3">专业平台+全网流量，为您提高企业的爆光率和提升品牌的影响力，助力您实现业务增长率。</p>
        <div class="table">
            <div class="table-item" v-for="v in tableData" :key="v.price">
                <div class="item-title">
                    <span class="hj">{{v.title}}行家</span>
                    <span class="num">{{v.price}}</span>
                    <span class="time">元/年</span>
                    <img src="../static/imgs/limit@2.png" alt="limit" class="limit">
                </div>
                <ul class="item-list">
                    <li v-for="p in v.detail" :key="p.text">
                        <span class="text">{{p.text}}</span>
                        <span class="val" v-if="p.text === '图片数量' 
                                      || p.text === '位置' 
                                      || (p.text === '微信公众号推广' && p.value === '一次')">
                            {{p.value}}
                        </span>
                        <i v-else :class="`iconfont icon-${p.value ? 'gou' : 'close'}`"></i>
                    </li>
                </ul>
                <div class="check" @click="chaeckDemo(v.title)">查看实例</div>
            </div>
        </div>
    </div>
    <!-- 购买流程 -->
    <div class="buy">
        <h1 class="title">购买流程</h1>
        <p class="text">选择服务套餐 — 支付套餐费用 — 填写及提交资料 — 资料审核 — 完成</p>
        <img src="../static/imgs/laotan.png" alt="wechat" class="wechat">
        <p class="wx-chat">微信咨询</p>
        <a href="https://hangjia.egda.com:3000/files/2020年EGDA行家入驻资料提交表格.xlsx" download class="download">下载资料</a>
    </div>
    <!-- 规则需知 -->
    <div class="rule">
        <h1 class="title">规则需知</h1>
        <div class="rule-content">
            <p class="p1">
                EGDA行家网站为您提供的信息展示服务为付费服务，我们通过主站、微信公众号及EGDA其它官网社交平台引流，来实现对您的推广；我们不享受流量给您来的收益，也不承担流量所带来的风险和损失，一切责任由用户自行承担。
            </p>
            <div class="rules">
                <p v-for="item in rules" :key="item.id" :class="`rule-${item.id}`">{{item.rule}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import EgdaHeader from '../components/Header'
import {
    data,
    rulesData
} from '../utils/peiceTable'
import {
    EventBus
} from '../utils/bus'
import {
    setLocal
} from '../utils/localStorge'
export default {
    data() {
        return {
            tableData: data,
            rules: rulesData
        }
    },
    components: {
        EgdaHeader
    },
    mounted() {
        document.title = 'EGDA行家 | 环境图形设计行业专家信息搜索平台'
        // 移动端锚点跳转
        EventBus.$on('anchor', (url) => {
            this.goAnchor(url)
        })
    },
    methods: {
        goAnchor(url) {
            this.$router.push({
                name: 'index',
                params: {
                    url
                }
            })
        },
        // 查看实例
        chaeckDemo(title) {
            // 设置本地存储
            setLocal('title', title)
            switch (title) {
                case '普通':
                    this.$router.push('/hangjiaru')
                    break
                case '认证':
                    this.$router.push('/tanxiansheng')
                    break
                case '推荐':
                    this.$router.push('/EGDESIGN环图设计')
                    break
            }
        },
    }
}
</script>
