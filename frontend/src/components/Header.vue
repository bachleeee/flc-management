<template>
    <div class="header-wrapper">
        <div class="bot-header">
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <router-link to="/">
                            <div class="row">
                                <img src="../assets/img/signupclass/logo.png" alt="" style="width: 90px;">
                                <p class="logo-title">Trung tâm ngoại ngữ</p>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-7">
                        <form action="/search" method="GET" class="form-inline" style="">
                            <div class="input-group">
                                <input type="text" name="name" class="form-control" placeholder="Bạn muốn tìm khóa học..."
                                    style="width: 400px;">
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-dark">Tìm kiếm</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-2">
                        <div class="d-flex justify-content-end">
                            <div class="btn-click d-flex">
                                <router-link to="/cart" class="btn-cart mr-2">
                                    <i class="fa fa-shopping-cart"></i>
                                    <p>Giỏ hàng</p>
                                </router-link>
                                <div v-if="authStore.isLoggedIn" class="user-container">
                                    <div class="btn-user" @mouseover="showDropdown" @mouseleave="hideDropdown">
                                        <div class="icon-user">
                                            <i class="fa fa-user"></i>
                                            <p>{{ authStore.user.name }}</p>
                                        </div>
                                        <div v-if="isDropdownVisible" class="dropdown-menu">
                                            <ul>
                                                <li><a href="/user">Thông tin cá nhân</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <router-link to="/login" class="btn-user ">
                                        <i class="fa fa-user"></i>
                                        <p>Đăng nhập</p>
                                    </router-link>
                                </div>
                                <div v-if="authStore.isLoggedIn" class="ml-2">
                                    <button class="btn btn-outline-danger" @click="logoutClick">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <TopHeader></TopHeader>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue';

export default {
    components: {
        TopHeader,
    },
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
.bot-header {
    background-color: white;
    padding: 10px 0;
}

.btn-cart,
.btn-user {
    transition: all 0.4s ease;
    height: 40px;
    width: 80px;

    display: block;
    text-align: center;
}

.btn-cart>p,
.btn-user>p {
    font-size: 15px;
}

.btn-click>a {
    color: rgb(0, 0, 0);
}

.btn-cart .num {
    background: #c92127;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    margin-left: 5px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.fa-shopping-cart,
.fa-user {
    color: #c92127;
}

.btn-user {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-user:hover .dropdown-menu {
  display: block;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
}

a {
  text-decoration: none;
  color: #333;
}
/* 
.user-container > .dropdown-menu {
    
} */
</style>