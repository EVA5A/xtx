<template>
<div>
  <LayoutNav/>
  <LayoutHeader/>
  <!-- 添加key 破坏复用机制 强制销毁重建 -->
  <router-view  :key="$route.fullpath"/>
  <LayoutFooter/>
  <LaytoutFixed/>
</div>
</template>

<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LaytoutFixed from './components/LayoutFixed.vue'

//触发获取导航列表的action
import { useCategoryStore } from '@/stores/category' //引入pinia的导航列表数据
import { onMounted } from 'vue'
const categoryStore  = useCategoryStore()
onMounted(()=> categoryStore.getCategory())
</script>

<style>

</style>