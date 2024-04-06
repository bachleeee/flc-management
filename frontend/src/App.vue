<template>
  <Header></Header>
  <div style="position: relative;">
    <div class="float-message">
      <Message></Message>
    </div>
    <router-view></router-view>

  </div>

  <Footer></Footer>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Message from '@/components/Message.vue';
export default {
  components: {
    Header,
    Footer,
    Message
  },

}
</script>
<style scoped>

.main-content {
  position: relative;
  min-height: 100vh;
}
.float-message {
  position: fixed;
  bottom: 60px; 
  right: 20px; 
  z-index: 9999; 
}

</style>