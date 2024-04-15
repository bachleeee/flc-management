<template>
  <tr v-for="(order, index) in sortOrder(orders)" :key="order._id" @click="updateActiveIndex(index)">
    <td class="col-1 table-items">{{ startIndex + index }}</td>
    <td class="col-1 table-items">{{ order.orderby }}</td>
    <td class="col-1 table-items">{{ order.className }}</td>
    <td class="col-1 table-items">{{ formattedDate(order.createdAt) }}</td>
    <td class="col-1 table-items">{{ formatCurrency(order.total) }}</td>
    <td class="col-1 table-items" :style="{ color: getStatusColor(order.orderStatus) }">
      {{ getOrderStatus(order.orderStatus) }}
    </td>
    <td class="col-2">
      <button :disabled="isDisabled(order.orderby, order.className, order.orderStatus)"
        class="btn btn-sm btn-warning mr-4" @click="addtoclass(order.orderby, order.userId, order.className, order.createdAt)">
        Thêm HV
      </button>
      <button class="btn btn-sm btn-danger mr-4" @click="deleteOrder(index, order._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info" @click="modifyOrder(index, order._id)">
        Edit
      </button>
    </td>
  </tr>
</template>


<script>
import OrderService from "@/services/order.service";
import ClassService from "@/services/class.service";
import UserService from "@/services/user.service";
import moment from "moment";

export default {
  props: {
    orders: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    startIndex: Number,
  },
  emits: ["update:activeIndex"],
  methods: {
    sortOrder(orders) {
  return orders.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB - dateA;
  });
},


    formatCurrency(price) {
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
      return `${formattedPrice}`;
    },
    formattedDate(date) {
      return moment(date).format('DD-MM hh:mm');
    },
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteOrder(index, orderId) {
      try {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirmDelete) {
          return;
        }
        await OrderService.delete(orderId);
        this.orders.splice(index, 1);
        this.$emit("update:activeIndex", -1);
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    },
    async modifyOrder(index, orderId) {
      this.$router.push({
        name: 'order.edit',
        params: { id: orderId },
      });
    },
    async addtoclass(studentName, studentId,  className, ngayDangKy) {

      const responseClass = await ClassService.getClass(className);
      const hinhThuc = responseClass.hinhthuc
      try {
        const addToClassData = {
          studentName, 
          studentId,
          classId: responseClass._id,
        };
        const addToStudentData = {
          className,
          ngayDangKy,
          ngayketthuc: responseClass.ngayketthuc,
          hinhThuc,
          studentName
       };
        const updateSiso = {
          siso: responseClass.siso + 1
        };
        console.log(addToClassData);
        await ClassService.addToClass(addToClassData);
        await ClassService.update(responseClass._id, updateSiso);
        await UserService.addClass(addToStudentData);
        window.alert("Đã thêm học viên vào lớp.");
      } catch (error) {
        console.error("Error adding to class:", error);
      }
    },
    isDisabled(studentName, className, status) {
      return status === 'waiting';
    },
    getOrderStatus(status) {
      switch (status) {
        case 'waiting':
          return 'Chờ duyệt';
        case 'completed':
          return 'Đã duyệt';
        case 'rejected':
          return 'Đã từ chối';
        default:
          return status;
      }
    },
    getStatusColor(status) {
      switch (status) {
        case 'waiting':
          return 'blue'; // Màu xanh dương
        case 'completed':
          return 'green'; // Màu xanh lá
        case 'rejected':
          return 'red'; // Màu đỏ
        default:
          return 'inherit';
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
</style>