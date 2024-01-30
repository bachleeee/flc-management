<template>
  <TopHeader></TopHeader>
  <Header></Header>
  <router-view></router-view>
</template>
  
<script>
import Header from '@/components/Header.vue';
import TopHeader from '@/components/TopHeader.vue';
export default {
  components: {
    Header,
    TopHeader
  }
}
</script>
  
<style scoped></style>