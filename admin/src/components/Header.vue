<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../assets/img/mybookstrore (1).png" alt="Logo" />
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/product">
            <i class="fas fa-box"></i> Quản lý sản phẩm
          </router-link>
        </li>
        <li>
          <router-link to="/user">
            <i class="fas fa-users"></i> Quản lý khách hàng
          </router-link>
        </li>
        <li>
          <router-link to="/order">
            <i class="fas fa-shopping-cart"></i> Quản lý đơn hàng
          </router-link>
        </li>
      </ul>
      

    </nav>
    <div v-if="authStore.isLoggedIn" class="ml-2 logout-button">
        <button class="btn btn-secondary mb-5 ml-5" @click="logoutClick">Logout</button>
      </div>
  </div>
</template>

<script>
import UserService from '@/services/user.service';
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
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.sidebar {
  width: 200px;
  background-color: #333;
  height: 100%;
  padding-top: 20px;
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
  text-align: center;
  transition: background-color 0.3s;
  border-bottom: 1px solid #555;
  /* Thêm đường viền dưới */
}

nav li:last-child {
  border-bottom: none;
  /* Loại bỏ đường viền dưới của phần tử cuối cùng */
}

nav li:hover {
  background-color: #555;
}

nav a {
  color: #fff;
  text-decoration: none;
}

nav i {
  margin-right: 8px;
}

nav a:hover {
  text-decoration: underline;
}
</style>
