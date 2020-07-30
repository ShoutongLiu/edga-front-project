<template>
    <div>
        <cate
            :title="typeTitle"
            :reqPath="url"
        ></cate>
    </div>
</template>

<script>
import cate from '../../components/cate'
export default {
    data () {
        return {
            typeTitle: '位置',
            url: 'location',
        }
    },
    components: {
        cate
    },
}
</script>

<style>
</style>