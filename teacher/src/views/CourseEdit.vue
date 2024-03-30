<template>
  <div class="container-xxl ">
    <div class="p-4">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="bg-white p-3 rounded">
            <div v-if="course" class="container mt-4 d-flex flex-column align-items-center">
              <h4>Hiệu chỉnh Khóa học </h4>
              <CourseForm :course="course" @submit:course="updateCourse" @delete:course="deleteCourse"
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
import CourseForm from "@/components/CourseForm.vue";
import CourseService from "@/services/course.service";

export default {
  components: {
    CourseForm,
  },
  data() {
    return {
      course: null,
      message: "",
      isRoleFieldDisabled: true,
      isAddForm: false,
    };
  },
  methods: {
    async getCourse() {
      try {
        this.course = await CourseService.getById(this.$route.params.id);
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
    async updateCourse(data) {
      try {
        console.log("clicked")
        await CourseService.update(this.course._id, data);
        window.alert("Khóa học được cập nhật thành công.");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCourse() {
      if (confirm("Bạn muốn xóa Khóa học này?")) {
        try {
          await CourseService.delete(this.course._id);
          this.$router.push({ name: "course" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getCourse();
    this.message = "";
  },
};
</script>