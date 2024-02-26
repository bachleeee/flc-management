<template>
  <header class="top-header">
    <nav class="d-flex justify-content-around">
      <ul class="d-flex justify-content-around">
        <router-link to="/lich-khai-giang">
          <li class="nav-link">Lịch khai giảng</li>
        </router-link>
        <li class="nav-link dropdown">
          <span>Các khóa học</span>
          <div class="menu-dropdown" style="width: 600px;">
            <div class="row">
              <ul class="col-6" style="padding-right: 0px;">
                <li v-for="(category, index) in categories" :key="index" class="sub-menu" @mouseover="showCourses(index)"
                 >
                  <span>{{ category.name }}</span>
                  <i class="fa-solid fa-arrow-right mt-1"></i>
                </li>
              </ul>
              <ul class="sub-menu-right col-6" :class="{ 'show': hoveredCategoryIndex !== null }">
                <li class="sub-menu-right-item" v-for="(course, courseIndex) in filteredCourses(hoveredCategoryIndex)" :key="courseIndex">
                  <router-link :to="'/course/' + course.slug">
                    {{ course.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <router-link to="/dich-vu">
          <li class="nav-link">Dịch vụ</li>
        </router-link>
        <router-link to="/tin-tuc">
          <li class="nav-link">Tin tức</li>
        </router-link>
        <router-link to="/lien-he">
          <li class="nav-link">Liên hệ</li>
        </router-link>
        <li class="nav-link dropdown" style="background-color: rgb(222, 34, 34);">
          <span>Lớp học của bạn</span>
          <div class="menu-dropdown" style="width: 158px;">
            <div class="row">
              <ul style="padding: 12px 15px;">
                <router-link :to="{ name: 'MyClass', params: { className: classItem.tenlop } }"
                  v-for="(classItem, index) in myClass" :key="index">
                  <span>{{ classItem.tenlop }}</span>
                </router-link>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>
  
<script>
import CourseService from "@/service/course.service";
import ClassService from "@/service/class.service";
import { useAuthStore } from '@/store/auth';

export default {
  data() {
    return {
      categories: [],
      courses: [],
      classes: [],
      myCourse: [],
      myClass: [],
      hoveredCategoryIndex: null,
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    async getCategory() {
      try {
        this.categories = await CourseService.getAllCategory();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    },
    async getCourse() {
      try {
        this.courses = await CourseService.getAllCourse();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    },
    async getClass() {
      try {
        this.classes = await ClassService.getAllClass();

        const userId = this.authStore.user._id;

        for (const classItem of this.classes) {
          if (classItem.students && classItem.students.includes(userId)) {
            this.myClass.push(classItem);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    },
    filteredCourses(categoryIndex) {
      if (categoryIndex !== null) {
        return this.courses.filter((course) => course.category === this.categories[categoryIndex]._id);
      } else {
        return [];
      }
    },
    showCourses(index) {
      this.hoveredCategoryIndex = index;
    },
    hideCourses(index) {
      this.hoveredCategoryIndex = null;
    },
  },
  mounted() {
    this.getCategory();
    this.getCourse();
    this.getClass();
  },
};
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: #ffffff;
  transition: color 0.3s;
  font-size: 17px;
  font-weight: 400;
  height: 50px;
}

a {
  text-decoration: none;

}

ul {
  margin-bottom: 0;
}

.nav-link:hover {
  color: #fff;
  background-color: #3c449a;
}

.top-header {
  background-color: #0082c8;
  color: rgb(255, 255, 255);
}

.dropdown {
  position: relative;
}

.dropdown:hover .menu-dropdown {
  display: block;
  visibility: visible;
}

.menu-dropdown li {
  white-space: nowrap;
  padding: 10px;
  list-style: none;
}

.menu-dropdown li:hover {
  background-color: #e3e3e3;
  color: #ff9d00;
}

.menu-dropdown a {
  text-decoration: none;
  color: #000000;
}

.fa-arrow-right {
  float: right;
}

.menu-dropdown {
  left: 0px;
  position: absolute;
  top: 50px;
  color: #000;
  z-index: 1000;
  margin: 0px;
  text-align: left;
  font-size: 15px;
  background-color: #fff;
  visibility: hidden;
  font-weight: 500;
  font-size: 16px;
}

.sub-menu-right {
  background-color: #e3e3e3;
  display: none;
}

.sub-menu-right.show {
  display: block;
}

.sub-menu-right>ul {
  padding-left: 0;
}

.sub-menu-right-item>a:hover {
  color: #ff9d00;
}
</style>
