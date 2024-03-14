<template>
    <div class="header-wrapper">
        <div class="bot-header">
            <div class="container">
                <div class="d-flex justify-content-between">
                    <div class="top-bar-item">
                        <router-link to="/">
                            <div class="row">
                                <img src="../assets/img/DevLingo.png" alt="">
                            </div>
                        </router-link>
                    </div>

                    <div class="top-bar-item d-flex align-items-center">
                        <div class="d-flex justify-content-end align-items-center">
                            <!-- Thanh tìm kiếm -->
                            <div class="input-group mr-4">
                                <div class="form-outline" data-mdb-input-init>
                                    <input type="search" id="form1" class="form-control" placeholder="Tìm kiếm khóa học..."/>
                                </div>
                                <button type="button" class="btn btn-primary" data-mdb-ripple-init>
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>

                            <div class="btn-click d-flex">
                                <div v-if="authStore.isLoggedIn" class="user-container">
                                    <div class="btn-user" @mouseover="showDropdown" @mouseleave="hideDropdown">
                                        <div class="icon-user">
                                            <i class="fa fa-user"></i>   
                                        </div>
                                        <div v-if="isDropdownVisible" class="dropdown-menu px-1">
                                            <ul>
                                                <li>
                                                    <strong><p>{{ authStore.user.name }}</p></strong>
                                                </li>
                                                <li>
                                                    <a href="/user">Thông tin cá nhân</a>
                                                </li>
                                                <hr>
                                                <li>
                                                    <div v-if="authStore.isLoggedIn" class="ml-2">
                                                        <button class="btn btn-outline-danger"
                                                            @click="logoutClick">Logout</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <router-link to="/login" class="btn-user ">
                                        <i class="fa fa-user"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TopHeader></TopHeader>
        </div>
    </div>
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
}

.btn-cart,
.btn-user {
    transition: all 0.4s ease;
    height: 47px;
    width: 47px;
    display: block;
    text-align: center;
    background-color:#0082c8;
    border-radius: 50%;
    padding: 10px;
}

.btn-cart>p,
.btn-user>p {
    font-size: 15px;
}

.btn-click>a {
    color: rgb(0, 0, 0);
}

.fa-user {
  color: white;
  font-size: 22px;
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

a {
    text-decoration: none;
    color: #333;
}

</style>