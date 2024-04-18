<template>
  <div class="container-xxl ">
    <div class="p-4">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="bg-white p-3 rounded">
            <div class="container my-4 d-flex flex-column align-items-center">
              <h4>Thêm Bài tập mới</h4>
              <ExamForm :exam="exam" @submit:exam="createExam" :isRoleFieldDisabled="isRoleFieldDisabled"
                :isAddForm="isAddForm" />
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
import axios from 'axios';
import ExamService from "@/services/Exam.service";

export default {
  components: {
    ExamForm,
  },
  data() {
    return {
      exam: {
        type: '',
        questionDetail: '',
        question: '',
        correctOption: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        explain: '',
        file: ''
      },
      message: "",
      isRoleFieldDisabled: false,
      isAddForm: true,
    };
  },
  methods: {
    async createExam(data) {
      if (data.file != '') {
        console.log(data)
        try {
          const formData = new FormData();
          formData.append('image', data.file);

          formData.append('optionA', data.optionA);
          formData.append('optionB', data.optionB);
          formData.append('optionC', data.optionC);
          formData.append('optionD', data.optionD);
          formData.append('correctOption', data.correctOption);
          formData.append('title', data.title);
          formData.append('question', data.question);
          formData.append('explain', data.explain);
          formData.append('fileName', data.file.name);

          const uploadResponse = await axios.post('http://localhost:5000/api/exam/createExamWithImg', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Image uploaded successfully!', uploadResponse);
        } catch (error) {
          console.error('Error while submitting file:', error);
        }
      } else {
        try {
          await ExamService.create(data);
          window.alert("Câu hỏi được thêm thành công.");
          setTimeout(() => {
            this.$router.push({ name: "exam" });
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>