<template>
  <router-link :to="`/products/${product.slug}`" v-for="product in products" :key="product._id" class="col-3">
    <div class="product-card mb-4">
      <div class="">
        <img style="width: 80%; height: auto;" :src="product.img" alt="">
      </div>
      <div class="product-detail m-1">
        <div class="product-title"> {{ product.name }}</div>
        <p class="product-price">{{ formatCurrency(product.price) }}</p>
      </div>
    </div>
  </router-link>
</template>
  
<script>
export default {
  props: {
    products: { type: Array, default: [] },
  },
  methods: {
    formatCurrency(price) {
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);

      return `${formattedPrice}`;
    }
  }
};
</script>

<style scoped>
.row>a {
  text-decoration: none;
}

.product-card {
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 250px;
}

.product-card:hover {
  transform: scale(1.05);
}


.product-title {
  font-size: 17px;
  color: black;
}

.product-price {
  font-size: 16px;
  color: #e44d26;
  font-weight: bold;
}
</style>
