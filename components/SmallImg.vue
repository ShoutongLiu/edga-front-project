<template>
    <div class="small-img">
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
    }
}
</script>

<style>
</style>