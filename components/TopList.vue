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
                    v-for="v in loveTop"
                    :key="v._id"
                    @mouseenter="handleEnterLove(v)"
                    @mouseleave="handleLeaveLove"
                >
                    <img
                        :src="v.avatarUrl"
                        alt="logo"
                        class="logo"
                        :class="{big: v._id === loveFirstId}"
                    >
                    <div
                        class="info"
                        :class="{big: v._id === loveFirstId}"
                    >
                        <div class="company-name">{{v.companyName}}</div>
                        <div
                            v-show="v._id === loveFirstId"
                            class="location"
                        >
                            <span class="type">
                                {{v.categroyVal}}
                            </span>
                            <span
                                class="city"
                                v-show="v._id === loveFirstId"
                            >{{v.locationVal.join('、')}}<i class="iconfont icon-location"></i></span>
                        </div>
                    </div>
                    <div
                        class="true"
                        v-show="v._id === loveFirstId"
                    >
                        <img
                            src="~/static/imgs/tui-pc.png"
                            alt="tui"
                            v-if="v.showType.includes('推荐')"
                        >
                        <img
                            src="~/static/imgs/zheng-pc.png"
                            alt="zheng"
                            v-if="v.showType.includes('认证')"
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
                    v-for="v in newTop"
                    :key="v._id"
                    @mouseenter="handleEnterNew(v)"
                    @mouseleave="handleLeaveNew"
                >
                    <img
                        :src="v.avatarUrl"
                        alt="logo"
                        class="logo"
                        :class="{big: v._id === newFirstId}"
                    >
                    <div
                        class="info"
                        :class="{big: v._id === newFirstId}"
                    >
                        <div class="company-name">{{v.companyName}}</div>
                        <div
                            v-show="v._id === newFirstId"
                            class="location"
                        >
                            <span class="type">
                                {{v.categroyVal}}
                            </span>
                            <span
                                class="city"
                                v-show="v._id === newFirstId"
                            >{{v.locationVal.join('、')}}<i class="iconfont icon-location"></i></span>
                        </div>
                    </div>
                    <div
                        class="true"
                        v-show="v._id === newFirstId"
                    >
                        <img
                            src="~/static/imgs/tui-pc.png"
                            alt="tui"
                            v-if="v.showType.includes('推荐')"
                        >
                        <img
                            src="~/static/imgs/zheng-pc.png"
                            alt="zheng"
                            v-if="v.showType.includes('认证')"
                        >
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        newTop: {
            type: Array,
            default: () => {
                return []
            }
        },
        loveTop: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data () {
        return {
            isActive: true,
            currentNewId: '',
            currentLoveId: ''
        }
    },
    computed: {
        newFirstId () {
            let id = ''
            id = this.currentNewId ? this.currentNewId : this.newTop[0]._id
            return id
        },
        loveFirstId () {
            let id = ''
            id = this.currentLoveId ? this.currentLoveId : this.loveTop[0]._id
            return id
        }
    },
    methods: {
        handleEnterNew (v) {
            this.currentNewId = v._id
        },
        handleLeaveNew () {
            this.currentNewId = this.newTop[0]._id
        },
        handleEnterLove (v) {
            this.currentLoveId = v._id
        },
        handleLeaveLove () {
            this.currentLoveId = this.loveTop[0]._id
        }
    }
}
</script>

<style>
</style>