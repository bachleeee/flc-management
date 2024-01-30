<template>
  <div class="container ">
    <Form @submit="submitProduct" :validation-schema="productFormSchema">
    
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Tên sản phẩm</label>
            <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="category">Loại sản phẩm</label>
            <Field as="select" name="category" class="form-control" v-model="productLocal.category">
              <option value="">Chọn loại sản phẩm</option>
              <option value="van-hoc">Văn học</option>
              <option value="tam-ly-hoc">Tâm lý học</option>
              <option value="kinh-te">Kinh tế</option>
              <option value="ngoai-ngu">Ngoại ngữ</option>
            </Field>
            <ErrorMessage name="category" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Mô tả</label>
        <Field name="description" type="text" class="form-control" v-model="productLocal.description" />
        <ErrorMessage name="description" class="error-feedback" />
      </div>
      
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="price">Giá</label>
          <Field name="price" type="number" class="form-control" v-model="productLocal.price" />
          <ErrorMessage name="price" class="error-feedback" />
        </div>

        <div class="form-group col-md-6">
          <label for="quantity">Số lượng</label>
          <Field name="quantity" type="number" class="form-control" v-model="productLocal.quantity" />
          <ErrorMessage name="quantity" class="error-feedback" />
        </div>
      </div>

      <div class="form-group">
        <label for="img">Hình ảnh</label>
        <Field name="img" type="text" class="form-control" v-model="productLocal.img" />
        <ErrorMessage name="img" class="error-feedback" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
        <button v-if="productLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteProduct">
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
  emits: ["submit:product", "delete:product"],
  props: {
    product: { type: Object, required: true }
  },
  data() {
    const productFormSchema = yup.object().shape({
      name: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      productLocal: this.product,
      productFormSchema,
     
    };
  },
  methods: {
    submitProduct() {
      this.$emit("submit:product", this.productLocal);
    },
    deleteProduct() {
      this.$emit("delete:product", this.productLocal.id);
    },
    
  },
};
</script>

<style scoped>
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