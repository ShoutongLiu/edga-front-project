<template>
    <div class="app-main">
        <edga-header></edga-header>
        <nuxt />
    </div>
</template>

<script>
import edgaHeader from '../components/header'
export default {
    components: { edgaHeader }
}
</script>

<style lang="scss">
.app-main {
    width: 100%;
    min-height: 100%;
    background-color: #f4f4f4;
}
</style>

