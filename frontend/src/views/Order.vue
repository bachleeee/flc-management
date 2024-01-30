<template>
    <div class="py-5">
        <div class="container">
            <div class="col-12">
                <h2>ĐƠN HÀNG</h2>
                <hr>
                <div class="row">
                    <div class="col-1"><strong></strong></div>
                    <div class="col-5"><strong>Danh sách sản phẩm</strong></div>
                    <div class="col-2"><strong>Tổng cộng</strong></div>
                    <div class="col-3"><strong>Tình trạng đơn</strong></div>
                </div>
                <div class="order-details mt-4">
                    <OrderItem v-for="order in Orders" :key="order._id" :order="order" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import OrderItem from '@/components/OrderItem.vue';
import UserService from '@/service/user.service';
import { useAuthStore } from '@/store/auth';
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            Orders: [
            ],
        };
    },
    components: {
        OrderItem,
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        async getUserOrder() {
            const cookieValue = Cookies.get('token');
            console.log(cookieValue);
            try {
                if (this.authStore.isLoggedIn) {
                    this.Orders = await UserService.getOrder(cookieValue);
                    console.log(this.Order);
                } else {
                    console.error('User is not logged in.');
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
    mounted() {
        this.getUserOrder();
    },
};
</script>
  
<style scoped>

</style>
  