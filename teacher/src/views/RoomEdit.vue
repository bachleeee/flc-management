<template>
  <div class="container-xxl ">
    <div class="p-4">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="bg-white p-3 rounded">
            <div v-if="room" class="container mt-4 d-flex flex-column align-items-center">
              <h4>Hiệu chỉnh Phòng học </h4>
              <RoomForm :room="room" @submit:room="updateRoom" @delete:room="deleteRoom"
                :isRoleFieldDisabled="isRoleFieldDisabled" />
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomForm from "@/components/RoomForm.vue";
import RoomService from "@/services/room.service";

export default {
  components: {
    RoomForm,
  },
  data() {
    return {
      room: null,
      message: "",
      isRoleFieldDisabled: true,
      isAddForm: false,
    };
  },
  methods: {
    async getRoom() {
      try {
        this.room = await RoomService.getById(this.$route.params.id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateRoom(data) {
      try {
        console.log("clicked")
        await RoomService.update(this.room._id, data);
        window.alert("Phòng học được cập nhật thành công.");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRoom() {
      if (confirm("Bạn muốn xóa Phòng học này?")) {
        try {
          await RoomService.delete(this.room._id);
          this.$router.push({ name: "room" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getRoom();
    this.message = "";
  },
};
</script>