<template>
    <div class="top-container">
        <div class="top-header">
            <div
                class="hot top"
                :class="{active: isActive}"
                @mouseenter="isActive = true"
            >热门行家</div>
            <div
                class="new top"
                :class="{active: !isActive}"
                @mouseenter="isActive = false"
            >最新行家</div>
        </div>
        <div
            class="top-body"
            v-show="isActive"
        >
            <ul class="top-list">
                <li
                    v-for="v in 10"
                    :key="v"
                    @mouseenter="handleEnter(v)"
                    @mouseleave="handleLeave"
                >
                    <img
                        src="~/assets/cool.png"
                        alt="logo"
                        class="logo"
                        :class="{big: v === itemId}"
                    >
                    <div
                        class="info"
                        :class="{big: v === itemId}"
                    >
                        <div class="company-name">环图设计</div>
                        <div
                            v-show="v === itemId"
                            class="location"
                        >
                            <span class="type">
                                设计公司
                            </span>
                            <span
                                class="city"
                                v-show="v === itemId"
                            >深圳<i class="iconfont icon-location"></i></span>
                        </div>
                    </div>
                    <div
                        class="true"
                        v-show="v === itemId"
                    >
                        <img
                            src="~/assets/tui-pc.png"
                            alt="tui"
                        >
                        <img
                            src="~/assets/zheng-pc.png"
                            alt="zheng"
                        >
                    </div>
                </li>
            </ul>
        </div>
        <div
            class="top-body"
            v-show="!isActive"
        >
            <ul class="top-list">
                <li
                    v-for="v in 10"
                    :key="v"
                    @mouseenter="handleEnter(v)"
                    @mouseleave="handleLeave"
                >
                    <img
                        src="~/assets/bwg.png"
                        alt="logo"
                        class="logo"
                        :class="{big: v === itemId}"
                    >
                    <div
                        class="info"
                        :class="{big: v === itemId}"
                    >
                        <div class="company-name">环图设计</div>
                        <div
                            v-show="v === itemId"
                            class="location"
                        >
                            <span class="type">
                                设计公司
                            </span>
                            <span
                                class="city"
                                v-show="v === itemId"
                            >深圳<i class="iconfont icon-location"></i></span>
                        </div>
                    </div>
                    <div
                        class="true"
                        v-show="v === itemId"
                    >
                        <img
                            src="~/assets/tui-pc.png"
                            alt="tui"
                        >
                        <img
                            src="~/assets/zheng-pc.png"
                            alt="zheng"
                        >
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isActive: true,
            itemId: 1
        }
    },
    methods: {
        handleEnter (id) {
            this.itemId = id
        },
        handleLeave () {
            this.itemId = 1
        }
    }
}
</script>

<style>
</style>