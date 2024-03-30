<template>
  <div class="container-xxl ">
    <div class="p-4">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="bg-white p-3 rounded">
            <div v-if="video" class="container mt-4 d-flex flex-column align-items-center">
              <h4>Hiệu chỉnh Phòng học </h4>
              <VideoForm :video="video" @submit:video="updateVideo" @delete:video="deleteVideo"
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
import VideoForm from "@/components/VideoForm.vue";
import VideoService from "@/services/video.service";

export default {
  components: {
    VideoForm,
  },
  data() {
    return {
      video: null,
      message: "",
      isRoleFieldDisabled: true,
      isAddForm: false,
    };
  },
  methods: {
    async getVideo() {
      try {
        this.video = await VideoService.getById(this.$route.params.id);
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
    async updateVideo(data) {
      try {
        console.log("clicked")
        await VideoService.update(this.video._id, data);
        window.alert("Phòng học được cập nhật thành công.");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteVideo() {
      if (confirm("Bạn muốn xóa Phòng học này?")) {
        try {
          await VideoService.delete(this.video._id);
          this.$router.push({ name: "video" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getVideo();
    this.message = "";
  },
};
</script>