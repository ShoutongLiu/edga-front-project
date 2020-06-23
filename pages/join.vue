<template>
    <div class="join-container">
        <egda-header @anchor="goAnchor"></egda-header>
        <div class="introduce">
            <div class="title">关于</div>
            <div class="about">
                <p class="p1">
                    环图设计是一家专业提供环境品牌体验设计一体化解决方案的服务商，
                    是环图网旗下全资子品牌，总部位于深圳并服务全国的体验设计机构。
                    环图设计是一家专业提供环境品牌体验设计一体化解决方案的服务商，
                    是环图网旗下全资子品牌，总部位于深圳并服务全国的体验设计机构。</p>
                <p class="p2">
                    我们专注环境体验领域的研究、规划和设计，构建图形视觉文化和标识导向系统，
                    重新定义人与建筑环境之间的交流和互动。我们拥有一支跨多学科策略思维、卓越创意和丰富实战经验相结合的团队，
                    为客户提供多元、专业的服务，提升环境空间价值，实现品牌战略传播。
                    我们专注环境体验领域的研究、规划和设计，构建图形视觉文化和标识导向系统，
                    重新定义人与建筑环境之间的交流和互动。我们拥有一支跨多学科策略思维、卓越创意和丰富实战经验相结合的团队，
                    为客户提供多元、专业的服务，提升环境空间价值。
                </p>
            </div>
            <div class="title">套餐价格</div>
            <div class="price">
                <p class="p3">专业平台+全网流量，为您提高企业的爆光率和提升品牌的影响力，助力您实现业务增长率。</p>
                <div class="table">
                    <div
                        class="table-item"
                        v-for="v in tableData"
                        :key="v.price"
                    >
                        <div class="item-title">
                            <span class="hj">{{v.title}}行家</span>
                            <span class="num">{{v.price}}</span>
                            <span class="time">元/年</span>
                        </div>
                        <ul class="item-list">
                            <li
                                v-for="p in v.detail"
                                :key="p.text"
                            >
                                <span class="text">{{p.text}}</span>
                                <span
                                    class="val"
                                    v-if="p.text === '图片数量' 
                                      || p.text === '位置' 
                                      || (p.text === '微信公众号推广' && p.value === '一次')"
                                >
                                    {{p.value}}
                                </span>
                                <i
                                    v-else
                                    :class="`iconfont icon-${p.value ? 'gou' : 'close'}`"
                                ></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="title">购买流程</div>
            <div>
                <p>专业平台+全网流量，为您提高企业的爆光率和提升品牌的影响力，助力您实现业务增长率。</p>
            </div>
            <div class="title">规则须知</div>
            <div>
                <p class="p1">
                    环图设计是一家专业提供环境品牌体验设计一体化解决方案的服务商，
                    是环图网旗下全资子品牌，总部位于深圳并服务全国的体验设计机构。
                    环图设计是一家专业提供环境品牌体验设计一体化解决方案的服务商，
                    是环图网旗下全资子品牌，
                    总部位于深圳并服务全国的体验设计机构。</p>
                <p class="p2">
                    我们专注环境体验领域的研究、规划和设计，
                    构建图形视觉文化和标识导向系统，
                    重新定义人与建筑环境之间的交流和互动。
                    我们拥有一支跨多学科策略思维、卓越创意和丰富实战经验相结合的团队，
                    为客户提供多元、专业的服务，提升环境空间价值，
                    实现品牌战略传播。我们专注环境体验领域的研究、规划和设计，
                    构建图形视觉文化和标识导向系统，
                    重新定义人与建筑环境之间的交流和互动。
                    我们拥有一支跨多学科策略思维、卓越创意和丰富实战经验相结合的团队，
                    为客户提供多元、专业的服务，提升环境空间价值。
                </p>
            </div>
            <div class="title">版权</div>
            <div>
                <p class="p1">
                    环图设计是一家专业提供环境品牌体验设计一体化解决方案的服务商，
                    是环图网旗下全资子品牌，总部位于深圳并服务全国的体验设计机构。
                    环图设计是一家专业提供环境品牌体验设计一体化解决方案的服务商，
                    是环图网旗下全资子品牌，总部位于深圳并服务全国的体验设计机构。
                </p>
                <p class="p2">
                    我们专注环境体验领域的研究、规划和设计，
                    构建图形视觉文化和标识导向系统，重新定义人与建筑环境之间的交流和互动。
                    我们拥有一支跨多学科策略思维、卓越创意和丰富实战经验相结合的团队，
                    为客户提供多元、专业的服务，提升环境空间价值，实现品牌战略传播。
                    我们专注环境体验领域的研究、规划和设计，构建图形视觉文化和标识导向系统，
                    重新定义人与建筑环境之间的交流和互动。
                    我们拥有一支跨多学科策略思维、卓越创意和丰富实战经验相结合的团队，
                    为客户提供多元、专业的服务，提升环境空间价值。
                </p>
            </div>
            <div class="title">免责</div>
            <div>
                <p class="p1">
                    环图设计是一家专业提供环境品牌体验设计一体化解决方案的服务商，
                    是环图网旗下全资子品牌，总部位于深圳并服务全国的体验设计机构。
                    环图设计是一家专业提供环境品牌体验设计一体化解决方案的服务商，
                    是环图网旗下全资子品牌，总部位于深圳并服务全国的体验设计机构。
                </p>
                <p class="p2">
                    我们专注环境体验领域的研究、规划和设计，
                    构建图形视觉文化和标识导向系统，
                    重新定义人与建筑环境之间的交流和互动。
                    我们拥有一支跨多学科策略思维、卓越创意和丰富实战经验相结合的团队，
                    为客户提供多元、专业的服务，提升环境空间价值，实现品牌战略传播。
                    我们专注环境体验领域的研究、规划和设计，
                    构建图形视觉文化和标识导向系统，
                    重新定义人与建筑环境之间的交流和互动。
                    我们拥有一支跨多学科策略思维、卓越创意和丰富实战经验相结合的团队，
                    为客户提供多元、专业的服务，提升环境空间价值。
                </p>
            </div>
            <div class="title">联系我们</div>
            <div class="contact">
                <p>邮箱：egda@egda.com</p>
                <p>Q Q：2750426350</p>
                <p>微信</p>
                <img
                    src="~/static/imgs/edga.png"
                    alt="wechat"
                >
            </div>
        </div>
    </div>
</template>
<script>
import EgdaHeader from '../components/Header'
import data from '../utils/peiceTable'
import { EventBus } from '../utils/bus'
export default {
    data () {
        return {
            tableData: data
        }
    },
    components: { EgdaHeader },
    mounted () {
        // 移动端锚点跳转
        EventBus.$on('anchor', (url) => {
            this.goAnchor(url)
        })
    },
    methods: {
        goAnchor (url) {
            this.$router.push({ name: 'index', params: { url } })
        }
    }
}
</script>