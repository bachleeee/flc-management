<template>
      <div class="container-xxl ">
        <div class="p-4">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="bg-white p-3 rounded">
                        <div  class="container my-4 d-flex flex-column align-items-center">
                        <h4>Thêm Bài học mới</h4>
                        <LessonForm :lesson="lesson" @submit:lesson="createLesson" :isRoleFieldDisabled="isRoleFieldDisabled"/>
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
            lesson: {
                sophong: '',
                succhua:'',
                tinhtrang: '',
            },
            message: "",
            isRoleFieldDisabled: false
        };
    },
    methods: {
        async createLesson(data) {
            try {
                await LessonService.create(data);
                window.alert("Bài học được thêm thành công.");
                setTimeout(() => {
                    this.$router.push({ name: "lesson" });
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },

    },
};
</script>