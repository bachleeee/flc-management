<template>
  <div class="container">
    <Form @submit="submitVideo" :validation-schema="videoFormSchema">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="sophong">Số phòng</label>
            <Field name="sophong" type="text" class="form-control" v-model="videoLocal.sophong" />
            <ErrorMessage name="sophong" class="error-feedback" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="succhua">Sức chứa</label>
            <Field name="succhua" type="number" class="form-control" v-model="videoLocal.succhua" />
            <ErrorMessage name="succhua" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
        <button v-if="videoLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteVideo">
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
  emits: ["submit:video", "delete:video"],
  props: {
    video: { type: Object, required: true },
    isRoleFieldDisabled: { type: Boolean }
  },
  data() {
    const videoFormSchema = yup.object().shape({
    });
    return {
      videoLocal: this.video,
      videoFormSchema,
    };
  },
  methods: {
    submitVideo() {
      this.$emit("submit:video", this.videoLocal);
    },
    deleteVideo() {
      this.$emit("delete:video", this.videoLocal.id);
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