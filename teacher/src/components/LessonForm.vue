<template>
  <div class="container">
    <Form @submit="submitLesson" :validation-schema="lessonFormSchema">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="tenbaihoc">Tên bài học</label>
            <Field name="tenbaihoc" type="text" class="form-control" v-model="lessonLocal.tenbaihoc" />
            <ErrorMessage name="tenbaihoc" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="classId">Lớp</label>
            <Field as="select" name="classId" class="form-control" v-model="lessonLocal.classId">
              <option value="" selected>Chọn lớp</option>
              <option v-for="(classItem, index) in classData" :key="index" :value="classItem._id">
                {{ classItem.tenlop }}
              </option>
            </Field>
            <ErrorMessage name="classId" class="error-feedback" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="noidung">Nội dung</label>
            <Field name="noidung" type="text" class="form-control" v-model="lessonLocal.noidung" />
            <ErrorMessage name="noidung" class="error-feedback" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
        <button v-if="lessonLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteLesson">
          Xóa
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import ClassService from "@/services/class.service";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:lesson", "delete:lesson"],
  props: {
    lesson: { type: Object, required: true },
    isRoleFieldDisabled: { type: Boolean }
  },
  data() {
    const lessonFormSchema = yup.object().shape({
      tenbaihoc: yup
        .string()
        .required('Vui lòng nhập tên bài học.')
        .min(2, "Tên bài học phải ít nhất 2 ký tự.")
        .max(50, "Tên bài học có nhiều nhất 50 ký tự."),
      classId: yup
        .string()
        .required('Vui lòng chọn lớp học.'),
      noidung: yup
        .string()
        .required('Vui lòng nhập nội dung bài học.'),
    });
    return {
      lessonLocal: this.lesson,
      lessonFormSchema,
      classData: []
    };
  },
  methods: {
    async getAllClass() {
      try {
        this.classData = await ClassService.getAllClass()
      } catch (error) {
        console.log(error)
      }
    },
    submitLesson() {
      this.$emit("submit:lesson", this.lessonLocal);
    },
    deleteLesson() {
      this.$emit("delete:lesson", this.lessonLocal.id);
    },
  },
  mounted() {
    this.getAllClass()
  }
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