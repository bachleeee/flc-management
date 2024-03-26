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
          <router-link to="/course">
            <i class="fas fa-box"></i> Quản lý khóa học
          </router-link>
        </li>
        <li>
          <router-link to="/class">
            <i class="fas fa-chalkboard"></i> Quản lý lớp học
          </router-link>
        </li>
        <li>
          <router-link to="/lesson">
            <i class="fas fa-book"></i> Quản lý bài học
          </router-link>
        </li>
        <li>
          <router-link to="/exam">
            <i class="fa-solid fa-folder-open"></i> Ngân hàng câu hỏi
          </router-link>
        </li>
        <li>
          <router-link to="/schedule">
            <i class="far fa-calendar"></i> Quản lý lịch học
          </router-link>
        </li>
        <li>
          <router-link to="/order">
            <i class="fas fa-shopping-cart"></i> Quản lý đơn đăng ký
          </router-link>
        </li>
        <li>
          <router-link to="/room">
            <i class="fa-solid fa-hotel"></i> Quản lý phòng học 
          </router-link>
        </li>
      </ul>
    </nav>
    <div v-if="authStore.isLoggedIn" class="logout-btn d-flex justify-content-center">
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
  margin: 10px;
  padding: 10px;
  text-align: start;
  transition: background-color 0.1s;
  border-radius: 10px;
}

nav li:last-child {
  border-bottom: none;
}

nav li:hover {
  background-color: #205eb4;
  color: #eaeaea;
}

nav a {
  color: #818893;
  text-decoration: none;
}

nav li:hover a {
  color: #eaeaea;
}

nav i {
  margin-right: 8px;
}
</style>
