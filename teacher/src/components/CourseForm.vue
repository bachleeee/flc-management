<template>
  <div class="container">
    <Form @submit="submitCourse" :validation-schema="courseFormSchema">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Tên khóa học</label>
            <Field name="name" type="text" class="form-control" v-model="courseLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="courseType">Loại khóa học</label>
            <Field as="select" name="courseType" class="form-control" v-model="courseLocal.category">
              <option value="">Chọn loại khóa học</option>
              <option value="toeic">TOEIC</option>
              <option value="ielts">IELTS</option>
              <!-- Thêm các loại khác nếu cần -->
            </Field>
            <ErrorMessage name="courseType" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="price">Giá</label>
            <Field name="price" type="text" class="form-control" v-model="courseLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="status">Tình trạng</label>
            <Field as="select" name="status" class="form-control" v-model="courseLocal.status">
              <option value="">Chọn tình trạng</option>
              <option value="open">Open</option>
              <option value="close">Close</option>
            </Field>
            <ErrorMessage name="status" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="des">Mô tả</label>
        <Field name="des" type="text" class="form-control" v-model="courseLocal.des"
          style="height: 150px; resize: vertical;" />
        <ErrorMessage name="des" class="error-feedback" />
      </div>


      <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
        <button v-if="courseLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteCourse">
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
  emits: ["submit:course", "delete:course"],
  props: {
    course: { type: Object, required: true },
    isRoleFieldDisabled: { type: Boolean }
  },
  data() {
    const courseFormSchema = yup.object().shape({
      name: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      courseType: yup
        .string()
        .required("Vui lòng chọn loại khóa học."),
      price: yup
        .number()
        .required("Vui lòng nhập giá."),
      status: yup
        .string()
        .required("Vui lòng chọn tình trạng."),
      des: yup
        .string()
        .max(500, "Mô tả không vượt quá 500 ký tự."),
    });
    return {
      courseLocal: this.course,
      courseFormSchema,
    };
  },
  methods: {
    submitCourse() {
      this.$emit("submit:course", this.courseLocal);
    },
    deleteCourse() {
      this.$emit("delete:course", this.courseLocal.id);
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