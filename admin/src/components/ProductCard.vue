<script>
export default {
  props: {
    product: { type: Object, required: true },
  },
  methods: {
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
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ product.name }}
    </div>
    <div class="p-1">
      <strong>Loại</strong>
      {{ formatCategory(product.category) }}
    </div>
    <div class="p-1">
      <strong>Giá</strong>
      {{ product.price }}
    </div>
    <div class="p-1">
      <strong>Mô tả</strong>
      {{ product.description }}
    </div>
    <div class="p-1">
      <strong>Số lượng</strong>
      {{ product.quantity }}
    </div>
  </div>
</template>
