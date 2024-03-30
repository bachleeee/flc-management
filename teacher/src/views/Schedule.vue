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
                        <th>SÁNG 8h-12h</th> <!-- Buổi sáng -->
                        <th v-for="(date, index) in thisWeek" :key="'morning-' + index">
                          <ScheduleList :thisWeek="date" @nextWeek="nextWeekHandler" @prevWeek="prevWeekHandler"
                            :classColor="classColor" buoi="morning" :daysOff="daysOff"></ScheduleList>
                        </th>
                      </tr>
                      <tr>
                        <th>CHIỀU 13h30-17h30</th> <!-- Buổi trưa -->
                        <th v-for="(date, index) in thisWeek" :key="'afternoon-' + index">
                          <ScheduleList :thisWeek="date" @nextWeek="nextWeekHandler" @prevWeek="prevWeekHandler"
                            :classColor="classColor" :daysOff="daysOff" buoi="afternoon"></ScheduleList>
                        </th>
                      </tr>
                      <tr>
                        <th>TỐI 18h-21h</th> <!-- Buổi tối -->
                        <th v-for="(date, index) in thisWeek" :key="'evening-' + index">
                          <ScheduleList :thisWeek="date" @nextWeek="nextWeekHandler" @prevWeek="prevWeekHandler"
                            :classColor="classColor" :daysOff="daysOff" buoi="evening"></ScheduleList>
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
                  <div class=" rounded p-1 bg-grey " style="height: 300px; overflow-y: auto;">
                    <div class="classItems py-3 d-flex justify-content-between rounded mt-1" v-for="(classItem, index) in allClasses"
                      :key="index" :style="{ backgroundColor: getColor(index) }">
                      <div class="px-2">
                        {{ classItem.tenlop }}
                      </div>
                      <!-- Kiểm tra xem có classname nào không khớp -->
                      <button class="btn btn-primary px-1 py-0"
                        v-if="shouldShowButton(classItem.tenlop) && classItem.hinhthuc == 'offline'"
                        @click="showForm[classItem._id] = true">
                        <i class="fa-thin fa-plus"></i>
                      </button>
                      <button class="btn btn-danger px-1 py-0 " v-else @click="deleteAllClassSchedule(classItem._id)">
                        <i class="fa-solid fa-x"></i>
                      </button>
                      <!-- Form cho từng lớp học -->
                      <div class="form-wrapper" v-if="showForm[classItem._id]">
                        <div class="form" style="z-index: 999;">
                          <div>
                            <label for="soluong">Số lượng tối đa của lớp</label>
                            {{ classItem.soluongtoida }}
                          </div>
                          <div>
                            <label for="phong">Chọn phòng</label>
                            <select v-model="selectedRoom">
                              <option v-for="room in rooms" :value="room">{{ room.sophong }} - Sức chứa: {{ room.succhua
                                }}</option>
                            </select>
                          </div>
                          <div class="mt-3">
                            <button class="btn btn-primary mr-4"
                              @click="createScheduleHandler(classItem._id)">Submit</button>
                            <button class="btn btn-danger" @click="showForm[classItem._id] = false">Đóng</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 class="">Lịch nghỉ</h5>
                  <div class=" rounded p-1 bg-grey " style="height: 300px; overflow-y: auto;">
                    <div class="classItems py-3 d-flex justify-content-between rounded" v-for="(dayOffItems, index) in daysOff"
                      :key="index" style="background-color: white;">
                      <div class="px-2">
                        {{ dayOffItems.noiDung }}
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
  </div>
</template>

<script>
import ScheduleList from "@/components/ScheduleList.vue";
import ScheduleService from '@/services/schedule.service';
import RoomService from '@/services/room.service';
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
      classColor: [],
      showForm: {},
      rooms: [],
      selectedRoom: null,
      daysOff: []
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
    async getAllRoom() {
      try {
        this.rooms = await RoomService.getAllRoom();
      } catch (error) {
        console.log(error);
      }
    },
    async getAllDaysOff() {
      try {
        this.daysOff = await ScheduleService.getAllDaysOff();
        console.log(this.daysOff)
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
        const data = {
          phong: this.selectedRoom.sophong
        }
        const response = await ClassService.createClassSchedule(classId, data);
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
    async deleteAllClassSchedule(classId) {
      if (confirm("Bạn có chắc muốn xóa tất cả lịch học của lớp này không?")) {
        try {
          const response = await ClassService.deleteClassSchedule(classId);

          window.alert("Lịch học đã được xóa thành công!");
          this.$router.go(0);


        } catch (error) {
          console.error("Đã xảy ra lỗi khi xóa lịch học:", error);
          window.alert("Đã xảy ra lỗi khi xóa lịch học!");
        }
      }
    },
    showCreateClassScheduleFrom() {
      this.showForm = true
    }
  },
  mounted() {
    this.getAllSchedules()
    this.getAllClasses()
    this.getAllRoom()
    this.getAllDaysOff() 

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
  font-weight: 500;
  font-size: 16px;
}

.form-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  background-color: white;
  padding: 50px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

::-webkit-scrollbar {
  width: 4px; /* Chiều rộng của thanh cuộn */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3); 
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1); 
}
</style>
