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

                            <div class="input-group mr-4">
                                <div class="form-outline" data-mdb-input-init>
                                    <input type="search" id="form1" class="form-control"
                                        placeholder="Tìm kiếm khóa học..." v-model="searchQuery" />
                                </div>
                                <button type="button" class="btn btn-primary" data-mdb-ripple-init
                                    @click="searchCourse">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>

                            <div v-if="authStore.isLoggedIn">
                                <div class="user-container" @mouseover="showDropdown" @mouseleave="hideDropdown">
                                    <div class="d-flex">
                                        <div class="btn-user mr-3">
                                            <div class="icon-user">
                                                <i class="fa fa-bell"></i>
                                            </div>
                                            <div v-if="isDropdownVisible" class="dropdown-menu p-1"
                                                style="width: 300px;">
                                                <ul>
                                                    <li v-for="(announcement, index) in myAnnounce" :key="index"
                                                        class="dropdown-items m-2">
                                                        <div class="d-flex">
                                                            <img class="announce-image"
                                                                src="../assets/img/user/avatar-defult.png" alt="">
                                                            <div class="announce-items">
                                                                <div class="announce-items-from">{{ announcement.from }}
                                                                </div>
                                                                <div class="announce-items-content">{{
                                                                    announcement.noiDung }}</div>
                                                                <div class="announce-items-date">{{
                                                                    formatDate(announcement.createAt) }}</div>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                        <div class="btn-user">
                                            <div class="icon-user">
                                                <i class="fa fa-user"></i>
                                            </div>
                                            <div v-if="isDropdownVisible" class="dropdown-menu p-3"
                                                style="margin: 0; width: 200px;">
                                                <ul>
                                                    <li class="dropdown-items p-1">
                                                        <strong>{{ authStore.user.name }}</strong>
                                                        {{ authStore.user.email }}
                                                    </li>
                                                    <hr>
                                                    <li class="dropdown-items p-1">
                                                        <a href="/user">Thông tin cá nhân</a>
                                                    </li>
                                                    <li class="dropdown-items p-1">
                                                        <a href="/myClass">Khóa học của tôi</a>
                                                    </li>
                                                    <li class="dropdown-items p-1">
                                                        <a href="/myClass">Hồ sơ học tập</a>
                                                    </li>
                                                    <hr>
                                                    <li class="dropdown-items p-1">
                                                        <div v-if="authStore.isLoggedIn" class="ml-2"
                                                            @click="logoutClick">
                                                            <span class="logout-click">Logout</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
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
            <TopHeader></TopHeader>
        </div>
    </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue';
import AnnounceService from '@/service/announce.service.js';

export default {
    data() {
        return {
            myAnnounce: []
        }
    },
    components: {
        TopHeader,
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
    methods: {
        async getMyAnnouce() {
            try {
                const user = Cookies.get('user');
                this.myAnnounce = await AnnounceService.getMyAnnounce(user._id)
                console.log(this.myAnnounce)
            } catch (error) {
                console.error("Ko lay duoc thong bao")
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-GB', options);
        },
        searchCourse() {
            this.$router.push({ name: 'Search', params: { searchKey: this.searchQuery } });
        },
    },
    mounted() {
        this.getMyAnnouce(); // Gọi hàm lấy thông báo khi component được mount lần đầu tiên
        setInterval(this.getMyAnnouce, 10000); // Gọi lại hàm lấy thông báo mỗi 10 giây
    }
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
a:hover {
    text-decoration: none;
}

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
    background-color: #0082c8;
    border-radius: 50%;
    padding: 10px;
}

.btn-cart>p,
.btn-user>p {
    font-size: 15px;
}

.fa-bell,
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

.logout-click {
    color: red;
}

.dropdown-items>a:hover {
    color: black
}

.dropdown-items:hover {
    background-color: #daeef9;
    border-radius: 5px;
}

.announce-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
}

.announce-items-from {
    font-size: 14px;
    font-weight: bold;
}

.announce-items-content {
    font-size: 15px;
}

.announce-items-date {
    font-size: 13px;
    font-weight: 400
}
</style>