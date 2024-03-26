<template>
  <div class="container-xxl">
    <div class="container">
      <h3 class="p-4 d-flex justify-content-center" style="color: blue;">Chào mừng đến với lớp học</h3>
      <div class="row">
        <div class="col-6">
          <div class="px-4">
            <div class="bg-white p-4">
              <div class="d-flex flex-column mb-4 align-items-center">
                <h3 v-if="myClass" style="color: blue;">{{ myClass.courseName }}</h3>
                <p>{{ lesson.length }} Bài học</p>
              </div>
              <div class="d-flex flex-wrap">
                <div v-for="(lessonItem, index) in lesson" :key="index">
                  <div class="list-lesson justify-content-center">
                    <img class="hexagon" :src="getLessonImg(lessonItem._id)" alt="">
                    <span class="lesson-number">{{ index + 1 }}</span>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center note-list pt-5">
                <div class="d-flex note">
                  <img src="../assets/img/myclass/default.png" alt="" style="height: 27px;">
                  <p>Chưa học</p>
                </div>
                <div class="d-flex note pl-5">
                  <img src="../assets/img/myclass/inProgress.png" alt="" style="height: 27px;">
                  <p>Đang học</p>
                </div>
                <div class="d-flex note pl-5">
                  <img src="../assets/img/myclass/completed.png" alt="" style="height: 27px;">
                  <p>Đã hoàn thành</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="pl-5">
            <div v-if="lesson.length > 0">
              <ul class="lesson-list">
                <router-link v-for="(lessonItem, index) in lesson" :key="index"
                  :to="{ name: 'LessonDetail', params: { lessonName: lessonItem.slug } }"
                  @click="createProgress(lessonItem._id)">
                  <li class="lesson-item row align-items-center">
                    <div class="lesson-header justify-content-center">
                      <img class="hexagon" :src="getLessonImg(lessonItem._id)" alt="">
                      <span class="lesson-number">{{ index + 1 }}</span>
                    </div>
                    <div class="d-flex flex-column">
                      <strong class="course-name">{{ myClass.courseName }}</strong>
                      <strong class="lesson-name">{{ lessonItem.name }}</strong>
                    </div>
                  </li>
                </router-link>
              </ul>
            </div>
            <div v-else>
              <p>Không có bài học nào cho khóa học này.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassService from "@/service/class.service";
import LessonService from "@/service/lesson.service";
import ProgressService from "@/service/progress.service";
import { useAuthStore } from '@/store/auth';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      myClass: null,
      lesson: [],
      myProgress: [],
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
    extendedLesson() {
      const repetitionCount = 10;
      return Array.from({ length: repetitionCount }, () => this.lesson).flat();
    },
  },
  methods: {
    async getMyClass() {
      try {
        const className = this.$route.params.className; // Sử dụng this.$route.params.className để lấy giá trị của tham số className từ router
        console.log(className);
        this.myClass = await ClassService.getClass(className);

        if (this.myClass) {

          const courseName = this.myClass.courseName;
          this.lesson = await LessonService.getLessonByClassName(this.myClass.tenlop);
          console.log("Danh sách bài học:", this.lesson);

          const cookieValue = Cookies.get('token');
          this.myProgress = await ProgressService.getMyProgress(cookieValue, this.myClass._id);
          console.log("Tiến độ học tập của bạn:", this.myProgress);
        } else {
          console.log("Không tìm thấy lớp học phù hợp.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách lớp học:", error);
      }
    },
    getLessonImg(lessonId) {
      if (this.myProgress) {
        const progressItem = this.myProgress.find(item => item.lessonid === lessonId);
        if (progressItem) {
          switch (progressItem.status) {
            case 'inprogress':
              return "../src/assets/img/myclass/inProgress.png";
            case 'completed':
              return "../src/assets/img/myclass/completed.png";
            default:
              return "../src/assets/img/myclass/default.png";
          }
        }
      }
      return "../src/assets/img/myclass/default.png";
    },
    async createProgress(lessonId) {
      try {
        const cookieValue = Cookies.get('token');
        const data = {
          classid: this.myClass._id,
          lessonid: lessonId,
          status: "inprogress",
        };

        if (this.authStore.isLoggedIn && this.myClass) {
          const existingProgress = await ProgressService.getMyProgress(cookieValue, this.myClass._id);
          
          const hasExistingProgress = existingProgress.some(progress => progress.lessonid === lessonId);

          if (!hasExistingProgress) {
            await ProgressService.createProgress(cookieValue, data);
            console.log("Tiến độ đã được tạo cho bài học có ID:", lessonId);
          } else {
            console.log("Tiến trình đã tồn tại cho bài học có ID:", lessonId);
          }
        } else {
          console.error('Không có thông tin tiến độ hoặc người dùng chưa đăng nhập.');
        }
      } catch (error) {
        console.error("Lỗi khi tạo tiến độ:", error);
      }
    },
  },
  created() {
  this.getMyClass();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.container-xxl {
  background-color: #f0f7ff;
}

.lesson-list {
  list-style: none;
  padding: 0;
}

.lesson-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
  box-shadow: 4px 18px 15px #d4d4d4;

}

.lesson-item:hover {
  background-color: #ffdea4;
}

.list-lesson {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.lesson-header {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.lesson-number {
  font-size: 20px;
  color: #ffffff;
  z-index: 20;
  position: absolute;
  font-weight: 700;
}

.hexagon {
  width: 100%;
  height: auto;
}

.lesson-name {
  text-transform: uppercase;
  color: rgb(0, 0, 0);
}

.course-name {
  color: grey;
  font-weight: normal;
}

.bg-white {
  background-color: white;
}

.note-list {
  padding-left: 10px;
}
</style>