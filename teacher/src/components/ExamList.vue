<template>
  <tr v-for="(exam, index) in exams" :key="exam._id" @click="updateActiveIndex(index)">
    <td class="col-1 table-items">{{ startIndex + index }}</td>
    <td class="col-2 table-items">
      {{ exam.title }}
    </td>
    <td class="col-2 table-items">
      {{ exam.type }}
    </td>
    <td class="col-2 table-items">
      {{ exam.question }}
    </td>
  
    <td class="col-2">
      <button class="btn btn-sm btn-danger mr-4" @click="deleteExam(index, exam._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info" @click="modifyExam(index, exam._id)">
        Edit
      </button>
    </td>
  </tr>
</template>


<script>
import ExamService from "@/services/exam.service";

export default {
  props: {
    exams: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    lessonid: { type: String, default: null },
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
    async deleteExam(index, examId) {
      try {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirmDelete) {
          return;
        }
        await ExamService.delete(examId);
        this.exams.splice(index, 1);
        this.$emit("update:activeIndex", -1);
      } catch (error) {
        console.error("Error deleting exam:", error);
      }
    },
    async modifyExam(index, examId) {
      this.$router.push({
        name: 'exam.edit',
        params: { id: examId },
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