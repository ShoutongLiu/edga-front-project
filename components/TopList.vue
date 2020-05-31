<template>
    <div class="top-container">
        <div class="top-header">
            <div class="hot top"
                 :class="{active: isActive}"
                 @mouseenter="isActive = true">热门行家</div>
            <div class="new top"
                 :class="{active: !isActive}"
                 @mouseenter="isActive = false">最新行家</div>
        </div>
        <div class="top-body"
             v-show="isActive">
            <ul class="top-list">
                <li v-for="v in 10"
                    :key="v"
                    @mouseenter="handleEnter(v)"
                    @mouseleave="handleLeave">
                    <img src="~/static/imgs/cool.png"
                         alt="logo"
                         class="logo"
                         :class="{big: v === itemId}">
                    <div class="info"
                         :class="{big: v === itemId}">
                        <div class="company-name">环图设计</div>
                        <div v-show="v === itemId"
                             class="location">
                            <span class="type">
                                设计公司
                            </span>
                            <span class="city"
                                  v-show="v === itemId">深圳<i class="iconfont icon-location"></i></span>
                        </div>
                    </div>
                    <div class="true"
                         v-show="v === itemId">
                        <img src="~/static/imgs/tui-pc.png"
                             alt="tui">
                        <img src="~/static/imgs/zheng-pc.png"
                             alt="zheng">
                    </div>
                </li>
            </ul>
        </div>
        <div class="top-body"
             v-show="!isActive">
            <ul class="top-list">
                <li v-for="v in newTop"
                    :key="v._id"
                    @mouseenter="handleEnter(v)"
                    @mouseleave="handleLeave">
                    <img :src="v.avatarUrl"
                         alt="logo"
                         class="logo"
                         :class="{big: v._id === newFirstId}">
                    <div class="info"
                         :class="{big: v._id === newFirstId}">
                        <div class="company-name">{{v.companyName}}</div>
                        <div v-show="v._id === newFirstId"
                             class="location">
                            <span class="type">
                                {{v.categroyVal}}
                            </span>
                            <span class="city"
                                  v-show="v._id === newFirstId">深圳<i class="iconfont icon-location"></i></span>
                        </div>
                    </div>
                    <div class="true"
                         v-show="v._id === newFirstId">
                        <img src="~/static/imgs/tui-pc.png"
                             alt="tui"
                             v-if="v.showType.includes('推荐')">
                        <img src="~/static/imgs/zheng-pc.png"
                             alt="zheng"
                             v-if="v.showType.includes('认证')">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        newTop: Array
    },
    data () {
        return {
            isActive: true,
            itemId: 1,
            newFirstId: this.newTop[0]._id
        }
    },
    methods: {
        handleEnter (v) {
            this.newFirstId = v._id
        },
        handleLeave () {
            this.newFirstId = this.newTop[0]._id
        }
    }
}
</script>

<style>
</style>