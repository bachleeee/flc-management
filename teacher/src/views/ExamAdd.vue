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
import ExamService from "@/services/exam.service";

export default {
  components: {
    ExamForm,
  },
  data() {
    return {
      exam: {
        lessonid: '',
        title: '',
        type: '',
        questionDetail: '',
        question: '',
        correctOption: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        explain: '',
      },
      message: "",
      isRoleFieldDisabled: false,
      isAddForm: true,
    };
  },
  methods: {
    async createExam(data) {
      try {
        await ExamService.create(data);
        window.alert("Bài tập được thêm thành công.");
        setTimeout(() => {
          this.$router.push({ name: "exam" });
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>