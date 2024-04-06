<template>
  <tr v-for="(course, index) in courses" :key="course._id" @click="updateActiveIndex(index)">
    <td class="col-1 table-items">{{ startIndex + index }}</td>
    <td class="col-2 table-items">{{ course.tenlop }}</td>
    <td class="col-1 table-items">{{ course.hinhthuc }}</td>
    <td v-if="course.hinhthuc === 'online'" class="col-1 table-items">{{ course.siso }}</td>
    <td v-else class="col-1 table-items">{{ course.siso }}/{{ course.soluongtoida }}</td>
    <td class="col-2 table-items" :class="getStatusClass(course.ngaybatdau, course.ngayketthuc)">
      {{ isOngoing(course.ngaybatdau, course.ngayketthuc) }}
    </td>
    <td v-if="course.hinhthuc == 'offline'" class="col-1 table-items">{{ formattedDays(course.thu) }}</td>
    <td v-else class="col-1 table-items">-</td>

    <td v-if="course.hinhthuc == 'offline'" class="col-1 table-items">{{ formatHour(course.ngaybatdau) }}</td>
    <td v-else class="col-1 table-items">-</td>

    <td class="col-3">
      <button class="btn btn-sm btn-warning mr-4" @click="toggleDetail(index)">
        Detail
      </button>
      <button class="btn btn-sm btn-danger mr-4" @click="deleteCourse(index, course._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info" @click="modifyCourse(index, course._id)">
        Edit
      </button>
      <div v-if="showDetail[index]" class="class-detail">
        <div class="d-flex justify-content-center p-4" style="background-color: white; flex-direction: column;">
          Danh sách học viên của lớp:
          <ul>
            <li v-for="(course, index) in courses" :key="course._id">
            <li v-for="(student, studentIndex) in course.students" :key="studentIndex">
              {{ studentIndex+1 }}.  {{ student.name }}
            </li>
            </li>
          </ul>
          <button class="btn btn-danger" @click="showDetail[index] = false">Đóng</button>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
import ClassService from "@/services/class.service";

export default {
  data() {
    return {
      showDetail: [],
      studentsOfClass: [],
    }
  },
  props: {
    courses: { type: Array, default: [] },
    users: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    startIndex: Number,
  },
  emits: ["update:activeIndex"],
  methods: {
    formatCurrency(price) {
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
      return `${formattedPrice}`;
    },
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    isOngoing(startDate, endDate) {
      const today = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (today < start)
        return 'Sắp khai giảng'
      else if (today < end)
        return 'Đang mở'
      else
        return 'Đã kết thúc';
    },
    getStatusClass(startDate, endDate) {
      const status = this.isOngoing(startDate, endDate);
      return {
        'text-danger': status === 'Sắp khai giảng',
        'text-success': status === 'Đang mở',
        'text-muted': status === 'Đã kết thúc',
      };
    },
    async deleteCourse(index, courseId) {
      try {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirmDelete) {
          return;
        }
        await ClassService.delete(courseId);
        this.courses.splice(index, 1);
        this.$emit("update:activeIndex", -1);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    },
    async modifyCourse(index, courseId) {
      this.$router.push({
        name: 'class.edit',
        params: { id: courseId },
      });
    },
    async getAllStudentOfClass(name) {
      const data = {
        className: name
      }
      try {
        this.studentsOfClass = await ClassService.getAllOffClass(data)
        console.log(this.studentsOfClass);
      } catch (error) {
        console.log(error)
      }
    },
    toggleDetail(index) {

      if (this.showDetail[index]) {
        this.showDetail[index] = false;
      } else {
        this.showDetail[index] = true;
      }
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
    formatHour(dateTimeString) {
      const hour = moment(dateTimeString).format('HH:mm');
      return hour;
    },
  },
  mounted() {
    // Gọi phương thức getAllStudentOfClass() cho từng lớp học trong danh sách courses
    this.courses.forEach(course => {
      this.getAllStudentOfClass(course.tenlop);
    });
  }
};
</script>

<style>
li {
  list-style: none;
}

ul {
  padding: 0;
}

.table td,
.table th {
  padding: 0.45rem;
  vertical-align: top;
}

.delete-icon {
  cursor: pointer;
}

.modify-icon {
  cursor: pointer;
}

.class-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>