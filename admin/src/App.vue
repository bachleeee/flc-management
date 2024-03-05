<template>
    <TopHeader></TopHeader>
    <Header ref="header"></Header>
      <router-view :style="{
        'padding-left': headerWidth + 'px'
      }"></router-view>
</template>

<script>
import Header from '@/components/Header.vue';
import TopHeader from '@/components/TopHeader.vue';

export default {
  components: {
    Header,
    TopHeader
  },
  data() {
    return {
      headerWidth: 0
    };
  },
  mounted() {
    this.getHeaderWidth();
    window.addEventListener('resize', this.getHeaderWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getHeaderWidth);
  },
  methods: {
    getHeaderWidth() {
      this.headerWidth = this.$refs.header.$el.offsetWidth;
    }
  }
}
</script>

<style scoped>

</style>
