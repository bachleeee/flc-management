<template>
  <div class="cart-item row">
    <div class="col-md-1">
      <img :src="product.products[0].img" alt="Product Image" class="product-image">
    </div>
    <div class="col-md-6">
      <div class="product-details">
        <h5>{{ product.products[0].name }}</h5>
        <p>Giá: {{ formatCurrency(product.products[0].price) }}</p>
        <p>Số lượng: {{ product.products[0].count }}</p>
      </div>
    </div>
    <div class="col-md-2 total-price">
      <p>Tổng: {{ formatCurrency(product.cartTotal) }}</p>
      <button @click="removeFromCart" class="btn btn-danger">Xóa</button>
    </div>
  </div>
</template>


<script>
import UserService from '@/service/user.service';
import Cookies from 'js-cookie';

export default {
  props: {
    product: Object,
  },
  methods: {
    formatCurrency(value) { 
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    async removeFromCart() {
      try {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?');

        if (!confirmed) {
          return; 
        }
        const cookieValue = Cookies.get('token');

        const result = {
          cart_id: this.product._id,
          product_id: this.product.products[0].product
        };

        await UserService.deleteProductFromCart(cookieValue, result);

        this.$router.go(0)
      } catch (error) {
        console.error('Error deleting product from cart:', error);
      }
    },
  },
};
</script>

  
<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: px;
  border: 1px solid #575656;
  width: 90%;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 170px;
  height: auto;
  margin-right: 10px;
}

.product-details {
  flex-grow: 1;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.quantity-controls button {
  cursor: pointer;
  margin: 0 5px;
}

.total-price {
  text-align: right;
}

.total-price button {
  background-color: #ff0000;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
</style>
  