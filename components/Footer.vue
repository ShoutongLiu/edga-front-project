<template>
    <footer class="footer">
        <div class="container">
            <div class="logo">
                <img
                    src="~/static/imgs/buttom@2.png"
                    alt=""
                    v-if="clientWidth > 786"
                    style="width: 101px;"
                >
                <img
                    src="~/static/imgs/p-buttom@2x.png"
                    alt=""
                    style="width: 92px;"
                    v-else
                >
            </div>
            <div class="copy-right">
                Copyright © EGDA.COM 旗下展示工具 粤ICP备13056012号
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data () {
        return {
            clientWidth: 0
        }
    },
    mounted () {
        this.clientWidth = document.body.clientWidth    // 获取屏幕宽度
    }
}
</script>

<style>
</style>