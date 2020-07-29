<template>
    <div>
    </div>
</template>
<script>
export default {
    mounted () {
        console.log(this.$route)
        const { categroy, index } = this.$route.params
        this.$router.push({
            name: 'categroy-url', params: { url: categroy, index }
        })
    }
}
</script>