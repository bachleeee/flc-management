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
              <option value="" selected>Chọn khóa học</option>
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
              <Field name="soluongtoida" type="number" class="form-control" v-model="classLocal.soluongtoida" />
              <ErrorMessage name="soluongtoida" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="sobuoihoc">Số buổi học</label>
              <Field name="sobuoihoc" type="number" class="form-control" v-model="classLocal.sobuoihoc" />
              <ErrorMessage name="sobuoihoc" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="thoigianhoc">Thời gian học</label>
              <Field name="thoigianhoc" type="number" class="form-control" v-model="classLocal.thoigianhoc" />
              <ErrorMessage name="thoigianhoc" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="sobuoitrongtuan">Số buổi trong tuần</label>
              <Field name="sobuoitrongtuan" type="number" class="form-control" v-model="classLocal.sobuoitrongtuan" />
              <ErrorMessage name="sobuoitrongtuan" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-1">
            <div class="form-group">
              <label>Thứ</label>
              <div class="form-check" v-for="(day, index) in daysOfWeek" :key="index">
                <input type="checkbox" class="form-check-input" :id="'thu' + index" name="thu" :value="index + 1"
                  :disabled="isCheckboxDisabled(day)" v-model="classLocal.thu" />
                <label class="form-check-label" :for="'thu' + index">{{ day }}</label>
              </div>
              <ErrorMessage name="thu" class="error-feedback" />
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="row" v-if="classLocal.hinhthuc === 'offline'">
          <div class="col-md-3">
            <div class="form-group">
              <label for="sobuoihoc">Số buổi học</label>
              <Field name="sobuoihoc" type="number" class="form-control" v-model="classLocal.sobuoihoc" />
              <ErrorMessage name="sobuoihoc" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="sobuoitrongtuan">Số buổi trong tuần</label>
              <Field name="sobuoitrongtuan" type="number" class="form-control" v-model="classLocal.sobuoitrongtuan" />
              <ErrorMessage name="sobuoitrongtuan" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>Thứ</label>
              <Field name="thu" type="text" class="form-control" v-model="formattedSelectedDays" />
              <ErrorMessage name="thu" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="soluongtoida">Số lượng HV tối đa</label>
              <Field name="soluongtoida" type="number" class="form-control" v-model="classLocal.soluongtoida" />
              <ErrorMessage name="soluongtoida" class="error-feedback" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="teacher">Khóa học</label>
              <Field as="select" name="teacher" class="form-control" v-model="classLocal.teachers[0].name">
                <option value="" selected>Chọn giáo viên</option>
                <option v-for="(teacher, index) in teachers" :key="teacher.index" :value="teacher.name">
                  {{ teacher.name }}
                </option>
              </Field>
              <ErrorMessage name="teacher" class="error-feedback" />
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
import UserService from "@/services/user.service";
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
        .required('Vui lòng nhập tên lớp.')
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      ngaybatdau: yup
        .string()
        .required('Vui lòng nhập ngày bắt đầu.')
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      classLocal: this.classData,
      classFormSchema,
      showOfflineFields: false,
      daysOfWeek: ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy',],
      teachers: []
    };
  },

  computed: {
    selectedDaysCount() {
      return this.classData.thu.length;
    },
    formattedSelectedDays() {
      if (Array.isArray(this.classLocal.thu) && this.classLocal.thu.length > 0) {
        const daysOfWeek = ['Chủ nhật', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'];
        const selectedDays = this.classLocal.thu.map(day => daysOfWeek[day]);
        return selectedDays.join(', ');
      } else {
        return '';
      }
    }
  },
  methods: {
    initializeFlatpickr() {
      flatpickr('.flatpickr', {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
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
    async getAllUsers() {
      try {
        this.users = await UserService.getAllUser();
        this.users.forEach(user => {
          if (user.role === 'teacher') {
            this.teachers.push(user);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.initializeFlatpickr();
    this.getAllUsers();
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