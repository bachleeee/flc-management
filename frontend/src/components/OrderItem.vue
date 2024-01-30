<template>
  <div class="order-item">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-5">
        <div class="row my-2" v-for="(product, index) in order.products" :key="index">
          <div class="col-3">
            <img :src="product.products[0].img" alt="" class="order-image">
          </div>
          <div class="col-7">
            <div>{{ product.products[0].name }}</div>
            <div>Giá: {{ product.products[0].price }}</div>
            <div>Số lượng: {{ product.products[0].count }}</div>
          </div>
        </div>
      </div>
      <div class="col-2">
        <h5> {{ formatCurrency(order.amount) }}</h5>
      </div>
      <div class="col-3">
        <h5 :style="{ color: getStatusColor(order.orderStatus) }">{{ displayOrderStatus }}</h5>
      </div>
      <div class="col-1">
        <button v-if="order.orderStatus === 'placed'" class="btn-xoa" @click="removeOrder">Hủy đơn</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/service/user.service';
import Cookies from 'js-cookie';
export default {


  props: {
    order: Object,
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    getStatusColor(status) {
      const colorMapping = {
        'placed': 'green',
        'confirmed': 'blue',
        'shipped': 'red',
        'completed': 'orange'
      };
      return colorMapping[status] || 'black';
    },
    async removeOrder() {
      try {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa đơn hàng?');

        if (!confirmed) {
          return;
        }
        const cookieValue = Cookies.get('token');

        const result = {
          order_id: this.order._id,
        };

        await UserService.deleteOrder(cookieValue, result);

        this.$router.go(0)
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    },
  },
  computed: {
    displayOrderStatus() {
      const statusMapping = {
        'placed': 'Đang chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'shipped': 'Đang vận chuyển',
        'completed': 'Đã hoàn thành'
      };

      return statusMapping[this.order.orderStatus] || this.order.orderStatus;
    },
  },

};
</script>

  
<style scoped>
.order-item {
  border: 1px solid #a7a5a5;
  padding: 10px;
  margin: 10px 0;
  background-color: #f8f7f7;
}

.order-image {
  width: 90px;
  /* Điều chỉnh kích thước ảnh sản phẩm */
  height: auto;
  /* Đảm bảo tỷ lệ hình ảnh không bị biến đổi */
  margin-right: 10px;
}

.btn-xoa {
  background-color: #ff0000;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
</style>
  