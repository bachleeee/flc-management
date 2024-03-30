<template>
      <div class="container-xxl ">
        <div class="p-4">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="bg-white p-3 rounded">
                        <div  class="container my-4 d-flex flex-column align-items-center">
                        <h4>Thêm Khóa học mới</h4>
                        <OrderForm :order="order" @submit:order="createOrder" :isRoleFieldDisabled="isRoleFieldDisabled"/>
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
export default {
    components: {
        OrderForm,
    },
    data() {
        return {
            order: {
                name: '',
                category: '',
                status: '',
                price: '',
                des: '',
            },
            message: "",
            isRoleFieldDisabled: false
        };
    },
    methods: {
        async createOrder(data) {
            try {
                await OrderService.create(data);
                window.alert("Khóa học được thêm thành công.");
                setTimeout(() => {
                    this.$router.push({ name: "order" });
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },

    },
};
</script>