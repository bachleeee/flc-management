<template>
    <div class="container">
        <div class="lesson-details">
      <div v-if="lesson">
        <h2>{{ lesson.name }}</h2>
        <p>{{ lesson.intro }}</p>
    
      </div>
      <div v-else>
        <p>Không tìm thấy thông tin bài học.</p>
      </div>
    </div>
    </div>
    
  </template>
  
  <script>
  import LessonService from "@/service/lesson.service";
  import { useAuthStore } from "@/store/auth";
  
  export default {
    data() {
      return {
        lesson: null,
      };
    },
    computed: {
      authStore() {
        return useAuthStore();
      },
    },
    methods: {
      async getLesson() {
        try {
          const slug = this.$route.params.lessonName;
          const response = await LessonService.getBySlug(slug);
  
          if (response) {
            this.lesson = response;
            console.log("Thông tin bài học:", this.lesson);
          } else {
            console.error("Không tìm thấy thông tin bài học.");
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin bài học:", error);
        }
      },
    },
    created() {
      this.getLesson();
    },
  };
  </script>
  
  <style scoped>

  </style>
  