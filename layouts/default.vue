<template>
    <div class="app">
        <side-bar></side-bar>
        <div :class="`app-main ${navPhone ? 'is-side' : ''}`">
            <div class="main-container">
                <nuxt />
            </div>
            <egda-footer v-if="$route.name !== 'notfound'"></egda-footer>
        </div>
    </div>

</template>

<script>
import sideBar from '../components/SideBar'
import egdaFooter from '../components/Footer'
import { EventBus } from '../utils/bus'
export default {
    components: { sideBar, egdaFooter },
    data () {
        return {
            navPhone: false
        }
    },
    mounted () {
        EventBus.$on('sidebarshow', (obj) => {
            this.navPhone = obj.navPhone
        })

        EventBus.$on('sidebarhide', (obj) => {
            this.navPhone = obj.navPhone
        })
    }
}
</script>

<style lang="scss">
.app {
    width: 100%;
    min-height: 100%;
    display: flex;
}
.app-main {
    width: 100%;
    min-height: 100%;
    background-color: #f4f4f4;
    position: relative;
    display: flex;
    flex-direction: column;
    transition: all ease-in-out 0.3s;
    &.is-side {
        margin-left: 320px;
    }
}
.main-container {
    flex: 1;
}
</style>

