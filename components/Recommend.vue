<template>
    <div class="recommend">
        <div class="company">
            <span class="title">推荐 ：</span>
            <img
                v-for="v in rendom"
                :key="v._id"
                :src="v.avatarUrl"
                alt="logo"
                class="logo"
                @click.stop="handleOpenDetail(v)"
            >
        </div>
    </div>
</template>

<script>
import { EventBus } from '../utils/bus'
export default {
    data () {
        return {
            contents: []
        }
    },
    async mounted () {
        // 先从本地存储拿，没有再去请求
        const contentData = localStorage.getItem('contents')
        if (!contentData) {
            const { contents } = await this.$axios.$post('/content/get', { page: 0 })
            this.contents = contents
            return
        }
        this.contents = JSON.parse(contentData)
    },
    computed: {
        rendom () {
            let rendomArr = []
            let numArr = []
            if (this.contents.length === 0) {
                return rendomArr
            }
            let max = this.contents.length > 20 ? 20 : this.contents.length
            // 获取推荐随机数
            while (numArr.length < max) {
                let index = Math.floor(Math.random() * this.contents.length); //随机取一个位置 
                if (!numArr.includes(index)) {
                    numArr.push(index)
                }
            }
            numArr.forEach(v => {
                rendomArr.push(this.contents[v])
            })
            return rendomArr
        }
    },
    methods: {
        handleOpenDetail (item) {
            EventBus.$emit('showDetail', item)
        }
    }
}
</script>

<style>
</style>