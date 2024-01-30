<template>
    <div class="container">
        <div class="my-5" v-if="authStore.isLoggedIn">
            <div class="order-list">
                <h4>
                    Danh sách đơn hàng
                    <i class="fa-solid fa-file"></i>
                </h4>
                <div v-for="order in orders" :key="order.id" class="order-item">
                    <div class="order-info row">
                        <div class="col-2">
                            <p><strong>Khách hàng:</strong></p>
                            <h5>{{ getCustomerName(order.orderby) }}</h5>
                        </div>
                        <div class="col-3">
                            <p><strong>Danh sách sản phẩm:</strong></p>
                            <div v-for="product in order.products" :key="product._id">
                                <p>{{ product.products[0].name }}</p>
                            </div>
                        </div>
                        <div class="col-2">
                            <p><strong>Số lượng:</strong></p>
                            <div v-for="product in order.products" :key="product._id">
                                <p>{{ product.products[0].count }}</p>
                            </div>
                        </div>
                        <div class="col-2">
                            <p><strong>Tổng tiền: </strong></p>
                            <p class="order-price">{{ order.amount }}</p>
                        </div>
                        <div class="col-2">
                            <p><strong>Trạng thái:</strong> </p>
                            <p class="order-status">{{ order.orderStatus }}</p>
                            <p><strong>Cập nhật trạng thái</strong></p>
                            <select v-model="order.orderStatus" @change="updateOrderStatus(order)">
                                <option value="confirmed">Đã xác nhận</option>
                                <option value="shipped">Đang vận chuyển</option>
                                <option value="completed">Đã hoàn thành</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import userService from '@/services/user.service';
import { useAuthStore } from '@/store/auth';

export default {
    data() {
        return {
            orders: [],
            users: [],
        };
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
    methods: {
        async getAllOrders() {
            try {
                this.orders = await userService.getAllOrder();
            } catch (error) {
                console.error('Error fetching order list:', error);
            }
        },
        async getAlluser() {
            try {
                this.users = await userService.getAll()
            }
            catch (error) {
                console.log(error);
            }
        },
        getCustomerName(orderby) {
            const customer = this.users.find(users => users._id === orderby);
            return customer ? customer.name : 'Khách hàng không tồn tại';
        },
        async updateOrderStatus(order) {
            try {
                const updatedOrder = {
                    id: order._id,
                    orderStatus: order.orderStatus
                };
                console.log(updatedOrder)
                await userService.updateOrderStatus(updatedOrder);

                for (const product of order.products) {
                    const updateQuantity = {
                        product_id: product.products[0].product,
                        count: product.products[0].count
                    };
                    if (order.orderStatus === 'confirmed') {
                        await userService.reducePQ(updateQuantity)
                    }
                }


            } catch (error) {
                console.error('Error updating order status:', error);
            }
        },
    },
    mounted() {
        this.getAllOrders();
        this.getAlluser();
    },
};
</script>
  
<style scoped>
.order-item {
    list-style: none;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 15px;
    margin-bottom: 15px
}

.order-info {
    padding: 10px;
    margin-bottom: 10px;
}

.order-status {
    color: #007bff;
    font-weight: bold;
}

.order-price {
    color: red;
    font-weight: bold;
}
</style>
  