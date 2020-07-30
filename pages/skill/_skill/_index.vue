<template>
    <div>
    </div>
</template>
<script>
export default {
    mounted () {
        console.log(this.$route)
        const { skill, index } = this.$route.params
        this.$router.push({
            name: 'skill-url', params: { url: skill, index }
        })
    }
}
</script>