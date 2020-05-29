<template>
    <div class="app-main">
        <!-- <edga-header></edga-header> -->
        <div class="main-container">
            <nuxt />
        </div>
        <edga-footer></edga-footer>
    </div>
</template>

<script>
import edgaFooter from '../components/Footer'
export default {
    components: { edgaFooter }
}
</script>

<style lang="scss">
.app-main {
    width: 100%;
    min-height: 100%;
    background-color: #f4f4f4;
    position: relative;
    display: flex;
    flex-direction: column;
}
.main-container {
    flex: 1;
}
</style>

