<template>
    <div class="app-main">
        <edga-header></edga-header>
        <nuxt />
        <edga-footer></edga-footer>
    </div>
</template>

<script>
import edgaHeader from '../components/Header'
import edgaFooter from '../components/Footer'
export default {
    components: { edgaHeader, edgaFooter },
}
</script>

<style lang="scss">
.app-main {
    width: 100%;
    min-height: 100%;
    background-color: #f4f4f4;
    position: relative;
}
</style>

