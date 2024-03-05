<script>
import ProductService from "@/services/product.service";

export default {
  props: {
    products: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteProduct(index, productId) {
      try {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirmDelete) {
          return;
        }
        await ProductService.delete(productId);
        this.products.splice(index, 1);
        this.$emit("update:activeIndex", -1);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    modifyProduct(index, productId) {
      // Chuyển hướng sang route 'product.edit' với tham số id
      this.$router.push({
        name: 'product.edit',
        params: { id: productId },
      });
    },
    formatCategory(category) {
      switch (category) {
        case 'van-hoc':
          return 'Văn học';
        case 'tam-ly-hoc':
          return 'Tâm lý học';
        case 'kinh-te':
          return 'Kinh tế';
        case 'ngoai-ngu':
          return 'Ngoại ngữ';
        default:
          return category;
      }
    },
    formatCurrency(price) {
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);

      return `${formattedPrice}`;
    },
  }
};
</script>
<template>
  <tr v-for="(product, index) in products" :key="product._id"
    :class="{ active: index === activeIndex, even: index % 2 === 0, odd: index % 2 !== 0 }"
    @click="updateActiveIndex(index)">
    <td class="col-1 product-name">{{ index + 1 }}</td>
    <td class="col-5 product-name">{{ product.name }}</td>
    <td class="col-3 product-price">{{ formatCurrency(product.price) }}</td>
    <td class="col-2">
      <button class="btn btn-sm btn-danger mr-4" @click="deleteProduct(index, product._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info" @click="modifyProduct(index, product._id)">
        Edit
      </button>
    </td>
  </tr>
</template>

<style>
.delete-icon {
  cursor: pointer;
}

.modify-icon {
  cursor: pointer;
}

.even {
  background-color: #f2f2f2;
}

.odd {
  background-color: #ffffff;
}
</style>