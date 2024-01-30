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
    <ul class="list-group ">
        <li class="list-group-item" v-for="(product, index) in products" :key="product._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            <div class="col-5 product-name">
                {{ product.name }}
            </div>
            <div class="col-2 product-category">
                {{ formatCategory(product.category) }}
            </div>
            <div class="col-2 product-price">
                {{ formatCurrency(product.price) }}
            </div>
            <div class="col-1 product-quantity">
                {{ product.quantity }}
            </div>
            <div class="col-1">
                <i class="fa-solid fa-trash delete-icon mr-3" @click="deleteProduct(index, product._id)"></i>
                <i class="fa-solid fa-pen modify-icon" @click="modifyProduct(index, product._id)"></i>
            </div>
        </li>
    </ul>
</template>

<style>
.delete-icon {
    color: red;
    cursor: pointer;
}
.modify-icon {
    color: yellow;
    cursor: pointer;
}

.product-name {
  font-weight: bold;
  color: #333;
}

.product-category {
  color: #007BFF;
}

.product-price {
  font-weight: bold;
  color: #28A745;
}
.product-quantity {
  font-weight: bold;
  color: #000000;
}

.list-group-item {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #b1b1b1;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list-group-item.active {
  border: 2px solid black;
  background-color: white;
}
</style>