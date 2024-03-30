<template>
  <div class="container-xxl ">
    <div class="p-4">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="bg-white p-3 rounded">
            <div v-if="classData" class="container mt-4 d-flex flex-column align-items-center">
              <h4>Hiệu chỉnh Lớp học </h4>
              <ClassForm :classData="classData" @submit:classData="updateClass" @delete:classData="deleteClass"
                :isRoleFieldDisabled="isRoleFieldDisabled" :courses="courses"/>
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassForm from "@/components/ClassForm.vue";
import ClassService from "@/services/class.service";
import CourseService from "../services/course.service";

export default {
  components: {
    ClassForm,
  },
  data() {
    return {
      classData: null,
      message: "",
      isRoleFieldDisabled: true,
      courses: []
    };
  },
  methods: {
    async getClass() {
      try {
        this.classData = await ClassService.getById(this.$route.params.id);
        console.log('thông tin lớp học',this.classData)
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
    async getAllCourse() {
      try {
        const response = await CourseService.getAllCourse();
        if (response) {
          this.courses = response
          console.log('danh sách khóa học',this.courses)
        }

      } catch (error) {
        console.log(error)
      }
    },
    async updateClass(data) {
      try {
        await ClassService.update(this.classData._id, data);
        window.alert("Lớp học được cập nhật thành công.");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteClass() {
      if (confirm("Bạn muốn xóa Lớp học này?")) {
        try {
          await ClassService.delete(this.classData._id);
          this.$router.push({ name: "class" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getClass();
    this.getAllCourse();
    this.message = "";
  },
};
</script>