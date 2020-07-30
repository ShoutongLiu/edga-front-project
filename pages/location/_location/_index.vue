<template>
    <div>
    </div>
</template>
<script>
export default {
    mounted () {
        console.log(this.$route)
        const { location, index } = this.$route.params
        this.$router.push({
            name: 'location-url', params: { url: location, index }
        })
    }
}
</script>