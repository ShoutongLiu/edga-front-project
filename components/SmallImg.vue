<template>
    <div
        class="small-img"
        v-if="clientWidth >= 768"
    >
        <a
            :href="v.url"
            v-for="v in graphs"
            :key="v._id"
        >
            <img
                :src="v.path"
                alt="small"
                class="small"
            >
        </a>
    </div>
</template>

<script>
export default {
    props: {
        graphs: Array
    },
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