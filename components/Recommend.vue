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
    props: {
        content: Array
    },
    computed: {
        rendom () {
            let rendomArr = []
            let numArr = []
            // 获取推荐随机数
            while (numArr.length < 5) {
                let index = Math.floor(Math.random() * this.content.length); //随机取一个位置 
                if (!numArr.includes(index)) {
                    numArr.push(index)
                }
            }

            numArr.forEach(v => {
                rendomArr.push(this.content[v])
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