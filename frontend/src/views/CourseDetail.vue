<template>
  <div class="container mt-4">
    <div v-if="course">
      <div class="row">
        <div class="col-9">
          <div class="course-title" style="color: blue; font-size: 25px; font-weight: 600;">
            {{ course.name }}
          </div>
          <hr>
          <div class="description">
            {{ course.des }}
          </div>
          <hr>
          <div class="signup" v-if="classes.length > 0">
            <div style="color: blue; font-size: 25px; font-weight: 600;">Lịch khai giảng</div>
            <hr>
            <table class="table table-striped">
              <thead>
                <tr class="table-primary">
                  <th scope="col">Lớp</th>
                  <th scope="col">Thời khóa biểu</th>
                  <th scope="col">Ngày khai giảng</th>
                  <th scope="col">Thời gian học</th>
                  <th scope="col">Sỉ số hiện tại</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(myClass, index) in classes" :key="index">
                  <td>{{ myClass.tenlop }}</td>
                  <td v-if="myClass.hinhthuc == 'online'">Online</td>
                  <td v-else>Thứ {{ formattedDays(myClass.thu) }}</td>
                  <td>{{ formatDate(myClass.ngaybatdau) }}</td>
                  <td v-if="myClass.hinhthuc == 'online'">{{ myClass.sobuoihoc }}</td>
                  <td v-else>{{ myClass.sobuoihoc }} buổi</td>
                  <td v-if="myClass.hinhthuc == 'online'">{{ myClass.siso }} </td>
                  <td v-else>{{ myClass.siso }} / {{ myClass.soluongtoida }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'SignUpClass', params: { className: myClass.tenlop, courseName: course.slug } }">
                      <button :disabled="isUserAlreadyRegistered()" class="btn btn-primary">Đăng ký</button>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

          const courseName = response.name;
          try {
            const myResponse = await ClassService.getAllByCourseName(courseName);
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
      if (this.classes && this.classes.length > 0) {
        for (const myClass of this.classes) {
          if (myClass.students && myClass.students.length > 0) {
            for (const student of myClass.students) {
              if (student.tenhocvien === this.authStore.user.name) {
                return true; // Người dùng đã đăng ký
              }
            }
          }
        }
      }
      return false;
    },
    formattedDays(days) {
      if (Array.isArray(days) && days.length > 0) {
        const daysOfWeek = ['Chủ nhật', '2', '3', '4', '5', '6', '7'];
        const selectedDays = days.map(day => daysOfWeek[day]);
        return selectedDays.join(', ');
      } else {
        return ''; // hoặc bất kỳ giá trị mặc định nào bạn muốn trả về cho trường hợp không phải mảng
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
