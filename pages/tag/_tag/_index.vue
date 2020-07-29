<template>
    <div>
    </div>
</template>
<script>
export default {
    mounted () {
        console.log(this.$route)
        const { tag, index } = this.$route.params
        this.$router.push({
            name: 'tag-url', params: { url: tag, index }
        })
    }
}
</script>