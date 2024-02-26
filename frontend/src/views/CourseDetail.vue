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
                <td>Thứ {{ formattedDays(myClass.thu) }}</td>
                <td>{{ formatDate(myClass.ngaybatdau) }}</td>
                <td>{{ myClass.sobuoihoc }}</td>
                <td>{{ myClass.siso }} / {{ myClass.soluong }}</td>
                <td>
                  <router-link
                    :to="{ name: 'SignUpClass', params: { className: myClass.tenlop, courseName: course.slug } }">
                    <button  class="btn btn-primary">Đăng ký</button>
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
import { useAuthStore } from '@/store/auth';

export default {
  data() {
    return {
      course: null,
      classes: [],
    };
  },
  created() {
    this.loadDetails();
  },
  watch: {
    '$route.params.slug': 'loadDetails',
  },
  methods: {
    async loadDetails() {
      const slug = this.$route.params.slug;
      try {
        const response = await CourseService.getBySlug(slug);
        console.log('API Response course:', response);
        if (response) {
          this.course = response;

          const courseID = response._id;
          try {
            const myResponse = await ClassService.getClassByCourse(courseID);
            console.log('API myResponse class:', myResponse);
            if (myResponse) {
              // const currentDate = new Date();
              // const futureClasses = myResponse.filter(myClass => {
              //   const classStartDate = new Date(myClass.ngaybatdau);
              //   return classStartDate > currentDate;
              // });

              this.classes = myResponse;
            } else {
              console.error('Class data not found.');
            }

          } catch (error) {
            console.error('Error fetching Class ', error);
          }
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
    formattedDays(days) {
      const daysOfWeek = ['Chủ nhật', '2', '3', '4', '5', '6', '7'];
      const selectedDays = days.map(day => daysOfWeek[day]);
      return selectedDays.join(', ');
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDay = day.toString().padStart(2, '0');
      const formattedMonth = month.toString().padStart(2, '0');

      return `${formattedDay}/${formattedMonth}/${year}`;
    },
    formatHour(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}`;
    },
    isFutureDate(timestamp) {
      if (!timestamp) {
        return false;
      }
      const currentDate = new Date();
      const classDate = new Date(timestamp);
      return classDate > currentDate;
    },
    isUserAlreadyRegistered() {
      return Array.isArray(course.students) && course.students.some(student => student._id === this.authStore.user._id);
    }

    // async addToCart() {
    //   try {
    //     const cookieValue = Cookies.get('token');

    //     const cartItem = {
    //       _id: this.product._id,
    //       count: this.quantity,
    //     };

    //     const newCartItemArray = { cart: [cartItem] };

    //     if (this.authStore.isLoggedIn) {
    //       await UserService.addtocart(cookieValue, newCartItemArray);
    //       this.showAddToCartMessage = true;
    //     }

    //     if (this.showAddToCartMessage) {
    //       window.alert("Đã thêm sản phẩm vào giỏ hàng");
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
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
