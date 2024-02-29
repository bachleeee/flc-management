<template>
  <div v-if="exams.length > 0">
    <div v-for="(exam, index) in exams" :key="index">
      <ExamDetail :exam="exam" :exerciseIndex="index + 1" :showingAnswers="showingAnswers"></ExamDetail>
    </div>
    <div>
        <button class="btn btn-primary" @click="showAnswers">Xem đáp án</button>
    </div>
  </div>
</template>

<script>
import LessonService from "@/service/lesson.service";
import ExamDetail from "./ExamDetail.vue";

export default {
  components: {
    ExamDetail
  },
  data() {
    return {
      exams: [],
      showingAnswers: false,
    };
  },
  props: {
    lesson: Object
  },
  created() {
    this.getExams(); 
  },
  methods: {
    async getExams() { 
      try {
        const response = await LessonService.getEx(this.lesson._id);
        if (response) {
          this.exams = response; // Sửa thành this.exams
          console.log("Bài tập cho bài học:", this.exams);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài tập:", error);
      }
    },
    showAnswers() {
            this.showingAnswers = true;
        }
  }
};
</script>
