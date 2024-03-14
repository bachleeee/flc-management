<template>
      <div class="container-xxl ">
        <div class="p-4">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="bg-white p-3 rounded">
                        <div  class="container my-4 d-flex flex-column align-items-center">
                        <h4>Thêm Lớp học mới</h4>
                        <ClassForm :classData="classData" @submit:classData="createClass" :isRoleFieldDisabled="isRoleFieldDisabled"
                        :isAddForm="isAddForm" :courses="courses"/>
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
            classData: {
                tenlop: '',
                courseName: '',
                hinhthuc: '',
                sobuoihoc: '',
                sobuoitrongtuan: '',
                thu: [],
                soluongtoida: ''
            },
            message: "",
            courses: [],
            isRoleFieldDisabled: false,
            isAddForm: true,
        };
    },
    methods: {
        async createClass(data) {
            try {
                await ClassService.create(data);
                window.alert("Lớp học được thêm thành công.");
                setTimeout(() => {
                    this.$router.push({ name: "class" });
                }, 2000);
            } catch (error) {
                console.log(error);
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
    },
    created() {
    this.getAllCourse();
  },
};
</script>