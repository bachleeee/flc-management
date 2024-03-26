<template>
  <div class="container">
    <Form @submit="submitExam" :validation-schema="examFormSchema">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="title">Tiêu đề</label>
            <Field name="title" type="text" class="form-control" v-model="examLocal.title" />
            <ErrorMessage name="title" class="error-feedback" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="type">Loại</label>
            <select name="type" class="form-control" v-model="examLocal.type">
              <option value="fill_in_blank">Fill in blank</option>
              <option value="multiple_choice">Multiple choice</option>
            </select>
            <ErrorMessage name="type" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label style="color: #205eb4; text-transform: uppercase;" for="">Câu hỏi</label>
            <label for="question">Nội dung câu hỏi</label>
            <Field name="question" type="text" class="form-control" v-model="examLocal.question" />
            <ErrorMessage name="question" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <label for="questionDetail">Chi tiết câu hỏi</label>
          <input name="questionDetail" type="file" accept="image/*" @change="handleImageUpload">
          <img v-if="examLocal.questionDetail" :src="examLocal.questionDetail" alt="Question Image"
            style="max-width: 100%;">
          <ErrorMessage name="questionDetail" class="error-feedback" />
        </div>
      </div>

      <label for="questionDetail" class="mt-3">Lựa chọn</label>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="optionA"></label>
            <Field name="optionA" type="text" class="form-control" v-model="examLocal.optionA" />
            <ErrorMessage name="optionA" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="optionB"></label>
            <Field name="optionB" type="text" class="form-control" v-model="examLocal.optionB" />
            <ErrorMessage name="optionB" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="optionC"></label>
            <Field name="optionC" type="text" class="form-control" v-model="examLocal.optionC" />
            <ErrorMessage name="optionC" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="optionD"></label>
            <Field name="optionD" type="text" class="form-control" v-model="examLocal.optionD" />
            <ErrorMessage name="optionD" class="error-feedback" />
          </div>
        </div>
      </div>
      <label for="questionDetail">Đáp án</label>
      <div class="row">
        <div class="col-md-2">
          <div class="form-group">
            <label>
              <input type="radio" name="correctOption" value="A" v-model="examLocal.correctOption"> A
            </label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label>
              <input type="radio" name="correctOption" value="B" v-model="examLocal.correctOption"> B
            </label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label>
              <input type="radio" name="correctOption" value="C" v-model="examLocal.correctOption"> C
            </label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label>
              <input type="radio" name="correctOption" value="D" v-model="examLocal.correctOption"> D
            </label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
        <button v-if="examLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteExam">
          Xóa
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:exam", "delete:exam"],
  props: {
    exam: { type: Object, required: true },
    isRoleFieldDisabled: { type: Boolean },
    isAddForm: { type: Boolean }
  },
  data() {
    const examFormSchema = yup.object().shape({
    });
    return {
      examLocal: this.exam,
      examFormSchema,
    };
  },
  methods: {
    submitExam() {
      console.log('click')
      this.$emit("submit:exam", this.examLocal);
    },
    deleteExam() {
      this.$emit("delete:exam", this.examLocal.id);
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.examLocal.questionDetail = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-check-input {
  margin-right: 5px;
}

.error-feedback {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}
</style>