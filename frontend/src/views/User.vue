<template>
    <div class="container my-5">
      <h3>Thông tin người dùng</h3>
      <p>Tên: {{authStore.user.name }}</p>
      <p>Email: {{authStore.user.email }}</p>
      <p>Địa chỉ: {{authStore.user.address }}</p>
      <p>Số điện thoại: {{authStore.user.phone }}</p>
    </div>
  </template>
 

  <script>
  import { useAuthStore } from '@/store/auth';

  export default {
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
  };
  </script>
  