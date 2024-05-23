<template>
    <div class="container">
        ...
    </div>
</template>

<script setup>
import {
    log,
} from '@/util/common.js'
import {
    ref,
    reactive,
    onMounted,
} from 'vue'


const active = ref(0)


onMounted(() => main())

const main = async () => {
    log('empty')
}
</script>


<style lang="less" scoped>
@import './index.less';
</style>
