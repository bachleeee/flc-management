<template>
  <div class="container">
    <Form @submit="submitOrder" :validation-schema="orderFormSchema">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="orderby">Họ tên học viên</label>
            <Field name="orderby" type="text" class="form-control" v-model="orderLocal.orderby" readonly/>
            <ErrorMessage name="orderby" class="error-feedback" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="courseName">Tên khóa học</label>
            <Field name="courseName" type="text" class="form-control" v-model="orderLocal.courseName" readonly/>
            <ErrorMessage name="courseName" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="className">Lớp</label>
            <Field name="className" type="text" class="form-control" v-model="orderLocal.className" readonly/>
            <ErrorMessage name="className" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="createdAt">Ngày đăng ký</label>
            <Field name="createdAt" type="text" class="form-control" v-model="orderLocal.createdAt" readonly/>
            <ErrorMessage name="createdAt" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="total">Tổng cộng</label>
            <Field name="total" type="number" class="form-control" v-model="orderLocal.total" readonly/>
            <ErrorMessage name="total" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="orderStatus">Trạng thái</label>
            <Field as="select" name="orderStatus" class="form-control" v-model="orderLocal.orderStatus">
              <option value="">Chọn trạng thái</option>
              <option value="waiting">Chờ duyệt</option>
              <option value="completed">Đã duyệt</option>
              <option value="reject">Đã từ chối</option>
            </Field>
            <ErrorMessage name="orderStatus" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
        <button v-if="orderLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteOrder">
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
  emits: ["submit:order", "delete:order"],
  props: {
    order: { type: Object, required: true },
    isRoleFieldDisabled: { type: Boolean }
  },
  data() {
    const orderFormSchema = yup.object().shape({
    });
    return {
      orderLocal: this.order,
      orderFormSchema,
    };
  },
  methods: {
    submitOrder() {
      this.$emit("submit:order", this.orderLocal);
    },
    deleteOrder() {
      this.$emit("delete:order", this.orderLocal.id);
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