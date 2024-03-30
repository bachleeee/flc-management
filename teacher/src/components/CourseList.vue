<template>
  <tr v-for="(course, index) in courses" :key="course._id" @click="updateActiveIndex(index)">
    <td class="col-1 table-items">{{ startIndex + index }}</td>
    <td class="col-3 table-items">
      {{ course.name }}
    </td>
    <td class="col-2 table-items">{{ formatCurrency(course.price) }}</td>
    <td class="col-2 table-items">{{ course.email }}</td>
    <td class="col-2 table-items"
      :class="{ 'text-primary': course.status === 'open', 'text-secondary': course.status === 'close' }">
      {{ course.status === 'open' ? 'Đang mở' : 'Đã đóng' }}
    </td>
    <td class="col-2">
      <button class="btn btn-sm btn-danger mr-4" @click="deleteCourse(index, course._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info" @click="modifyCourse(index, course._id)">
        Edit
      </button>
    </td>
  </tr>
</template>


<script>
import CourseService from "@/services/course.service";

export default {
  props: {
    courses: { type: Array, default: [] },
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
    async deleteCourse(index, courseId) {
      try {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirmDelete) {
          return;
        }
        await CourseService.delete(courseId);
        this.courses.splice(index, 1);
        this.$emit("update:activeIndex", -1);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    },
    async modifyCourse(index, courseId) {
      this.$router.push({
        name: 'course.edit',
        params: { id: courseId },
      });
    },
  }
};
</script>

<style>
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
</style>