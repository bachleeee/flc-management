<template>
  <div>
    <div v-for="(group, index) in myGroups" :key="index">
      <div class="group-container">
        <div class="mess-detail" v-if="showGroups[group._id]">
          <MessageDetail :group="group" :token="token"></MessageDetail>
        </div>
        <div class="d-flex align-items-center" style="flex-direction: column;">
          <div class="btn-group" @click="toggleGroups(group._id)">
            <i class="fa-solid fa-user-group"></i>
          </div>
          <span style="font-size: 13px; font-weight:500 ; background-color: #f4960a;">{{ group.groupName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageService from "@/service/message.service";
import MessageDetail from "@/components/MessageDetail.vue";

export default {
  data() {
    return {
      myGroups: [],
      token: '',
      showGroups: {}, // Thay đổi thành một đối tượng
    }
  },
  components: {
    MessageDetail
  },
  methods: {
    async getMyGroups() {
      try {
        this.token = localStorage.getItem('token');
        if (!this.token) {
          console.error('Token is not available');
          return;
        }
        const response = await MessageService.getAllMyGroups(this.token);
        if (response) {
          this.myGroups = response;
          console.log("nhom cua ban", this.myGroups);
        }
      } catch (error) {
        console.error('Error while fetching groups:', error);
      }
    },
    toggleGroups(groupId) {
  this.$data.showGroups[groupId] = !this.$data.showGroups[groupId];
}

  },
  mounted() {
    this.getMyGroups();
  }
}
</script>


<style scoped>
.fa-message,
.fa-user-group {
  color: white;
  padding-top: 5px;
  font-size: 25px;
}

.btn-group {
  background-color: #f4960a;
  transition: all 0.4s ease;
  height: 60px;
  width: 60px;
  display: block;
  text-align: center;
  border-radius: 50%;
  padding: 10px;
}

.group-container {
  display: flex;
  align-items: center;
}

.mess-detail {
  background-color: #ffffff;
  transition: all 0.4s ease;
  height: 450px;
  width: 380px;
  display: block;
  margin-left: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>