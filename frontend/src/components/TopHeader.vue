<template>
  <header class="top-header">
    <nav class="d-flex justify-content-around">
      <ul class="d-flex justify-content-around align-items-center">
        <router-link to="/lich-khai-giang">
          <li class="nav-link">Lịch khai giảng</li>
        </router-link>
        <li class="nav-link dropdown">
          <span>Các khóa học</span>
          <div class="menu-dropdown" style="width: 600px;">
            <div class="row">
              <ul class="col-6" style="padding-right: 0px;">
                <li v-for="(cat, index) in cats" :key="index" class="sub-menu">
                  <span>{{ cat.name }}</span>
                  <i class="fa-solid fa-arrow-right mt-1"></i>
                </li>
              </ul>
              <div class="col-6" style="padding-left: 0px;">
                <div class="sub-menu-right" v-for="(cat, index) in cats" :key="index">
                  <ul v-for="(course, courseIndex) in courses" :key="courseIndex">
                    <li v-if="course.category == cat._id">
                      <router-link :to="'/course/' + course.slug">
                        {{ course.name }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
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
          <span>Khóa học của bạn</span>
          <div class="menu-dropdown" >
            <div class="row">
              <ul style="padding: 12px 15px;">
                <li v-for="(cat, index) in cats" :key="index" class="sub-menu">
                  <span>{{ cat.name }}</span>
                  
                </li>
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

export default {
  data() {
    return {
      cats: [],
      courses: []
    };
  },
  methods: {
    async getCategory() {
      try {
        this.cats = await CourseService.getAllCategory();
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
  },
  mounted() {
    this.getCategory();
    this.getCourse();
  },
};
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: #ffffff;
  transition: color 0.3s, background-color 0.3s;
  font-size: 17px;
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
  top: 42px;
  color: #000;
  z-index: 1000;
  margin: 0px;
  text-align: left;
  font-size: 15px;
  border: solid 1px #eeeeee;
  background-color: #fff;
  visibility: hidden;
}

.sub-menu-right {
  background-color: #e3e3e3;
}

.sub-menu-right>ul {
  padding-left: 0;
}

.sub-menu .sub-menu-right :hover {
  background-color: #f40505;
}
</style>
