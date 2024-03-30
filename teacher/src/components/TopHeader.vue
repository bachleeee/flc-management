<template>
  <header class="top-header d-flex flex-row-reverse">
    <nav>
      <ul class="m-2 d-flex align-items-center">
        <li class="mx-3">
          <a href="#">
            <i class="far fa-envelope"></i> <!-- Icon lá thư -->
          </a>
        </li>
        <li class="mx-3" @click="showOptions">
          <a href="#">
            <i class="far fa-bell"></i>
            <span v-if="this.countIsNotSeen > 0" class="notification-dot"></span>
          </a>
        </li>
        <li class="mx-3">
          <img style="width: 35px;" src="../assets/img/user/avatar-defult.png" alt="">
        </li>
        <div v-if="showDropdown" class="dropdown-container">
          <div style="width: 300px;">
            <ul class="d-flex" style="flex-direction: column; background-color: #dedada;">
              <li style="background-color: white;" v-for="(announcement, index) in myAnnounce" :key="index"
                class="dropdown-items p-2 m-1">
                <div class="d-flex">
                  <img class="announce-image" src="../assets/img/user/avatar-defult.png" alt="">
                  <div class="announce-items">
                    <div class="announce-items-from">{{ announcement.from }}</div>
                    <div class="announce-items-content">{{ announcement.noiDung }}</div>
                    <div class="announce-items-date">{{ formatDate(announcement.createAt) }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import AnnounceService from '@/services/announce.service.js';

export default {
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  data() {
    return {
      showDropdown: false,
      myAnnounce: [],
      countIsNotSeen: 0
    }
  },
  methods: {
    showOptions() {
      this.showDropdown = !this.showDropdown;
    },
    async getMyAnnouce() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.myAnnounce = await AnnounceService.getMyAnnounce(user._id);
      console.log(this.myAnnounce);
      if (this.myAnnounce) {
        // Sắp xếp mảng theo thời gian tạo giảm dần
        this.myAnnounce.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
        
        let countIsNotSeen = 0;
        for (const announcement of this.myAnnounce) {
          if (!announcement.isSeen) {
            countIsNotSeen++;
          }
        }
        this.countIsNotSeen = countIsNotSeen;
        console.log(this.countIsNotSeen);
      }
    }
  } catch (error) {
    console.error("Không thể lấy thông báo:", error);
  }
},


    formatDate(dateString) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    },

  },
  mounted() {
    this.getMyAnnouce(); // Gọi hàm lấy thông báo khi component được mount lần đầu tiên
    setInterval(this.getMyAnnouce, 2000); // Gọi lại hàm lấy thông báo mỗi 10 giây
  }
}
</script>



<style scoped>
ul {
  margin-bottom: 0;
}

.top-header {
  background-color: #205eb4;
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
  text-decoration: none;
}


.dropdown-container {
  position: absolute;
  top: 50px;
  right: 50px;
  max-height: 300px; /* Chiều cao tối đa */
  overflow-y: auto; 
  z-index: 999;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ded9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.notification-dot {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 5px;
  right: 85px;
}
</style>
