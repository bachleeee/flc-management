<template>
  <div class="container">
    <Form @submit="submitUser" :validation-schema="userFormSchema">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Tên người dùng</label>
            <Field name="name" type="text" class="form-control" v-model="userLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="role">Vai trò</label>
            <Field as="select" name="role" class="form-control" v-model="userLocal.role"
              :disabled="isRoleFieldDisabled">
              <option value="">Chọn vai trò</option>
              <option value="student">Học viên</option>
              <option value="teacher">Giáo viên</option>
              <option value="admin">Quản trị viên</option>
            </Field>
            <ErrorMessage name="role" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" v-model="userLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="userLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="avatar">Avatar</label>
        <Field name="avatar" type="text" class="form-control" v-model="userLocal.avatar" />
        <ErrorMessage name="avatar" class="error-feedback" />
      </div>
      <div v-if="myClass > 0" class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="myClass">Lớp học bạn đã đăng ký</label>
            <ul>
              <li v-for="(classItem, index) in myClass" :key="index">{{ classItem }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="form-group">
          <button class="btn btn-success">Lưu</button>
          <button v-if="userLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteUser">
            Xóa
          </button>
        </div>
      </div>

    </Form>
  </div>
</template>

<script>
import ClassService from '@/services/class.service'
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:user", "delete:user"],
  props: {
    user: { type: Object, required: true },
    isRoleFieldDisabled: { type: Boolean }
  },

  data() {
    const userFormSchema = yup.object().shape({
      name: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      userLocal: this.user,
      userFormSchema,
      myClass: this.user.myClass,
    };
  },
  methods: {
    submitUser() {
      this.$emit("submit:user", this.userLocal);
    },
    deleteUser() {
      this.$emit("delete:user", this.userLocal.id);
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

.btn {
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #bd2130;
}
</style>