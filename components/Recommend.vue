<template>
    <div class="recommend">
        <div class="company">
            <span class="title">推荐 ：</span>
            <img
                v-for="v in rendomData"
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
let setTime = 1000 * 10
export default {
    data () {
        return {
            contents: [],
            rendomData: []
        }
    },
    mounted () {
        this.getData()
    },

    methods: {
        async handleOpenDetail (item) {
            console.log(item);
            // 求出时间差
            let time = item.commitTime - new Date().getTime()
            console.log(time);
            let currentTimer = item.commitTime === 0 || time < 0 ? setTime : time
            console.log(currentTimer);
            if (time > 0) {
                return
            }
            // 深拷贝
            let updateObj = JSON.parse(JSON.stringify(item))
            updateObj.views += 1
            updateObj.commitTime = new Date().getTime() + setTime
            console.log(updateObj);
            const { isUpdate } = await this.$axios.$post('/content/update', updateObj)
            this.getData()
            EventBus.$emit('showDetail', updateObj)
        },
        async getData () {
            // 先从本地存储拿，没有再去请求
            const contentData = localStorage.getItem('contents')
            if (!contentData) {
                const { contents } = await this.$axios.$post('/content/get', { page: 0 })
                this.contents = contents
                return
            }
            this.contents = JSON.parse(contentData)
            this.rendom(this.contents)
        },
        rendom (contents) {
            let rendomArr = []
            let numArr = []
            if (contents.length === 0) {
                return rendomArr
            }
            let max = contents.length > 20 ? 20 : contents.length
            // 获取推荐随机数
            while (numArr.length < max) {
                let index = Math.floor(Math.random() * contents.length); //随机取一个位置 
                if (!numArr.includes(index)) {
                    numArr.push(index)
                }
            }
            numArr.forEach(v => {
                rendomArr.push(contents[v])
            })
            this.rendomData = rendomArr
        }
    }
}
</script>

<style>
</style>