<template>
  <div class="container">
    <Form @submit="" :validation-schema="lessonFormSchema">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Tên bài học</label>
            <Field name="name" type="text" class="form-control" v-model="lessonLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="className">Lớp</label>
            <Field as="select" name="className" class="form-control" v-model="lessonLocal.className">
              <option value="" selected>Chọn lớp</option>
              <option v-for="(classItem, index) in classData" :key="index" :value="classItem.tenlop">
                {{ classItem.tenlop }}
              </option>
            </Field>
            <ErrorMessage name="className" class="error-feedback" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="content">Nội dung</label>
            <Field name="content" type="text" class="form-control" v-model="lessonLocal.content" />
            <ErrorMessage name="content" class="error-feedback" />
          </div>
        </div>
      </div>
      <div v-if="!isAddForm">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="exams">Bài tập</label>
              <div class="row">
                <div class="col-12" v-for="(exam, index) in lessonLocal.exams" :key="index">
                  <div class="position-relative">
                    <div class="d-flex justify-content-between">
                      <div class="">
                        {{ index + 1 }}.{{ exam.question }} ({{ exam.correctOption }})
                      </div>
                      <div>
                        <i @click="showOptions(index)" class="fa-solid fa-ellipsis"></i>
                        <div v-if="showDropdown[index]" class="dropdown-container">
                          <div class="d-flex" style="flex-direction: column; background-color: white;">
                            <button class="btn btn-info my-1" @click="showDetail">Chi tiết</button>
                            <button class="btn btn-danger my-1" @click="">Xóa</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="examsAdd">Thêm bài tập</label>
              <div class="d-flex">
                <select class="form-control" v-model="selectedExam">
                  <option v-for="(exam, index) in examsData" :key="index" :value="exam._id">
                    {{ exam.question }}
                  </option>
                </select>
                <button class="btn btn-success" @click="addExamToLesson(selectedExam, thisLessonId)">Thêm</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <button type="button" class="btn btn-primary" @click="submitLesson">Lưu</button>
        <button v-if="lessonLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteLesson">
          Xóa
        </button>
      </div>
    </Form>
  </div>

</template>

<script>
import ClassService from "@/services/class.service";
import ExamService from "@/services/exam.service";
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
    thisLessonId: { type: String },
    isAddForm: { type: Boolean }
  },
  data() {
    const lessonFormSchema = yup.object().shape({
    });
    return {
      lessonLocal: this.lesson,
      lessonFormSchema,
      classData: [],
      examsData: [],
      selectedExam: null,
      showDropdown: [],
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
    async getAllExam() {
      try {
        this.examsData = await ExamService.getAllLessonExam()
      } catch (error) {
        console.log(error);
      }
    },
    async addExamToLesson(examId, lessonId) {
      try {
        const data = { lessonId };
        const response = await ExamService.addExam(examId, data)
        if (response) {
          window.alert("Thêm bài tập thành công")
          this.$router.go(0);
        }
      } catch (error) {
        console.log(error);
      }
    },
    showOptions(index) {
      if (this.showDropdown[index]) {
        this.showDropdown[index] = false;
      } else {
        this.showDropdown[index] = true;
      }
    },
    showDetail() {
      // Phương thức xử lý khi nhấn vào nút "Chi tiết"
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
    this.getAllExam()
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

.dropdown-container {
  position: absolute;
  right: 0;
  top: 40%;
  z-index: 999;
}
</style>