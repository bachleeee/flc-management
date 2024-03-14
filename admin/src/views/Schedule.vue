<template>
  <div class="container-xxl">
    <div class="p-4">
      <div v-if="authStore.isLoggedIn">
        <div class="bg-white p-3 rounded">
          <div class="col-12">
            <div class="semibold pb-4">
              Thời khóa biểu
            </div>
            <div class="mt-2">
              <div class="row">
                <div class="col-10">
                  <table ref="scheduleTable" class="table">
                    <thead>
                      <tr>
                        <th scope="col" class="col-1">Buổi</th>
                        <th scope="col" class="col-1">Thứ 2</th>
                        <th scope="col" class="col-1">Thứ 3</th>
                        <th scope="col" class="col-1">Thứ 4</th>
                        <th scope="col" class="col-1">Thứ 5</th>
                        <th scope="col" class="col-1">Thứ 6</th>
                        <th scope="col" class="col-1">Thứ 7</th>
                        <th scope="col" class="col-1">CN</th>
                      </tr>
                      <tr>
                        <th></th>
                        <th v-for="(date, index) in thisWeek">{{ formattedDate(date.date) }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>SÁNG</th> <!-- Buổi sáng -->
                        <th v-for="(week, index) in thisWeek" :key="'morning-' + index">
                          <ScheduleList :thisWeek="week" @nextWeek="nextWeekHandler" @prevWeek="prevWeekHandler"
                            :classColor="classColor" buoi="morning"></ScheduleList>
                        </th>
                      </tr>
                      <tr>
                        <th>CHIỀU</th> <!-- Buổi trưa -->
                        <th v-for="(week, index) in thisWeek" :key="'afternoon-' + index">
                          <ScheduleList :thisWeek="week" @nextWeek="nextWeekHandler" @prevWeek="prevWeekHandler"
                            :classColor="classColor" buoi="afternoon"></ScheduleList>
                        </th>
                      </tr>
                      <tr>
                        <th>TỐI</th> <!-- Buổi tối -->
                        <th v-for="(week, index) in thisWeek" :key="'evening-' + index">
                          <ScheduleList :thisWeek="week" @nextWeek="nextWeekHandler" @prevWeek="prevWeekHandler"
                            :classColor="classColor" buoi="evening"></ScheduleList>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-between">
                    <button @click="prevWeek" class="btn btn-secondary me-2">Lùi</button>
                    <button @click="resetToToday" class="btn btn-secondary ms-2">Về Tuần Hiện Tại</button> <button
                      @click="nextWeek" class="btn btn-secondary">Tiến</button>
                  </div>
                </div>
                <div class="col-2">
                  <h5 class="">Danh sách lớp học</h5>
                  <div class=" rounded p-1 bg-grey ">
                    <div class="classItems py-4 " v-for="(classItem, index) in allClasses" :key="index"
                      :style="{ backgroundColor: getColor(index) }">
                      {{ classItem.tenlop }}
                      <!-- Kiểm tra xem có classname nào không khớp -->
                      <button class="btn btn-primary px-1 py-0"
                        v-if="shouldShowButton(classItem.tenlop) && classItem.hinhthuc == 'offline'"
                        @click="createScheduleHandler(classItem._id)">
                        <i class="fa-thin fa-plus"></i>
                      </button>
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
</template>

<script>
import ScheduleList from "@/components/ScheduleList.vue";
import ScheduleService from '@/services/schedule.service';
import ClassService from '@/services/class.service';
import { useAuthStore } from "@/store/auth";
import moment from "moment";

export default {
  components: {
    ScheduleList
  },
  data() {
    return {
      activeIndex: -1,
      currentPage: 1,
      daysToShow: 7,
      startOfWeek: moment().startOf("isoWeek"),
      thisWeek: [],
      allSchedules: [],
      allClasses: [],
      colors: ['#FFD1DC ', '#ADD8E6 ', '#FFFACD', '#98FB98', '#B19CD9', '#FFD700', '#F6F193', '#C5EBAA', '#F6F193', '#F2C18D'], // Thay đổi màu sắc theo ý muốn
      classColor: []
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  mounted() {
    this.fillTableWithDates();
  },
  watch: {
    startOfWeek: {
      handler() {
        this.updateThisWeek();
      },
      immediate: true,
    },
  },
  methods: {
    async getAllClasses() {
      try {
        this.allClasses = await ClassService.getAllClass();
        // Tạo mảng classColor từ allClasses và colors
        this.classColor = this.allClasses.map((classItem, index) => ({
          classname: classItem.tenlop,
          color: this.colors[index % this.colors.length], // Sử dụng index để lặp lại màu sắc nếu hết màu
        }));
      } catch (error) {
        console.log(error);
      }
    },
    async getAllSchedules() {
      try {
        this.allSchedules = await ScheduleService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    fillTableWithDates() {
      const table = this.$refs.scheduleTable;

      const weekDays = [];
      for (let i = 0; i < this.daysToShow; i++) {
        const day = this.startOfWeek.clone().add(i, "days");
        weekDays.push(day);
      }

      this.updateThisWeek();

    },
    nextWeek() {
      this.startOfWeek.add(7, "days"); // Cập nhật ngày bắt đầu của tuần
      this.fillTableWithDates();
    },
    prevWeek() {
      this.startOfWeek.subtract(7, "days");
      this.fillTableWithDates();
    },
    resetToToday() {
      this.startOfWeek = moment().startOf("isoWeek");
      this.fillTableWithDates();
    },
    updateThisWeek() {
      this.thisWeek = [];
      for (let i = 0; i < this.daysToShow; i++) {
        const day = this.startOfWeek.clone().add(i, "days");
        this.thisWeek.push({
          date: day.format("YYYY-MM-DD"),
          // Thêm các thông tin khác nếu cần
        });
      }
    },
    nextWeekHandler() {
      this.nextWeek();
      this.$refs.scheduleLists.forEach((scheduleList) => {
        scheduleList.updateScheduleData();
      });
    },
    prevWeekHandler() {
      this.prevWeek();
      this.$refs.scheduleLists.forEach((scheduleList) => {
        scheduleList.updateScheduleData();
      });
    },
    getColor(index) {
      // Lặp lại mảng màu sắc nếu index lớn hơn số lượng màu
      const colorIndex = index % this.colors.length;
      return this.colors[colorIndex];
    },
    shouldShowButton(className) {
      return !this.allSchedules.some(schedule => schedule.tenlop === className);
    },
    formattedDate(date) {
      return moment(date).format('DD-MM');
    },
    async createScheduleHandler(classId) {
      try {

        const response = await ClassService.createClassSchedule(classId);
        if (response.success) {
          console.log("Lịch học đã được tạo thành công!");
        } else {
          console.error("Đã xảy ra lỗi khi tạo lịch học:", response.message);
        }
        window.alert("Lịch học đã được tạo thành công!")
        this.$router.go(0);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tạo lịch học:", error);
      }
    },
  },
  mounted() {
    this.getAllSchedules()
    this.getAllClasses()
  }
};
</script>

<style scoped>
.semibold {
  font-size: 1.5rem;
  font-weight: 500;
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

table thead th {
  text-transform: uppercase;
  background-color: rgb(238, 238, 238);
  border: 1px solid black;
  text-align: center;
}

.bg-grey {
  background-color: rgb(238, 238, 238);
}

.classItems {
  color: rgb(70, 70, 70);
  font-weight: bold;

}
</style>
