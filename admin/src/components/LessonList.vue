<template>
  <tr v-for="(lesson, index) in lessons" :key="lesson._id" @click="updateActiveIndex(index)">
    <td class="col-2 table-items">{{ startIndex + index }}</td>
    <td class="col-2 table-items">
      {{ lesson.name }}
    </td>
    <td class="col-2 table-items">
      {{ lesson.className }}
    </td>
    <td class="col-2">
      <button class="btn btn-sm btn-warning mr-4" @click="showOptions(index, lesson._id)">
        Detail
      </button>
      <button class="btn btn-sm btn-danger mr-4" @click="deleteLesson(index, lesson._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info mr-4" @click="modifyLesson(index, lesson._id)">
        Edit
      </button>
      <div v-if="showDropdown[index]" class="dropdown-container">
        <div class="d-flex" style="flex-direction: column; background-color: white;;">
          <button class="btn btn-secondary my-1" @click="goToOption('video', lesson._id)">Video</button>
          <button class="btn btn-secondary my-1" @click="goToOption('document', lesson._id)">Tài liệu</button>
          <button class="btn btn-secondary" @click="goToOption('exam', lesson._id)">Bài tập</button>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import LessonService from "@/services/lesson.service";

export default {
  props: {
    lessons: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    startIndex: Number,
  },
  emits: ["update:activeIndex"],
  data() {
    return {
      showDropdown: [],
      selectedOption: [],
    };
  },
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
    async deleteLesson(index, lessonId) {
      try {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirmDelete) {
          return;
        }
        await LessonService.delete(lessonId);
        this.lessons.splice(index, 1);
        this.$emit("update:activeIndex", -1);
      } catch (error) {
        console.error("Error deleting lesson:", error);
      }
    },
    async modifyLesson(index, lessonId) {
      this.$router.push({
        name: 'lesson.edit',
        params: { id: lessonId },
      });
    },
    showOptions(index, lessonId) {
      if (this.showDropdown[index]) {
        this.showDropdown[index] = false;
      } else {
        this.showDropdown[index] = true;
        this.selectedOption[index] = "video";
      }
    },

    goToOption(option, lessonId) {
      if (option === "video") {
        this.$router.push({
          name: 'video',
          params: { lessonid: lessonId },
        });
      } else if (option === "document") {
        // Xử lý chuyển hướng đến trang tài liệu
      } else if (option === "exam") {
        this.$router.push({
          name: 'exam',
          params: { lessonid: lessonId },
        });
      }
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

.dropdown-container {
  position: fixed;
  top: 100;
  left: 100;
  z-index: 999;
}
</style>