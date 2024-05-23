<template>
    <div class="container">
        <div>home</div>
        <div @click="toEmpty">empty</div>
        <div>active:{{ active }}</div>
    </div>
</template>

<script setup>
import { showToast } from 'vant'
import {
    log,
} from '@/util/common.js'
import {
    a,
} from './libs/config.js'
import {
    ref,
    reactive,
    onMounted,
} from 'vue'
import router from '@/router'


const active = ref(0)


onMounted(async () => await main('init'))

const main = async (type) => {
    log('main type:', type)
}

const toEmpty = () => {
    router.push('/empty')
}

</script>


<style lang="less" scoped>
@import './index.less';
</style>
