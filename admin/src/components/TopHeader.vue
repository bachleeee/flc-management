<template>
  <header class="top-header d-flex flex-row-reverse">
    <nav>
      <ul class="m-2 d-flex align-items-center">
        <li class="mx-3">
          <a href="#">
            <i class="far fa-envelope"></i> <!-- Icon lá thư -->
          </a>
        </li>
        <li class="mx-3">
          <a href="#">
            <i class="far fa-bell"></i> <!-- Icon chuông -->
          </a>
        </li>
        <li class="mx-3">
          <img style="width: 35px;" src="../assets/img/user/avatar-defult.png" alt="">
        </li>
      </ul>
    </nav>
  </header>
</template>

  
<script>
import { useAuthStore } from '@/store/auth';

export default {
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
}
</script>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
const { logout } = useAuthStore();

const logoutClick = () => {
    const shouldLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');

    if (shouldLogout) {
        logout();
        this.$router.go(0);
    }
};
const isDropdownVisible = ref(false);

const showDropdown = () => {
    isDropdownVisible.value = true;
};

const hideDropdown = () => {
    isDropdownVisible.value = false;
};
</script>

<style scoped>
ul {
  margin-bottom: 0;
}
.top-header {
  background-color: #205eb4;
  color: rgb(255, 255, 255);
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

nav a {
  color: rgb(255, 255, 255);

  font-size: 20px;
}

nav a:hover {
text-decoration: none;}
</style>

