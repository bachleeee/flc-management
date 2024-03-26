<template>
  <div class="container-xxl ">
    <div class="p-4">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="bg-white p-3 rounded">
            <div v-if="order" class="container mt-4 d-flex flex-column align-items-center">
              <h4>Hiệu chỉnh Đơn đăng ký </h4>
              <OrderForm :order="order" @submit:order="updateOrder" @delete:order="deleteOrder"
                :isRoleFieldDisabled="isRoleFieldDisabled" />
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderForm from "@/components/OrderForm.vue";
import OrderService from "@/services/order.service";
import ClassService from "@/services/class.service";

export default {
  components: {
    OrderForm,
  },
  data() {
    return {
      order: null,
      message: "",
      isRoleFieldDisabled: true,
      isAddForm: false,
    };
  },
  methods: {
    async getOrder() {
      try {
        this.order = await OrderService.getById(this.$route.params.id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateOrder(data) {
      try {
        await OrderService.update(this.order._id, data);
        window.alert("Đơn đăng ký được cập nhật thành công.");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteOrder() {
      if (confirm("Bạn muốn xóa Đơn đăng ký này?")) {
        try {
          await OrderService.delete(this.order._id);
          this.$router.push({ name: "order" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getOrder();
    this.message = "";
  },
};
</script>