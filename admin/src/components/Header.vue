<template>
  <div class="sidebar">
    <div class="logo">
      <img style="width: 190px;" src="../assets/img/Blue White Modern Learning Center Logo.png" alt="Logo" />
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/user">
            <i class="fas fa-users"></i> Quản lý người dùng
          </router-link>
        </li>
        <li>
          <router-link to="/product">
            <i class="fas fa-box"></i> Quản lý khóa học
          </router-link>
        </li>
        <li>
          <router-link to="/order">
            <i class="fas fa-shopping-cart"></i> Quản lý đơn đăng ký
          </router-link>
        </li>
        <li>
          <router-link to="/schedule">
            <i class="far fa-calendar"></i> Quản lý lịch học
          </router-link>
        </li>
        <li>
          <router-link to="/resources">
            <i class="fas fa-book"></i> Quản lý tài nguyên
          </router-link>
        </li>
      </ul>
    </nav>
    <div v-if="authStore.isLoggedIn" class="logout-btn">
      <button class="btn btn-secondary" @click="logoutClick">Logout</button>
    </div>
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
  methods: {
    logoutClick() {
      const shouldLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');

      if (shouldLogout) {
        this.authStore.logout();
      }
    },
  },
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.sidebar {
  width: 16.666667%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
  
}

.logo img {
  max-width: 100%;
  height: auto;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav li {
  padding: 10px;
  text-align: start;
  transition: background-color 0.3s;
}

nav li:last-child {
  border-bottom: none;
}

nav li:hover {
  background-color: #ece9e9;
}

nav a {
  color: #000000;
}

nav i {
  margin-right: 8px;
}
</style>
