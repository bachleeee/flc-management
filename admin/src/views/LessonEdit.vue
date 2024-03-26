<template>
  <div class="container-xxl ">
    <div class="p-4">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="bg-white p-3 rounded">
            <div v-if="lesson" class="container mt-4 d-flex flex-column align-items-center">
              <h4>Hiệu chỉnh Bài học </h4>
              <LessonForm :lesson="lesson" @submit:lesson="updateLesson" @delete:lesson="deleteLesson"
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
import LessonForm from "@/components/LessonForm.vue";
import LessonService from "@/services/lesson.service";

export default {
  components: {
    LessonForm,
  },
  data() {
    return {
      lesson: null,
      message: "",
      isRoleFieldDisabled: true,
      isAddForm: false,
    };
  },
  methods: {
    async getLesson() {
      try {
        this.lesson = await LessonService.getById(this.$route.params.id);
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
    async updateLesson(data) {
      try {
        console.log("clicked")
        await LessonService.update(this.lesson._id, data);
        window.alert("Bài học được cập nhật thành công.");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLesson() {
      if (confirm("Bạn muốn xóa Bài học này?")) {
        try {
          await LessonService.delete(this.lesson._id);
          this.$router.push({ name: "lesson" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getLesson();
    this.message = "";
  },
};
</script>