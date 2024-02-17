<template>
  <div class="container">
    <div class="row">
      <div class="col-6">

      </div>
      <div class="col-5">
        <div v-if="lesson.length > 0">
          <h4>Danh sách bài học</h4>
          <ul class="lesson-list">
            <router-link v-for="(lessonItem, index) in lesson" :key="index"
              :to="{ name: 'LessonDetail', params: { lessonName: lessonItem.slug } }">
              <li class="lesson-item">
                <div class="lesson-header">
                  <span class="lesson-number">Bài học {{ index + 1 }}:</span>
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
</template>

<script>
import CourseService from "@/service/course.service";
import ClassService from "@/service/class.service";
import LessonService from "@/service/lesson.service";
import { useAuthStore } from '@/store/auth';

export default {
  data() {
    return {
      myCourse: null,
      myClass: null,
      lesson: []
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    async getMyCourseAndMyClass() {
      try {
        this.classes = await ClassService.getAllClass();
        const userId = this.authStore.user._id;

        for (const classItem of this.classes) {
          if (classItem.students && classItem.students.includes(userId)) {
            this.myClass = classItem;
            break;
          }
        }

        if (this.myClass) {
          const courid = this.myClass.courseid;
          this.myCourse = await CourseService.getById(courid);

          console.log("Lớp học của bạn:", this.myClass);
          console.log("Khóa học của bạn:", this.myCourse);

          this.lesson = await LessonService.getLessonByCourse(courid);

          console.log("Danh sách bài học:", this.lesson);
        } else {
          console.log("Không tìm thấy lớp học phù hợp.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách lớp học:", error);
      }
    },

  },
  created() {
    this.getMyCourseAndMyClass();
  },
};
</script>

<style scoped>
.lesson-list {
  list-style: none;
  padding: 0;
}

.lesson-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f4992b;
  transition: background-color 0.3s ease;
}

.lesson-item:hover {
  background-color: #2560df;
}

.lesson-header {
  display: flex;
  align-items: center;
}

.lesson-number {
  font-size: 16px;
  color: #333;
  margin-right: 10px;
}

.lesson-name,
.lesson-number {
  color: white;
}
</style>