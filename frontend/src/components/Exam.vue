<template>
  <div>
    <div v-for="(exam, index) in exams" :key="index">
      <div v-if="exam.type === 'multiple_choice'">
        <div>Exercise {{ index + 1 }}: {{ exam.question }}</div>
        <ul>
          <li v-for="(option, optionIndex) in ['A', 'B', 'C', 'D']" :key="optionIndex" :class="{
      'correct': showingAnswers && selectedOptions[index] === exam.correctOption && selectedOptions[index] === option,
      'incorrect': showingAnswers && selectedOptions[index] !== exam.correctOption && selectedOptions[index] === option,
      'default': !showingAnswers && selectedOptions[index] === option
    }">
            <input type="radio" :value="option" v-model="selectedOptions[index]" :disabled="showingAnswers" />
            {{ option }}. {{ exam['option' + option] }}
          </li>
        </ul>
        <div v-if="showingAnswers">Đáp án: {{ exam.correctOption }}</div>
      </div>
    </div>
    <div>
      <button v-if="this.myProgress.status !== 'completed'" class="btn btn-primary" @click="showAnswers">Xem đáp án</button>
      <button v-else class="btn btn-primary" @click="reDoExam">Làm lại</button>
    </div>
  </div>
</template>

<script>
import ExamService from "@/service/exam.service";
import ProgressService from "@/service/progress.service";
import ExamDetail from "./ExamDetail.vue";

export default {
  components: {
    ExamDetail
  },
  data() {
    return {
      exams: [],
      showingAnswers: false,
      selectedOptions: [] // Mảng lưu đáp án đã chọn cho từng bài tập
    };
  },
  props: {
    lesson: Object,
    myProgress: Object
  },
  created() {
    this.getExams();
  },
  methods: {
    async getExams() {
      try {
        const response = await ExamService.getAllExamOfLesson(this.lesson._id);
        if (response) {
          this.exams = response;
          if (this.myProgress.status === 'completed') {
            this.selectedOptions = this.myProgress.selectedOptions
            this.showingAnswers = true
          } else {
            this.selectedOptions = Array(this.exams.length).fill('');
          }
          console.log("Bài tập cho bài học:", this.exams);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài tập:", error);
      }
    },
    async showAnswers() {
      this.showingAnswers = true;
      await this.updateProgress();
    },
    async updateProgress() {
      try {
        const data = {
          satus: "completed",
          selectedOptions: this.selectedOptions // Chuyển dữ liệu vào trong một đối tượng có tên là selectedOptions
        };
        await ProgressService.update(this.myProgress._id, data);
        console.log("Đã cập nhật tiến độ thành công!");
      } catch (error) {
        console.error("Lỗi khi cập nhật tiến độ:", error);
      }
    }

  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}

.default {
  color: black;
}
</style>
