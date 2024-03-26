<template>
  <div class="container-xxl ">
    <div class="p-4">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="bg-white p-3 rounded">
            <div v-if="exam" class="container mt-4 d-flex flex-column align-items-center">
              <h4>Hiệu chỉnh Bài tập </h4>
              <ExamForm :exam="exam" @submit:exam="updateExam" @delete:exam="deleteExam"
                :isRoleFieldDisabled="isRoleFieldDisabled"/>
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExamForm from "@/components/ExamForm.vue";
import ExamService from "@/services/exam.service";

export default {
  components: {
    ExamForm,
  },
  data() {
    return {
      exam: null,
      message: "",
      isRoleFieldDisabled: true,
    };
  },
  methods: {
    async getExam() {
      try {
        this.exam = await ExamService.getById(this.$route.params.id);
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
    async updateExam(data) {
      try {
        console.log("clicked")
        const result = await ExamService.update(this.exam._id, data);
        console.log(result)
        window.alert("Bài tập được cập nhật thành công.");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteExam() {
      if (confirm("Bạn muốn xóa Bài tập này?")) {
        try {
          await ExamService.delete(this.exam._id);
          this.$router.push({ name: "exam" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getExam();
    this.message = "";
  },
};
</script>