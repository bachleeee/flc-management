<template>
  <div class="container">
    <div class="row">
      <div class="col-9">
        <div class="course-title">
          {{ course.name }}
        </div>
        <hr>
        <div class="description">
          {{ course.description }}
        </div>
        <hr>
        <div class="signup">
          <div>Lịch khai giảng</div>
          <hr>
          <table class="table table-striped">
            <thead>
              <tr class="table-primary">
                <th scope="col">Lớp</th>
                <th scope="col">Thời khóa biểu</th>
                <th scope="col">Ngày khai giảng</th>
                <th scope="col">Số buổi học</th>
                <th scope="col">Sỉ số hiện tại</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(myClass, index) in classes" :key="index">
                <td>{{ myClass.tenlop }}</td>
                <td>{{ myClass.thu }}</td>
                <td>{{ myClass.ngaybatdau }}</td>
                <td>{{ myClass.sobuoihoc }}</td>
                <td>{{ myClass.siso }} / {{ myClass.soluong }}</td>
                <td>
                  <router-link :to="{ name: 'SignUpClass', params: { className: myClass.tenlop , courseName:   course.slug} }">
                    <button class="btn btn-primary">Đăng ký</button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseService from '@/service/course.service';
import ClassService from '@/service/class.service';
import UserService from '@/service/user.service';
import { useAuthStore } from '@/store/auth';
import Cookies from 'js-cookie';
import Class from '@/components/Class.vue'

export default {
  components: {
    Class
  },
  data() {
    return {
      course: null,
      classes: []
    };
  },
  created() {
    this.loadCourseDetails();
    this.getClass();
  },
  watch: {
    '$route.params.slug': 'loadCourseDetails',
    'course._id': 'getClass'
  },
  methods: {
    async loadCourseDetails() {
      const slug = this.$route.params.slug;
      try {
        const response = await CourseService.getBySlug(slug);
        console.log('API Response:', response);
        if (response) {
          this.course = response;
        } else {
          console.error('Course data not found.');
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
        if (error.response && error.response.status === 404) {
          console.error('Course not found (404).');
        }
      }
    },
    async getClass() {
      const courseID = this.course._id
      try {
        const response = await ClassService.getClassByCourse(courseID);
        console.log('API Response class:', response);
        if (response) {
          this.classes = response;
        } else {
          console.error('Class data not found.');
        }
      } catch (error) {
        console.error('Error fetching Class ', error);
      }
    },
    
    async addToCart() {
      try {
        const cookieValue = Cookies.get('token');

        const cartItem = {
          _id: this.product._id,
          count: this.quantity,
        };

        const newCartItemArray = { cart: [cartItem] };

        if (this.authStore.isLoggedIn) {
          await UserService.addtocart(cookieValue, newCartItemArray);
          this.showAddToCartMessage = true;
        }

        if (this.showAddToCartMessage) {
          window.alert("Đã thêm sản phẩm vào giỏ hàng");
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #000000;
  padding: 8px;
  text-align: left;
}
</style>
