<template>
      <div class="container-xxl ">
        <div class="p-4">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="bg-white p-3 rounded">
                        <div  class="container my-4 d-flex flex-column align-items-center">
                        <h4>Thêm Khóa học mới</h4>
                        <CourseForm :course="course" @submit:course="createCourse" :isRoleFieldDisabled="isRoleFieldDisabled"/>
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
            course: {
                name: '',
                category: '',
                status: '',
                price: '',
                des: '',
            },
            message: "",
            isRoleFieldDisabled: false
        };
    },
    methods: {
        async createCourse(data) {
            try {
                await CourseService.create(data);
                window.alert("Khóa học được thêm thành công.");
                setTimeout(() => {
                    this.$router.push({ name: "course" });
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },

    },
};
</script>