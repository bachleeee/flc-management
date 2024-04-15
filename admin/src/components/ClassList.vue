<template>
  <tr v-for="(course, index) in courses" :key="course._id" @click="updateActiveIndex(index)">
    <td class=" table-items">{{ startIndex + index }}</td>
    <td class=" table-items">{{ course.tenlop }}</td>
    <td class=" table-items">{{ course.hinhthuc }}</td>
    <td v-if="course.hinhthuc === 'online'" class=" table-items">{{ course.siso }}</td>
    <td v-else class=" table-items">{{ course.siso }}/{{ course.soluongtoida }}</td>
    <td class=" table-items" :class="getStatusClass(course.ngaybatdau, course.ngayketthuc)">
      {{ isOngoing(course.ngaybatdau, course.ngayketthuc) }}
    </td>
    <td v-if="course.hinhthuc == 'offline'" class=" table-items">{{ formattedDays(course.thu) }}</td>
    <td v-else class=" table-items">-</td>

    <td v-if="course.hinhthuc == 'offline'" class=" table-items">{{ formatHour(course.ngaybatdau) }}</td>
    <td v-else class=" table-items">-</td>

    <td class="">
      <button class="btn btn-sm btn-warning mr-4" @click="showDetail[course._id] = true">
        Detail
      </button>
      <button class="btn btn-sm btn-danger mr-4" @click="deleteCourse(index, course._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info" @click="modifyCourse(index, course._id)">
        Edit
      </button>
      <div class="form-wrapper" v-if="showDetail[course._id]">
        <div class="form" style="z-index: 10000; height: 600px;">
          <div style="text-align: center; font-size: 20px; font-weight: bold; text-transform: uppercase;">
            <label for="soluong">Danh sách lớp {{ course.tenlop }}</label>
          </div>
          <div v-if="course.teachers.length > 0" class="d-flex justify-content-between">
            <div v-for="(teacher, teacherIndex) in course.teachers">
              GV: {{ teacher.name }}
            </div>
          </div>
          <div v-else>
            Chưa sắp xếp giáo viên
          </div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Học viên</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, studentIndex) in sortStudents(course.students)" :key="studentIndex">
                <td>{{ studentIndex + 1 }}</td>
                <td>{{ student.name }}</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-3">
            <button class="btn btn-primary mr-4" @click="">Submit</button>
            <button class="btn btn-danger" @click="showDetail[course._id] = false">Đóng</button>
          </div>
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
      showDetail: {},
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
    async getClassOfTeach(){
      
    },
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
      } catch (error) {
        console.log(error)
      }
    },
    formattedDays(days) {
      if (Array.isArray(days) && days.length > 0) {
        const daysOfWeek = ['Chủ nhật', '2', '3', '4', '5', '6', '7'];
        const selectedDays = days.map(day => daysOfWeek[day]);
        return selectedDays.join(', ');
      } else {
        return '';
      }
    },
    formatHour(dateTimeString) {
      const hour = moment(dateTimeString).format('HH:mm');
      return hour;
    },
    sortStudents(students) {
      students.sort((a, b) => {
        const nameA = a.name.split(' ')
        const lastWordPartA = nameA[nameA.length - 1]
        const nameB = b.name.split(' ')
        const lastWordPartB = nameB[nameB.length - 1]

        return lastWordPartA.localeCompare(lastWordPartB);
      });

      return students;
    },
    filterTeacher(teachers,ngaybatdau) {
      for(teacher in teachers){
        
      }
    }
  },
  mounted() {
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
  padding: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

/* 
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
} */
</style>