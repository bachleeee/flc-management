<template>
  <div class="row mt-3">
    <div class="col-10 p-3 left-exam">
      <div v-for="(exam, index) in exams" :key="index">
        <div v-if="exam.type === 'multiple_choice'">
          <div v-if="exam.fileName !== null">
            <img :src="'http://localhost:5000/uploads/' + exam.fileName" alt="">
          </div>
          <div class="d-flex align-items-center">
            <div
              style="background-color:aqua; height: 30px; width: 35px; border-radius: 50%; text-align: center; font-weight: bold;">
              {{ index + 1 }}
            </div>
            <div v-if="checkQuestion(exam.question)" style="font-size: 16px; font-weight: bold; " class="ml-2">
              {{ exam.question }}
            </div>
          </div>
          <ul>
            <li v-for="(option, optionIndex) in ['A', 'B', 'C', 'D']" :key="optionIndex">
              <input type="radio" :value="exam['option' + option]" v-model="selectedOptions[index]"
                :disabled="showingAnswers" />
              <span :class="{
                'correct': showingAnswers && selectedOptions[index] === exam.correctOption && selectedOptions[index] === exam['option' + option],
                'incorrect': showingAnswers && selectedOptions[index] !== exam.correctOption && selectedOptions[index] === exam['option' + option],
                'default': !showingAnswers && selectedOptions[index] === exam['option' + option]
              }">
                {{ option }}. {{ exam['option' + option] }}
              </span>
            </li>
          </ul>
          <div v-if="showingAnswers">Đáp án: {{ exam.correctOption }}</div>
        </div>
      </div>
    </div>

    <div class="col-2">
      <div class="right-exam">
        <div>
          Bảng câu trả lời
          <div class="d-flex">
            <div v-for="(exam, index) in exams" :key="index">
              <div :class="{ 'selected': isChecked(index), 'notselected': !isChecked(index) }"
                style="height: 30px; width: 35px; border-radius: 15%; text-align: center; margin: 5px;">
                {{ index + 1 }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button v-if="!this.showingAnswers" class="btn btn-primary" @click="showAnswers">Gửi bài
            làm</button>
          <button v-else class="btn btn-primary" @click="reDoExam">Làm lại</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExamService from "@/service/exam.service";
import ProgressService from "@/service/progress.service";
import ExamDetail from "@/components/ExamDetail.vue";

export default {
  components: {
    ExamDetail
  },
  data() {
    return {
      exams: [],
      showingAnswers: false,
      selectedOptions: []
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
      const confirmed = confirm("Bạn có chắc chắn đã làm bài chưa?");

      if (confirmed) {
        this.showingAnswers = true;
        await this.updateProgress();
      } else {
        console.log("Người dùng chưa chắc chắn đã làm bài.");
      }
    },
    async updateProgress() {
      try {
        const data = {
          status: "completed",
          selectedOptions: this.selectedOptions
        };
        await ProgressService.update(this.myProgress._id, data);
        this.$router.go(0)
      } catch (error) {
        console.error("Lỗi khi cập nhật tiến độ:", error);
      }
    },
    isChecked(index) {
      return this.selectedOptions[index] !== '';
    },
    checkQuestion(name) {
      if (name.startsWith("img")) {
        return false;
      } else {
        return true;
      }
    },
    reDoExam() {
    const confirmed = confirm("Bạn có chắc chắn muốn làm lại bài tập không?");
    if (confirmed) {
      this.selectedOptions = Array(this.exams.length).fill('');
      this.showingAnswers = false;
    
    } else {
      console.log("Người dùng đã hủy làm lại bài tập.");
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
  background-color: rgb(183, 255, 183);
}

.incorrect {
  background-color: rgb(253, 205, 205);
}

.default {
  color: black;
}

.left-exam {
  background-color: white;
  border-radius: 10px;
  border: solid 1px #e0e0e0;
  box-shadow: 0 4px 0 0 rgba(143, 156, 173, .2);
}

.right-exam {
  background-color: white;
  border-radius: 10px;
  border: solid 1px #e0e0e0;
  box-shadow: 0 4px 0 0 rgba(143, 156, 173, .2);
  padding: 10px;
}

.selected {
  background-color: grey;
  color: white;
  border: solid 1px grey
}

.notselected {
  background-color: white;
  color: grey;
  border: solid 1px grey
}
</style>