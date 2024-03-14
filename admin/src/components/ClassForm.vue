<template>
  <div class="container">
    <Form @submit="submitClass" :validation-schema="classFormSchema">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="tenlop">Tên lớp học</label>
            <Field name="tenlop" type="text" class="form-control" v-model="classLocal.tenlop" />
            <ErrorMessage name="tenlop" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="courseName">Khóa học</label>
            <Field as="select" name="courseName" class="form-control" v-model="classLocal.courseName">
              <option value="" disabled selected>Chọn khóa học</option>
              <option v-for="(course, index) in courses" :key="course.index" :value="course.name">
                {{ course.name }}
              </option>
            </Field>
            <ErrorMessage name="courseName" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="hinhthuc">Hình thức học</label>
            <Field as="select" name="hinhthuc" class="form-control" v-model="classLocal.hinhthuc"
              @change="checkOfflineFields">
              <option value="">Chọn hình thức lớp học</option>
              <option value="online">Online</option>
              <option value="offline">Trực tiếp</option>
              <!-- Thêm các loại khác nếu cần -->
            </Field>
            <ErrorMessage name="hinhthuc" class="error-feedback" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="ngaybatdau">Ngày bắt đầu</label>
            <Field as="input" type="text" name="ngaybatdau" class="form-control flatpickr"
              v-model="classLocal.ngaybatdau" />
            <ErrorMessage name="ngaybatdau" class="error-feedback" />
          </div>
        </div>
      </div>

      <div v-if="isAddForm">
        <div class="row" v-if="showOfflineFields">
          <div class="col-md-3">
            <div class="form-group">
              <label for="soluongtoida">Số học viên tối đa</label>
              <Field name="soluongtoida" type="text" class="form-control" v-model="classLocal.soluongtoida" />
              <ErrorMessage name="soluongtoida" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="sobuoihoc">Số buổi học</label>
              <Field name="sobuoihoc" type="text" class="form-control" v-model="classLocal.sobuoihoc" />
              <ErrorMessage name="sobuoihoc" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="sobuoitrongtuan">Số buổi trong tuần</label>
              <Field name="sobuoitrongtuan" type="text" class="form-control" v-model="classLocal.sobuoitrongtuan" />
              <ErrorMessage name="sobuoitrongtuan" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-group">
              <label>Thứ</label>
              <div class="form-check" v-for="(day, index) in daysOfWeek" :key="index">
                <input type="checkbox" class="form-check-input" :id="'thu' + index" name="thu" :value="index + 1"
                  :disabled="isCheckboxDisabled(day)" v-model="classData.thu" />
                <label class="form-check-label" :for="'thu' + index">{{ day }}</label>
              </div>
              <ErrorMessage name="thu" class="error-feedback" />
            </div>
          </div>

        </div>
      </div>

      <div v-else>
        <div class="row" v-if="classLocal.hinhthuc === 'offline'">
          <div class="col-md-6">
            <div class="form-group">
              <label for="sobuoihoc">Số buổi học</label>
              <Field name="sobuoihoc" type="text" class="form-control" v-model="classLocal.sobuoihoc" />
              <ErrorMessage name="sobuoihoc" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="sobuoitrongtuan">Số buổi trong tuần</label>
              <Field name="sobuoitrongtuan" type="text" class="form-control" v-model="classLocal.sobuoitrongtuan" />
              <ErrorMessage name="sobuoitrongtuan" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Thứ</label>
              <div class="form-check" v-for="(day, index) in daysOfWeek" :key="index">
                <input type="checkbox" class="form-check-input" :id="'thu' + index" name="thu" v-model="classData.thu"
                  :value="day">
                <label class="form-check-label" :for="'thu' + index">{{ day }}</label>
              </div>
              <ErrorMessage name="thu" class="error-feedback" />
            </div>


          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="soluongtoida">Số lượng học viên tối đa</label>
              <Field name="soluongtoida" type="text" class="form-control" v-model="classLocal.soluongtoida" />
              <ErrorMessage name="soluongtoida" class="error-feedback" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
        <button v-if="classLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteClass">
          Xóa
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:classData", "delete:classData"],
  props: {
    classData: { type: Object, required: true },
    isRoleFieldDisabled: { type: Boolean },
    isAddForm: { type: Boolean },
    courses: {
      type: Array
    },
  },
  data() {
    const classFormSchema = yup.object().shape({
      tenlop: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      sobuoihoc: yup
        .number()
        .required('Vui lòng nhập số buổi học.')
        .min(20, 'Số buổi học ít nhất là 20.')
        .max(50, 'Số buổi học nhiều nhất là 50.'),
      sobuoitrongtuan: yup

        .number()
        .required('Vui lòng nhập số buổi trong tuần.')
        .min(2, 'Số buổi trong tuần ít nhất là 2.')
        .max(4, 'Số buổi trong tuần nhiều nhất là 4.'),
      soluongtoida: yup
        .number()
        .required('Vui lòng nhập số lượng học viên tối đa.')
        .min(5, 'Số lượng học viên tối đa ít nhất là 5.')
        .max(20, 'Số lượng học viên tối đa nhiều nhất là 20.'),
      thu: yup
        .array()
        .min(1, 'Vui lòng chọn ít nhất một ngày trong tuần.')
        .max(7, 'Vui lòng chọn tối đa bảy ngày trong tuần.'),

    });

    return {
      classLocal: this.classData,
      classFormSchema,
      showOfflineFields: false,
      daysOfWeek: ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'],
    };
  },

  computed: {
    selectedDaysCount() {
      return this.classData.thu.length;
    },
  },
  methods: {
    initializeFlatpickr() {
      flatpickr('.flatpickr', {
        enableTime: true, // Kích hoạt chọn giờ và phút
        dateFormat: 'Y-m-d H:i', // Định dạng ngày và giờ
        // Các tùy chọn khác nếu cần
      });
    },
    submitClass() {
      this.$emit("submit:classData", this.classLocal);
    },
    deleteClass() {
      this.$emit("delete:classData", this.classLocal.id);
    },
    checkOfflineFields() {
      this.showOfflineFields = this.classLocal.hinhthuc === 'offline';
    },
    isCheckboxDisabled(day) {
      return this.selectedDaysCount >= this.classLocal.sobuoitrongtuan && !this.classData.thu.includes(day);
    },
  },
  mounted() {
    this.initializeFlatpickr();
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